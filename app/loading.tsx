export default function Loading() {
  return (
    <div className="grid min-h-[70svh] place-items-center px-5 pt-24" aria-busy="true" aria-label="Loading">
      <div className="flex flex-col items-center">
        <span className="grid h-14 w-14 place-items-center rounded-lg bg-heading text-lg font-semibold text-white">SP</span>
        <div className="mt-6 h-1 w-44 overflow-hidden rounded-lg bg-border">
          <div className="h-full w-1/2 animate-pulse rounded-lg bg-heading" />
        </div>
        <p className="mt-4 text-xs font-medium text-smoke">Loading</p>
      </div>
    </div>
  );
}