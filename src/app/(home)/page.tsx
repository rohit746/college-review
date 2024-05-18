import { GraduationCap, MessageCirclePlus, University } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

export default function HomePage() {
  return (
    <main>
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 bg-grid-black/[0.08] dark:bg-grid-white/[0.08] md:px-8 lg:px-16">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_58%,black)] dark:bg-black"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold md:text-6xl">
            Find Your Perfect College
          </h1>
          <p className="mt-4 text-lg md:text-2xl">
            Read reviews from students and alumni to make an informed decision.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size={"lg"}>Login</Button>
            <Button size={"lg"} variant="secondary">
              Signup
            </Button>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="p-6">
            <GraduationCap className="text-4xl text-primary" />
            <h3 className="mt-4 text-xl font-bold">Student Reviews</h3>
            <p className="mt-2">Get insights from current students.</p>
          </Card>
          <Card className="p-6">
            <MessageCirclePlus className="text-4xl text-primary" />
            <h3 className="mt-4 text-xl font-bold">Alumni Reviews</h3>
            <p className="mt-2">Learn from those who have graduated.</p>
          </Card>
          <Card className="p-6">
            <University className="text-4xl text-primary" />
            <h3 className="mt-4 text-xl font-bold">College Profiles</h3>
            <p className="mt-2">Explore detailed information about colleges.</p>
          </Card>
        </div>
      </div>
    </main>
  );
}
