import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shruti Ravikumar | CS Student, AI, Robotics and DevOps",
  description:
    "Computer Science undergraduate at IIITDM Kancheepuram with hands-on experience in software development, AI/computer vision, robotics, DevOps, and data analytics.",
  keywords: [
    "Shruti Ravikumar",
    "IIITDM Kancheepuram",
    "Computer Science",
    "AI",
    "Computer Vision",
    "Robotics",
    "DevOps",
    "Portfolio",
  ],
  authors: [{ name: "Shruti Ravikumar" }],
  creator: "Shruti Ravikumar",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://shrutiravikumar.vercel.app"
  ),
  openGraph: {
    title: "Shruti Ravikumar | CS Student, AI, Robotics and DevOps",
    description:
      "Computer Science undergraduate at IIITDM Kancheepuram. Building systems that see, think, and ship.",
    url: "/",
    siteName: "Shruti Ravikumar Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shruti Ravikumar | CS Student, AI, Robotics and DevOps",
    description:
      "Computer Science undergraduate at IIITDM Kancheepuram. Building systems that see, think, and ship.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#CDBF98",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shruti Ravikumar",
    jobTitle: "B.Tech CSE Student",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "IIITDM Kancheepuram",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Abu Dhabi Indian School",
      },
    ],
    sameAs: [
      "https://linkedin.com/in/shruti-ravikumar-8a0053365",
      "https://github.com/Shruti2738",
    ],
    description:
      "Computer Science undergraduate at IIITDM Kancheepuram with hands-on experience in software development, AI/computer vision, robotics, DevOps, and data analytics.",
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anton.variable} ${inter.variable}`}
    >
      <head>
        {/* Zero-flash theme initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="night"){document.documentElement.setAttribute("data-theme","night")}else{document.documentElement.removeAttribute("data-theme")}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-inter bg-[var(--band-cream)] text-[var(--text-main)] transition-colors duration-300">
        {/* Skip to main content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-6 focus:py-3 focus:bg-[var(--plum)] focus:text-[var(--paper)] focus:outline focus:outline-2 focus:outline-[var(--bronze)] font-semibold"
        >
          Skip to content
        </a>

        {/* Global SVG Film Grain Overlay */}
        <svg
          className="film-grain"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <filter id="grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-filter)" />
        </svg>

        <div id="app-root" className="relative flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
