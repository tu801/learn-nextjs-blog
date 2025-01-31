import { Metadata } from "next";

import configs from "./settings";

// eslint-disable-next-line turbo/no-undeclared-env-vars
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || configs.domain.production;

const ogpImage = {
  url: `${siteUrl}/ogp.jpg`,
  alt: configs.title,
  type: "image/jpg",
  width: "1200",
  height: "630",
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: configs.title,
  description: configs.description,
  applicationName: configs.siteName,
  icons: {
    shortcut: [{ url: "/favicon.png", sizes: "16x16", type: "image/png" }],
    icon: [{ type: "image/png", sizes: "180x180", url: "/android-chrome.png" }],
    apple: [{ sizes: "180x180", url: "/apple-touch-icon.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: configs.title,
    description: configs.description,
    site: configs.siteName,
    images: [ogpImage],
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: configs.title,
    description: configs.description,
    siteName: configs.siteName,
    images: [ogpImage],
  },
  // manifest: "/manifest.json",
  robots: { index: true, follow: true },
  alternates: {
    canonical: siteUrl,
  },
};
