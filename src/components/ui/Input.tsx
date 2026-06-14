import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, id, className = "", ...props }: InputProps) {
  const inputId = id ?? label;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="text-xs uppercase tracking-[0.15em] text-stone"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`mt-2 w-full border border-sand bg-cream px-4 py-3 text-sm text-charcoal placeholder:text-stone/50 focus:border-forest focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function Textarea({ label, id, className = "", ...props }: TextareaProps) {
  const inputId = id ?? label;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="text-xs uppercase tracking-[0.15em] text-stone"
      >
        {label}
      </label>
      <textarea
        id={inputId}
        className={`mt-2 w-full resize-y border border-sand bg-cream px-4 py-3 text-sm text-charcoal placeholder:text-stone/50 focus:border-forest focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
}
