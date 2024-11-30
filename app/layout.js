import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "./components/navbar/Navbar";

import  {SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar'


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Smart Study Tracker APP",
  description: "Complete Guide To Track Students Courses and Roadmap to learn new stuffs easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
            <Navbar />
            <div className="my-10">
              {children}
            </div>
        </Providers>
      </body>
    </html>
  );
}
