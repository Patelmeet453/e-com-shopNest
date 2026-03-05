import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import VoiceNavButton from "./VoiceNavButton";
import ChatBot from "./Chatbot";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="">
        <Outlet />
      </main>

      {/* VOICE NAV FLOATING BUTTON */}
      <div className="fixed bottom-24 right-6 z-50">
        <VoiceNavButton />
      </div>

      <div className="fixed bottom-6 right-12 z-50">
         <ChatBot />
      </div>
      
      <div className="relative bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
