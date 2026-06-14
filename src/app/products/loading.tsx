export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-6 pb-section pt-28 lg:pt-32">
      <div className="h-4 w-24 rounded bg-sand" />
      <div className="mt-4 h-10 w-48 rounded bg-sand" />
      <div className="mt-6 h-4 w-96 max-w-full rounded bg-linen" />

      <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6 md:gap-y-14">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index}>
            <div className="aspect-[3/4] bg-linen" />
            <div className="mt-4 h-3 w-16 rounded bg-sand" />
            <div className="mt-2 h-5 w-32 rounded bg-sand" />
            <div className="mt-2 h-4 w-20 rounded bg-linen" />
          </div>
        ))}
      </div>
    </div>
  );
}
