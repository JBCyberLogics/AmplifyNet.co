import "./globals.css";

export const metadata = {
  title: "AmplifyNet.co | WhatsApp Status Advertising Marketplace",
  description:
    "A professional Kenyan marketplace connecting businesses with registered earners for verifiable WhatsApp Status advertising.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
