import Navbar from "comp/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <link rel="icon" href="/logo.svg" />
        <title>GRABOGA 2.0</title>
      </head>
      <body>
        <Navbar />
        <main className="mb-20 md:mb-0">{children}</main>
      </body>
    </html>
  );
}
