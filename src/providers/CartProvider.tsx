"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  GIFT_WRAP_AMOUNT,
  cartLineId,
} from "@/lib/gift-wrap";

export type CartItem = {
  lineId: string;
  productId: string;
  priceId: string;
  name: string;
  unitAmount: number;
  image: string | null;
  quantity: number;
  giftWrap: boolean;
};

type AddItemInput = Omit<CartItem, "quantity" | "lineId" | "giftWrap"> & {
  giftWrap?: boolean;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  totalQuantity: number;
  totalAmount: number;
  giftWrapAmount: number;
  addItem: (item: AddItemInput, quantity?: number) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  setGiftWrap: (lineId: string, giftWrap: boolean) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CART_STORAGE_KEY = "calm-trinity-cart-v2";

const CartContext = createContext<CartContextValue | null>(null);

function normalizeCartItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.flatMap((entry) => {
    if (!entry || typeof entry !== "object") {
      return [];
    }

    const item = entry as Partial<CartItem>;
    if (
      typeof item.productId !== "string" ||
      typeof item.priceId !== "string" ||
      typeof item.name !== "string" ||
      typeof item.unitAmount !== "number" ||
      typeof item.quantity !== "number"
    ) {
      return [];
    }

    const giftWrap = Boolean(item.giftWrap);
    return [
      {
        lineId:
          typeof item.lineId === "string"
            ? item.lineId
            : cartLineId(item.productId, giftWrap),
        productId: item.productId,
        priceId: item.priceId,
        name: item.name,
        unitAmount: item.unitAmount,
        image: typeof item.image === "string" ? item.image : null,
        quantity: item.quantity,
        giftWrap,
      },
    ];
  });
}

function readCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? normalizeCartItems(JSON.parse(stored)) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCartFromStorage);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: AddItemInput, quantity = 1) => {
    const giftWrap = Boolean(item.giftWrap);
    const lineId = cartLineId(item.productId, giftWrap);

    setItems((current) => {
      const existing = current.find((cartItem) => cartItem.lineId === lineId);

      if (existing) {
        return current.map((cartItem) =>
          cartItem.lineId === lineId
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem,
        );
      }

      return [
        ...current,
        {
          ...item,
          giftWrap,
          lineId,
          quantity,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setItems((current) => current.filter((item) => item.lineId !== lineId));
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item.lineId !== lineId));
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.lineId === lineId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const setGiftWrap = useCallback((lineId: string, giftWrap: boolean) => {
    setItems((current) => {
      const source = current.find((item) => item.lineId === lineId);
      if (!source || source.giftWrap === giftWrap) {
        return current;
      }

      const nextLineId = cartLineId(source.productId, giftWrap);
      const withoutSource = current.filter((item) => item.lineId !== lineId);
      const existingTarget = withoutSource.find(
        (item) => item.lineId === nextLineId,
      );

      if (existingTarget) {
        return withoutSource.map((item) =>
          item.lineId === nextLineId
            ? { ...item, quantity: item.quantity + source.quantity }
            : item,
        );
      }

      return [
        ...withoutSource,
        {
          ...source,
          giftWrap,
          lineId: nextLineId,
        },
      ];
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const giftWrapAmount = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + (item.giftWrap ? GIFT_WRAP_AMOUNT * item.quantity : 0),
        0,
      ),
    [items],
  );

  const totalAmount = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.unitAmount * item.quantity, 0) +
      giftWrapAmount,
    [items, giftWrapAmount],
  );

  const value = useMemo(
    () => ({
      items,
      isOpen,
      totalQuantity,
      totalAmount,
      giftWrapAmount,
      addItem,
      removeItem,
      updateQuantity,
      setGiftWrap,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      items,
      isOpen,
      totalQuantity,
      totalAmount,
      giftWrapAmount,
      addItem,
      removeItem,
      updateQuantity,
      setGiftWrap,
      clearCart,
      openCart,
      closeCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
