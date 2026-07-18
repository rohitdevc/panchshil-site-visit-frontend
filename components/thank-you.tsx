import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";

export function ThankYouPage() {
  const basePath = process.env.NEXT_PUBLIC_PATH || "/";

  return (
    <main className="relative isolate overflow-hidden h-screen bg-no-repeat bg-cover" style={{backgroundImage: "url('/images/thank-you.jpg')"}}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="relative z-10 flex min-h-svh flex-col px-6 py-7 sm:px-10 sm:py-10 lg:px-[10.4vw] lg:py-[20vh]">
        <section className="my-auto max-w-[790px] pt-14 sm:pt-20 lg:-mt-4 lg:pt-0">
          <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.2em] text-[#b29a75] sm:mb-11 sm:text-[12px] lg:text-[15px]">Consultation Received</p>
          <h1 id="home-heading" className="text-[clamp(3.3rem,6vw,6.1rem)] leading-[0.92] tracking-[-0.045em] text-white">
            Thank You, Sam, <br/>
            <em className="font-normal text-[#b69b72]">Your consultation has been received.</em>
          </h1>
          <p className="mt-8 max-w-[510px] text-[14px] leading-[1.5] text-white/65 sm:mt-10 sm:text-[16px] lg:text-[18px]">A Panchshil representative will connect with you shortly with a curated, considered response. In the meantime, you may continue to explore.</p>
          <div className="mt-10 flex gap-5 sm:mt-14 flex-row">
            <Link href={`${basePath}`} className="group flex justify-center items-center gap-5 text-[15px] text-white transition-colors sm:text-[17px] uppercase">
              <GoArrowLeft size={20} /> RETURN TO HOME
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
