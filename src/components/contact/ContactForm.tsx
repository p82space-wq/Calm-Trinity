"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { contactEmail } from "@/lib/navigation";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "送信に失敗しました");
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "送信に失敗しました",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="border border-sage/30 bg-linen/50 px-8 py-12 text-center">
        <p className="font-serif text-2xl text-forest">
          お問い合わせを受け付けました
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          内容を確認のうえ、2営業日以内にご返信いたします。
          <br />
          しばらくお待ちください。
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-xs uppercase tracking-[0.2em] text-stone transition-colors hover:text-forest"
        >
          新しいお問い合わせを送る
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Input
        label="お名前"
        name="name"
        type="text"
        required
        placeholder="山田 花子"
        disabled={status === "loading"}
      />

      <Input
        label="メールアドレス"
        name="email"
        type="email"
        required
        placeholder="example@email.com"
        disabled={status === "loading"}
      />

      <Input
        label="件名"
        name="subject"
        type="text"
        placeholder="商品について / 配送について など"
        disabled={status === "loading"}
      />

      <Textarea
        label="お問い合わせ内容"
        name="message"
        required
        rows={6}
        placeholder="お問い合わせ内容をご記入ください"
        disabled={status === "loading"}
      />

      {errorMessage && (
        <p className="text-sm text-red-700">{errorMessage}</p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send Message"}
        </Button>
        <p className="text-xs text-muted">
          または{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-forest underline-offset-2 hover:underline"
          >
            {contactEmail}
          </a>{" "}
          へ直接ご連絡ください
        </p>
      </div>
    </form>
  );
}
