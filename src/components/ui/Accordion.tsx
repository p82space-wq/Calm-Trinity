"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type AccordionItem = {
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-sand border-y border-sand">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="text-sm font-medium text-forest">{item.title}</span>
              <ChevronDown
                className={`h-4 w-4 text-stone transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                strokeWidth={1.5}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  {(() => {
                    const lines = item.content
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean);

                    if (lines.length > 1) {
                      return (
                        <ul className="list-disc space-y-2 pb-5 pl-5 text-sm leading-relaxed text-muted">
                          {lines.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      );
                    }

                    return (
                      <p className="whitespace-pre-line pb-5 text-sm leading-relaxed text-muted">
                        {item.content}
                      </p>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
