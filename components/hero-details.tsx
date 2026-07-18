import Link from "next/link";
import { PanchshilMark } from "./panchshil-mark";
import { GoArrowRight } from "react-icons/go";

export function HeroDetails() {
  const basePath = process.env.NEXT_PUBLIC_PATH || "/";

  return (
    <div className="relative z-10 flex min-h-svh flex-col px-6 py-7 sm:px-10 sm:py-10 lg:px-[10.4vw] lg:py-[6.7vh]">
      <header className="flex items-start justify-between">
        <PanchshilMark />
        <p className="pt-2 text-right text-[9px] font-medium uppercase tracking-[0.22em] text-white/85 sm:text-[11px] lg:pt-[10.8vh] lg:text-[14px]">Private consultation · 2026</p>
      </header>
      <section className="my-auto max-w-[790px] pt-14 sm:pt-20 lg:-mt-4 lg:pt-0">
        <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.2em] text-[#b29a75] sm:mb-11 sm:text-[12px] lg:text-[15px]">Begin a private consultation</p>
        <h1 id="home-heading" className="text-[clamp(3.3rem,6vw,6.1rem)] leading-[0.92] tracking-[-0.045em] text-white">
          Begin Your <em className="font-normal text-[#b69b72]">Panchshil</em><br />
          Consultation.
        </h1>
        <p className="mt-8 max-w-[510px] text-[14px] leading-[1.5] text-white/65 sm:mt-10 sm:text-[16px] lg:text-[18px]">Curated residences, office environments, and landmark developments — designed around experience. A quiet conversation, on your terms.</p>
        <div className="mt-10 flex flex-col items-start gap-5 sm:mt-14 sm:flex-row sm:items-center sm:gap-9">
          <Link href={`${basePath}customer-form`} className="group inline-flex h-[52px] items-center gap-5 border border-[#9a7951] px-5 text-[15px] text-white transition-colors hover:bg-white/10 sm:h-[58px] sm:px-6 sm:text-[17px] uppercase">
            Start consultation <GoArrowRight size={20} />
          </Link>
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/65 sm:text-[12px] lg:text-[14px]">5 quiet steps · ~3 minutes</p>
        </div>
      </section>
      <footer className="flex items-end justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-white/60 sm:text-[12px] lg:text-[14px]">
        <p>Pune · Mumbai</p><p>Established 2002</p>
      </footer>
    </div>
  );
}
