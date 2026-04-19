import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import VoiceNavButton from "./VoiceNavButton";
import ChatBot from "./Chatbot";
import Footer from "./Footer";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Layout = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="min-h-[70vh]">
        <Outlet />
      </main>

      {/* VOICE NAV FLOATING BUTTON */}
    <div className="fixed bottom-24 right-6 z-50">
  <Tippy
    content="🎤  Use voice to navigate pages or find products by name or category"
      placement="auto"   // ✅ auto adjust
  trigger="mouseenter focus click"
    animation="shift-away"
    delay={[200, 100]}
  >
    <div>
      <VoiceNavButton />
    </div>
  </Tippy>
</div>

      <div className="fixed bottom-6 right-12 z-50">
         {/* <ChatBot /> */}
      </div>
      
      <div className="relative bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
