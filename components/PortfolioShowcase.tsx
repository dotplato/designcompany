import React from "react";
import { Section } from "./ui/Section";
import { getPortfolioItems, getSiteSettings } from "@/lib/contentful.queries";
import { ShowcaseItem } from "./ShowcaseItem";

export async function PortfolioShowcase() {
  // Fetch portfolio items and site settings from Contentful
  const [portfolioItems, siteSettings] = await Promise.all([
    getPortfolioItems(),
    getSiteSettings(),
  ]);

  // If no portfolio data, show a message
  if (!portfolioItems || portfolioItems.length === 0) {
    return (
      <Section className="py-24 lg:py-32">
        <div className="max-w-xl mx-auto text-center space-y-4">
          <h3 className="text-base font-medium text-muted">
            No portfolio items yet
          </h3>
          <p className="text-sm text-muted">
            Add portfolio items in Contentful to see them here.
          </p>
          <a
            href="https://app.contentful.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
          >
            Open Contentful
          </a>
        </div>
      </Section>
    );
  }

  // Default values if site settings not configured
  const sectionTitle = siteSettings?.portfolioSectionTitle || "What we do:";
  const sectionHeading =
    siteSettings?.portfolioSectionHeading ||
    "+7 years of experience in designing across the entire product ecosystem.";
  const sectionDescription =
    siteSettings?.portfolioSectionDescription ||
    "From crafting intuitive interfaces, to partnering with developers, and producing marketing materials across multiple channels.";

  return (
    <div className="bg-background">
      {portfolioItems.map((project: any, index: number) => (
       <React.Fragment key={project._id}>
       <Section fullWidth className="py-0">
         <ShowcaseItem project={project} isFirst={index === 0} index={index} />
       </Section>
     
       <Section className="py-24 lg:py-32">
            <div className="max-w-xl mx-auto text-center space-y-4">
              <h3 className="text-[10px] font-medium text-muted uppercase tracking-wider">
                {sectionTitle}
              </h3>
              <div className="space-y-4">
                <p className="text-base lg:text-lg text-foreground font-semibold leading-tight">
                  {sectionHeading}
                </p>
                <p className="text-xs text-muted leading-relaxed max-w-sm mx-auto">
                  {sectionDescription}
                </p>
              </div>
            </div>
          </Section>
        </React.Fragment>
      ))}

      {/* Testimonials Section */}
      <Section className="bg-zinc-50">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <div className="space-y-3">
            <h3 className="text-[10px] font-medium text-muted uppercase tracking-wider">
              Testimonials
            </h3>
            <p className="text-base lg:text-lg text-foreground font-semibold leading-tight">
              Teams we work with ship faster, with more confidence.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 text-left md:text-left">
            <div className="space-y-3">
              <p className="text-xs text-muted leading-relaxed">
                “They plugged into our product team and turned a messy roadmap
                into a clear interface our users understood instantly.”
              </p>
              <p className="text-[10px] font-medium text-foreground uppercase tracking-widest">
                Product Lead, SaaS
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-xs text-muted leading-relaxed">
                “The new onboarding cut our time-to-value in half. Execution was
                thoughtful, fast and detail-obsessed.”
              </p>
              <p className="text-[10px] font-medium text-foreground uppercase tracking-widest">
                Founder, Fintech
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-xs text-muted leading-relaxed">
                “From first concept to launch, they held the bar high on both
                UX and visual craft.”
              </p>
              <p className="text-[10px] font-medium text-foreground uppercase tracking-widest">
                Design Director, Consumer App
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Call to Action Section */}
      <Section id="contact" className="pt-0 pb-24 lg:pb-32">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <h3 className="text-base lg:text-lg text-foreground font-semibold leading-tight">
            Have a roadmap you need to move faster?
          </h3>
          <p className="text-xs text-muted leading-relaxed max-w-sm mx-auto">
            Share where your product is today and where you want it to be. We’ll
            respond with a clear plan, timelines and next steps.
          </p>
          <div className="flex flex-col items-center gap-3">
            <a
              href="mailto:hello@designcompany.com"
              className="inline-flex items-center justify-center rounded-full px-8 py-2 text-[10px] font-semibold bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              Email us your project
            </a>
            <a
              href="https://wa.me/yournumber"
              className="text-[10px] text-[#25D366] underline hover:opacity-80"
            >
              Or send a Whatsapp message
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
