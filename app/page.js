import ChatWidget from "./components/ChatWidget";

export default function Home() {
  return (
    <>
      <main className="landing-page">
        {/* Background Image */}
        <img
          src="/landing.png"
          alt="Aarize Group"
          className="landing-bg"
          loading="eager"
        />
        <div className="landing-overlay" />
      </main>

      {/* Chatbot Widget */}
      <ChatWidget />
    </>
  );
}
