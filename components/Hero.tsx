import { getSiteSettings } from "@/lib/contentful.queries";
import { Button } from "./ui/Button";
import { Section } from "./ui/Section";

export async function Hero() {
  const siteSettings = await getSiteSettings();
  const backgroundVideoUrl = siteSettings?.heroBackgroundVideo;

  return (
    <Section className="flex items-center justify-center pt-32 pb-48 px-6 lg:px-8 relative overflow-hidden min-h-[70vh]">
      {/* Background Video */}
      {backgroundVideoUrl && (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-100"
          >
            <source src={backgroundVideoUrl} type="video/mp4" />
          </video>
          {/* Subtle gradients to only fade the very top and bottom edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/50" />
          <div className="absolute inset-0 bg-black/5" />
        </div>
      )}

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Main Headline */}
        <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-foreground mb-6 leading-tight tracking-tight animate-fade-in">
          Design, build &amp; ship interfaces that accelerate products
        </h1>

        {/* Subtitle */}
        <p
          className="text-sm sm:text-[13px] lg:text-base text-muted mb-10 max-w-lg mx-auto leading-relaxed animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          Clear your design roadmap, activate users and design experiences that
          retain them.
        </p>

        {/* CTA Button */}
        <div
          className="animate-fade-in flex flex-col items-center gap-4"
          style={{ animationDelay: "0.2s" }}
        >
          <Button
            variant="primary"
            size="sm"
            href="#contact"
            className="rounded-full px-8 py-3 text-[11px] font-bold tracking-wide"
          >
            Schedule a call
          </Button>

          <Button
            variant="ghost"
            href="https://wa.me/yournumber"
            className="text-[#25D366] underline hover:bg-transparent hover:opacity-80 p-0 h-auto font-medium text-[10px]"
          >
            Whatsapp message
          </Button>
        </div>
      </div>
    </Section>
  );
}
