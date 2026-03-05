import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIntent } from "../ai/intentEngine";
import { logoutUser } from "../features/auth/authSlice";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export const useAIVoiceNavigation = () => {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  const dispatch = useDispatch();

  const startListening = () => {
    if (!SpeechRecognition) {
      alert("Voice recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      handleAI(text);
    };
  };

  const handleAI = (text) => {
    const intent = getIntent(text);

    if (!intent) {
      alert("Sorry, I didn't understand");
      return;
    }

    // 🔒 AUTH CHECK
    if (intent.auth && !user) {
      navigate("/login");
      return;
    }

    /* 🔴 LOGOUT HANDLER */
  if (intent.action === "LOGOUT") {
    dispatch(logoutUser());
    speak("You have been logged out");
    navigate("/");
    return;
  }

    // 🔒 ROLE CHECK
    if (intent.role && user?.role !== intent.role) {
      alert("Access denied");
      return;
    }

    navigate(intent.route);
  };

  return { startListening };
};











// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

// export const useVoiceNavigation = () => {
//   const navigate = useNavigate();
//   const { user } = useSelector((s) => s.auth);

//   const startListening = () => {
//     if (!SpeechRecognition) {
//       alert("Voice recognition not supported");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.continuous = false;

//     recognition.onresult = (event) => {
//       const command = event.results[0][0].transcript.toLowerCase();
//       handleCommand(command);
//     };

//     recognition.start();
//   };

//   const handleCommand = (command) => {
//     /* PUBLIC ROUTES */
//     if (command.includes("home")) {
//       navigate("/");
//       return;
//     }

//     if (command.includes("shop") || command.includes("store")) {
//       navigate("/shop");
//       return;
//     }

//     /* AUTH REQUIRED */
//     if (command.includes("cart")) {
//       if (!user) return navigate("/login");
//       navigate("/cart");
//       return;
//     }

//     if (command.includes("orders")) {
//       if (!user) return navigate("/login");
//       navigate("/orders");
//       return;
//     }

//     /* ADMIN ONLY */
//     if (command.includes("dashboard") || command.includes("admin")) {
//       if (!user) return navigate("/login");
//       if (user.role !== "admin") {
//         alert("Admin access only");
//         return;
//       }
//       navigate("/admin");
//       return;
//     }

//     alert("Command not recognized");
//   };

//   return { startListening };
// };
