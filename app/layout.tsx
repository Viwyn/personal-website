import type { Metadata } from "next";
import { Geist, Geist_Mono, Comfortaa } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import MusicPlayer from "./components/MusicPlayer";
import GlobalParticles from "./components/GlobalParticles";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const comfortaa = Comfortaa({
	variable: "--font-comfortaa",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Riri's Homepage",
	description: "Made with love by Riri",
	icons: "favicon.ico",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} antialiased font-comfortaa`}
			>
				<GlobalParticles />
				<Providers>{children}</Providers>
				<MusicPlayer volume={0.2} />
			</body>
		</html>
	);
}
