import Contact from "@/components/main/Contact";
import { Hero } from "@/components/main/hero";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";
import SplashCursor from "@/components/sub/Ribbons";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <Projects />
        <Contact />
        <SplashCursor  />
      </div>
    </main>
  );
}
