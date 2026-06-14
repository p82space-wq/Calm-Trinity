export default function ProductDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-6 pb-section pt-28 lg:pt-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="aspect-[4/5] bg-linen" />
        <div className="space-y-6">
          <div className="h-3 w-20 rounded bg-sand" />
          <div className="h-10 w-64 rounded bg-sand" />
          <div className="h-6 w-24 rounded bg-linen" />
          <div className="h-20 w-full rounded bg-linen" />
          <div className="h-12 w-48 rounded bg-sand" />
        </div>
      </div>
    </div>
  );
}
