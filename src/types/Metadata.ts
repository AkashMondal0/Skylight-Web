import { configs } from "@/configs"
import { Metadata } from "next"

export const metaRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  nocache: false,
  googleBot: {
    index: true,
    follow: true,
    noimageindex: false,
    'max-video-preview': 1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

export const AppMetadata: Metadata = {
  title: 'SkyLight',
  description: `SkyLight is a social media platform that 
    allows users to share their thoughts and ideas with the world.`,
  generator: 'SkyLight',
  applicationName: `${configs.AppDetails.name}`,
  referrer: 'origin-when-cross-origin',
  keywords: ['SkyLight', 'React', 'Next.js', 'JavaScript', 'TypeScript'],
  authors: [
    { name: 'Akash Mondal', url: 'https://skysolo.me' },
    { name: 'Akash Mondal', url: 'https://github.com/akashmondal0' },
    { name: 'Akash Mondal', url: "https://www.instagram.com/iamskysolo/" },
    { name: 'Akash Mondal', url: 'https://www.linkedin.com/in/akashmondal0' }
  ],
  creator: 'Akash Mondal',
  publisher: 'SkySolo.Inc',
  metadataBase: new URL('https://skysolo.me'),
  openGraph: {
    title: 'SkyLight - Share Your World',
    description: 'Join SkyLight to connect with others and share your ideas.',
    url: `${configs.AppDetails.appUrl}`,
    siteName: 'SkyLight',
    images: [
      {
        url: `${configs.AppDetails.appUrl}${configs.AppDetails.primaryLightLogo}`,
        width: 1200,
        height: 630,
      },
      {
        url: `${configs.AppDetails.appUrl}${configs.AppDetails.logoUrl}`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkyLight - Share Your World',
    description: 'Join SkyLight to connect with others and share your ideas.',
    site: '@SkyLightApp',
    creator: '@AkashMondal',
    images: [
      `${configs.AppDetails.appUrl}${configs.AppDetails.primaryLightLogo}`,
      `${configs.AppDetails.appUrl}${configs.AppDetails.logoUrl}`],
  },
  robots: metaRobots,
  category: `${configs.AppDetails.category}`,
}

export const NotFoundMetadata: Metadata = {
  ...AppMetadata,
  title: "Page isn't available",
  description: "The link you followed may be broken, or the page may have been removed. Go back to SkyLight Home Page.",
  openGraph: {
    ...AppMetadata.openGraph,
    title: "Page isn't available",
    description: "The link you followed may be broken, or the page may have been removed. Go back to SkyLight Home Page.",
  },
  twitter: {
    ...AppMetadata.twitter,
    card: 'summary_large_image',
    title: "Page isn't available",
    description: "The link you followed may be broken, or the page may have been removed. Go back to SkyLight Home Page.",
  },
}