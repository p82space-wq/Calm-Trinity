type ProductImagePlaceholderProps = {
  label?: string;
  className?: string;
};

export function ProductImagePlaceholder({
  label = "CT",
  className = "",
}: ProductImagePlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-linen to-sand ${className}`}
    >
      <span className="font-serif text-stone/40">{label}</span>
    </div>
  );
}
