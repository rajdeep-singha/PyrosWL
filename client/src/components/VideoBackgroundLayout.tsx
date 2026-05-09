import type { ReactNode } from "react";

type VideoBackgroundLayoutProps = {
  children?: ReactNode;
};

export function VideoBackgroundLayout({ children }: VideoBackgroundLayoutProps) {
  const hasChildren = Boolean(children);

  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden">
      <video
        className="pointer-events-none fixed inset-0 -z-20 h-full min-h-screen w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/assets/pyros-bg.mp4" type="video/mp4" />
      </video>

      <div className="fixed inset-0 -z-10 bg-black/50" />

      <main
        className={
          hasChildren
            ? "relative z-10 flex min-h-screen w-full flex-col"
            : "relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-10 sm:px-6 lg:px-8"
        }
      >
        {hasChildren ? (
          children
        ) : (
          <div className="w-full max-w-3xl rounded-xl border border-white/20 bg-white/10 px-6 py-8 text-center text-white shadow-2xl backdrop-blur-md sm:px-10 sm:py-12 lg:px-14 lg:py-16">
            <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl lg:text-6xl">
              Build Beyond Limits
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg lg:text-xl">
              A responsive full-screen video background layout with a clean,
              modern foreground interface designed for strong contrast and
              readability.
            </p>
          </div>
        )}
      </main>
    </section>
  );
}
