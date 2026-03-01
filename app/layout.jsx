import {
  Playfair_Display,
  Merriweather,
  Inter,
  DM_Serif_Display,
  Source_Sans_3,
} from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
});

const merriweather = Merriweather({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-ui",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-subhead",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-caption",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata = {
  title: "Nepal Election Simulation 2082",
  description:
    "Contest a parliamentary seat in Nepal's federal election. Write policies, win voters, and watch your party's PM take oath at Singha Durbar.",
  keywords: [
    "Nepal election",
    "election simulation",
    "Nepal 2082",
    "parliamentary game",
    "Nepal politics",
  ],
  authors: [{ name: "Sandip Katel" }],
  creator: "Sandip Katel",

  icons: {
    icon: "/vote.png",
    shortcut: "/vote.png",
    apple: "/vote.png",
  },

  openGraph: {
    title: "Nepal Election Simulation 2082",
    description:
      "Contest a parliamentary seat in Nepal's federal election. Write policies, win voters, and watch your party's PM take oath at Singha Durbar.",
    url: "https://election.skatel.com,np",
    siteName: "Sandip Katel",
    images: [
      {
        url: "/cover_image.png",
        width: 1200,
        height: 630,
        alt: "Nepal Election Simulation 2082",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nepal Election Simulation 2082",
    description:
      "Contest a parliamentary seat in Nepal's federal election. Write policies, win voters, and watch your party's PM take oath at Singha Durbar.",
    images: ["/cover_image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${merriweather.variable} ${inter.variable} ${dmSerifDisplay.variable} ${sourceSans3.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
