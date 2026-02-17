import { HeroSection, LogosSection } from "@/components/hero-1";
import { Header } from "@/components/header-1";

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <Header />
      <main className="grow">
        <HeroSection />
        <LogosSection />
      </main>
    </div>
  );
}
