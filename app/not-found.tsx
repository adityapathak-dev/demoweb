import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[80svh] place-items-center px-5 pt-24 text-center">
      <div className="max-w-md">
        <p className="pointer-events-none select-none text-[clamp(4rem,14vw,8rem)] font-semibold leading-none text-border" aria-hidden>
          404
        </p>
        <h1 className="mt-2 text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-tight text-heading">
          That page isn&apos;t on the prescriptions list.
        </h1>
        <p className="mt-4 text-smoke">
          The page you&apos;re looking for doesn&apos;t exist — but the right frame for you does.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-heading px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
          >
            Back home
          </Link>
          <Link
            href="/collections"
            className="rounded-lg border border-border bg-white px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-sand"
          >
            Browse frames
          </Link>
        </div>
      </div>
    </div>
  );
}