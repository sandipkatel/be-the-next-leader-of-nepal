import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shree Patrika — Nepal Election Simulation 2082",
  description:
    "Contest a parliamentary seat in Nepal's federal election. Write policies, win voters, and watch your party's PM take oath at Singha Durbar.",
  keywords: [
    "Nepal election",
    "election simulation",
    "Nepal 2082",
    "parliamentary game",
    "Shree Patrika",
    "Nepal politics",
  ],
  authors: [{ name: "Shree Patrika" }],
  creator: "Shree Patrika",

  icons: {
    icon: "/vote.png",
    shortcut: "/vote.png",
    apple: "/vote.png",
  },

  openGraph: {
    title: "Shree Patrika — Nepal Election Simulation 2082",
    description:
      "Contest a parliamentary seat in Nepal's federal election. Write policies, win voters, and watch your party's PM take oath at Singha Durbar.",
    url: "https://Shreepatrika.com",
    siteName: "Shree Patrika",
    images: [
      {
        url: "/cover_image.png",
        width: 1200,
        height: 630,
        alt: "Shree Patrika — Nepal Election Simulation 2082",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shree Patrika — Nepal Election Simulation 2082",
    description:
      "Contest a parliamentary seat in Nepal's federal election. Write policies, win voters, and watch your party's PM take oath at Singha Durbar.",
    images: ["/cover_image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}