import { PanchshilMark } from "../panchshil-mark";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";
import { IntroProps } from "@/types/api";
import parser from 'html-react-parser';

type PageProps = {
  introduction: IntroProps
}

export function HomePage({introduction}: PageProps) {
  const basePath = process.env.NEXT_PUBLIC_PATH || "/";

  return (
    <main className="relative isolate overflow-hidden h-screen bg-no-repeat bg-cover" style={{backgroundImage: `url(${introduction.banner_image})`}}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 flex h-screen flex-col px-6 py-10 sm:px-10 lg:px-[10.4vw] gap-5">
        <header className="flex items-start justify-between">
          <PanchshilMark />
          <p className="pt-2 text-right text-[9px] font-medium uppercase tracking-[0.22em] text-white/85 sm:text-[11px] lg:pt-[10.8vh] lg:text-[14px]">Private consultation · 2026</p>
        </header>
        <section className="flex flex-col gap-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#b29a75] sm:text-[12px] lg:text-[15px]">Begin a private consultation</p>
          <h1 id="home-heading" className="text-[clamp(3.3rem,6vw,6.1rem)] leading-tight tracking-[-0.045em] text-white font-zapf-regular">{parser(introduction.intro_description)}</h1>
          <p className="max-w-[510px] text-[14px] leading-[1.5] text-white/65 sm:text-[16px] lg:text-[18px]">{introduction.intro_caption}</p>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-9">
            <Link href={`${basePath}/customer-form`} className="group inline-flex h-[52px] items-center gap-5 border border-[#9a7951] px-5 text-[15px] text-white transition-colors hover:bg-white/10 sm:h-[58px] sm:px-6 sm:text-[17px] uppercase">
              Start consultation <GoArrowRight size={20} />
            </Link>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/65 sm:text-[12px] lg:text-[14px]">5 quiet steps · ~3 minutes</p>
          </div>
        </section>
        <footer className="mt-auto flex items-end justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-white/60 sm:text-[12px] lg:text-[14px]">
          <p>Pune · Mumbai</p><p>Established 2002</p>
        </footer>
    </div>
    </main>
  );
}
