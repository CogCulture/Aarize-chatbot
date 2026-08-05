import "./globals.css";

export const metadata = {
  title: "Aarize Assistant | Aarize Group AI Chatbot",
  description:
    "Chat with Aarize Assistant — your AI-powered guide to Aarize Group's premium residential, commercial, retail, and township projects in Gurugram, Delhi-NCR.",
  keywords:
    "Aarize Group, Aarize chatbot, real estate Gurugram, commercial property, residential projects, SCO plots, Aarize South Drive, Aarize Karnelya, Aarize Tessoro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://www.aarize.in/images/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
