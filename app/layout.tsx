// import type { Metadata } from "next";
// import { Inter, Roboto_Mono } from "next/font/google";
// import "./globals.css";
// import AuthProvider from "@/context/AuthProvider";
// import { Toaster } from "react-hot-toast";


// const inter = Inter({
//   variable: "--font-sans",
//   subsets: ["latin"],
// });

// const robotoMono = Roboto_Mono({
//   variable: "--font-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "WorkPilot",
//   description: "A platform for managing your project efficiently",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className="dark h-full">
//       <AuthProvider>
//       <body className={`${inter.variable} ${robotoMono.variable} antialiased bg-slate-950 text-white w-full`}>
//   {children}
//         <Toaster position="top-right" />
//               </body>
//       </AuthProvider>
//     </html>
//   );
// }

import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { Inter, Roboto_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "WorkPilot",
  description: "A platform for managing your project efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark h-full">
      <AuthProvider>
        <body className={`${inter.variable} ${robotoMono.variable} antialiased bg-slate-950 text-white w-full`}>
          {children}
          <Toaster position="top-right" />
        </body>
      </AuthProvider>
    </html>
  );
}
