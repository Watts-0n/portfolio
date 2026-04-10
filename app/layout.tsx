import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SplashCursor from "@/components/ui/SplashCursor";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Preloader } from "@/components/ui/preloader";
import { PageReveal } from "@/components/ui/page-reveal";
import dynamic from "next/dynamic";

const PixelBlast = dynamic(() => import("@/components/ui/background"), {
  ssr: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.VERCEL_ENV === "preview"
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3002";

const title = "Portfolio of Dāvids Locāns";
const description =
  "Portfolio of Dāvids Locāns";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "./",
    siteName: title,
    images: "/og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth shadcn">
      <body
        className={`font-body relative w-screen antialiased overflow-x-hidden ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
      >
        <Preloader />

        {/* Deepest static background layer */}
        <div className="fixed w-screen h-dvh inset-0 z-[-1] pointer-events-none">
          <PageReveal className="w-full h-full">
            <div className="relative w-full h-full bg-background overflow-hidden">
              <div className="animate-hero-breathe absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/hero-bg.jpg')] before:absolute before:inset-0 before:bg-primary before:mix-blend-color-dodge dark:before:mix-blend-color" />
            </div>
            <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/50 to-background" />
          </PageReveal>
        </div>

        {/* Interactive scrollable background layer natively sitting on top of the hero-bg */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <PageReveal className="w-full h-full">
            <PixelBlast
              variant="triangle"
              pixelSize={4}
              color="#c0c0c0"
              patternScale={50}
              patternDensity={0.3}
              pixelSizeJitter={0}
              enableRipples={false}
              speed={0.5}
              edgeFade={0}
              transparent
            />
          </PageReveal>
        </div>
        <SplashCursor />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="relative z-10">
            <PageReveal>
              {children}
            </PageReveal>
          </div>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
