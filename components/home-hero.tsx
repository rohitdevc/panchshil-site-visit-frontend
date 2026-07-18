import { HeroDetails } from "./hero-details";

export function HomeHero() {
  return (
    <main className="relative isolate overflow-hidden h-screen bg-no-repeat bg-cover" style={{backgroundImage: "url('/images/panchshil-hero.webp')"}}>
      <div className="absolute inset-0 bg-black/40"></div>
      <HeroDetails />
    </main>
  );
}
