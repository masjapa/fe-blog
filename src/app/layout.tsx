import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Blog App - by Ariq",
  description: "Made With Love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <nav className='sticky top-0 bg-white py-4 px-[50px] flex justify-between items-center z-10'>
          <div className='font-bold text-xl'>
            <Link href={'/'}>Blog App</Link>
          </div>
          <div className='flex gap-5 items-center'>
            <Link href={'/users'}>
              <button className='hover:underline'>
                Users
              </button>
            </Link>
          </div>
        </nav>
        <div className='p-[40px] min-h-screen'>
          {children}
        </div>
        <div className='bg-white flex w-full p-4 justify-center'>
          Blog Post - by Ariq
        </div>
      </body>
    </html>
  );
}
