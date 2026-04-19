// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getIntent } from "../ai/intentEngine";
// import { logoutUser } from "../features/auth/authSlice";

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

// export const useAIVoiceNavigation = () => {
//   const navigate = useNavigate();
//   const { user } = useSelector((s) => s.auth);

//   const dispatch = useDispatch();

//   const startListening = () => {
//     if (!SpeechRecognition) {
//       alert("Voice recognition not supported");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.start();

//     recognition.onresult = (event) => {
//       const text = event.results[0][0].transcript;
//       handleAI(text);
//     };
//   };

//   const handleAI = (text) => {

//     const lowerText = text.toLowerCase();

//   const products = store.getState().products.list; // 👈 access products
//   const categories = ["laptop", "mobile", "earphone", "watch"];

//   /* =========================
//      1. PRODUCT NAME MATCH
//   ========================= */
//   const matchedProduct = products.find((p) =>
//     lowerText.includes(p.name.toLowerCase())
//   );

//   if (matchedProduct) {
//     navigate(`/product/${matchedProduct._id}`);
//     speak(`Opening ${matchedProduct.name}`);
//     return;
//   }

//   /* =========================
//      2. CATEGORY MATCH
//   ========================= */
//   const matchedCategory = categories.find((cat) =>
//     lowerText.includes(cat)
//   );

//   if (matchedCategory) {
//     navigate(`/shop?category=${matchedCategory}`);
//     speak(`Showing ${matchedCategory} products`);
//     return;
//   }


//     const intent = getIntent(text);

//     if (!intent) {
//       alert("Sorry, I didn't understand");
//       return;
//     }

//     // 🔒 AUTH CHECK
//     if (intent.auth && !user) {
//       navigate("/login");
//       return;
//     }

//     /* 🔴 LOGOUT HANDLER */
//   if (intent.action === "LOGOUT") {
//     dispatch(logoutUser());
//     speak("You have been logged out");
//     navigate("/");
//     return;
//   }

//     // 🔒 ROLE CHECK
//     if (intent.role && user?.role !== intent.role) {
//       alert("Access denied");
//       return;
//     }

//     navigate(intent.route);
//   };

//   return { startListening };
// };





// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getIntent } from "../ai/intentEngine";
// import { logoutUser } from "../features/auth/authSlice";

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

// export const useAIVoiceNavigation = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user } = useSelector((s) => s.auth);
//   const products = useSelector((s) => s.products.list);

//   /* =========================
//      SPEAK FUNCTION
//   ========================= */
//   const speak = (msg) => {
//     const speech = new SpeechSynthesisUtterance(msg);
//     speech.lang = "en-IN";
//     window.speechSynthesis.speak(speech);
//   };

//   /* =========================
//      START LISTENING
//   ========================= */
//   const startListening = () => {
//     if (!SpeechRecognition) {
//       alert("Voice recognition not supported");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.start();

//     recognition.onresult = (event) => {
//       const text = event.results[0][0].transcript;
//       console.log("VOICE:", text);
//       handleAI(text);
//     };

//     recognition.onerror = () => {
//       speak("Voice recognition error");
//     };
//   };

//   /* =========================
//      AI HANDLER
//   ========================= */
//   const handleAI = (text) => {
//     const lowerText = text.toLowerCase();

//     const categories = ["laptop", "mobile", "earphone", "watch"];

//     /* =========================
//        1. PRODUCT MATCH
//     ========================= */
//     const matchedProduct = products.find((p) => {
//       const name = p.name.toLowerCase();
//       return (
//         name.includes(lowerText) ||
//         lowerText.includes(name) ||
//         lowerText.includes(name.split(" ")[0])
//       );
//     });

//     if (matchedProduct) {
//       navigate(`/product/${matchedProduct._id}`);
//       speak(`Opening ${matchedProduct.name}`);
//       return;
//     }

//     /* =========================
//        2. CATEGORY MATCH
//     ========================= */
//     const matchedCategory = categories.find((cat) =>
//       lowerText.includes(cat)
//     );

//     if (matchedCategory) {
//       navigate(`/shop?category=${matchedCategory}`);
//       speak(`Showing ${matchedCategory} products`);
//       return;
//     }

//     /* =========================
//        3. DEFAULT INTENT
//     ========================= */
//     const intent = getIntent(text);

//     if (!intent) {
//       speak("Sorry, I didn't understand");
//       return;
//     }

//     // AUTH CHECK
//     if (intent.auth && !user) {
//       navigate("/login");
//       return;
//     }

//     // LOGOUT
//     if (intent.action === "LOGOUT") {
//       dispatch(logoutUser());
//       speak("You have been logged out");
//       navigate("/");
//       return;
//     }

//     // ROLE CHECK
//     if (intent.role && user?.role !== intent.role) {
//       alert("Access denied");
//       return;
//     }

//     navigate(intent.route);
//   };

//   return { startListening };
// };




import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIntent } from "../ai/intentEngine";
import { logoutUser } from "../features/auth/authSlice";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export const useAIVoiceNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((s) => s.auth);
  const products = useSelector((s) => s.products.list);

  /* =========================
     SPEAK FUNCTION
  ========================= */
  const speak = (msg) => {
    const speech = new SpeechSynthesisUtterance(msg);
    speech.lang = "en-IN";
    window.speechSynthesis.speak(speech);
  };

  /* =========================
     SMART PRODUCT MATCHING
  ========================= */
  const findBestProductMatch = (products, text) => {
    const lowerText = text.toLowerCase();

    let bestMatch = null;
    let bestScore = 0;

    products.forEach((p) => {
      const name = p.name.toLowerCase();
      const words = name.split(" ");

      let score = 0;

      // ✅ Exact match
      if (lowerText === name) score = 100;

      // ✅ Full name match
      else if (lowerText.includes(name)) score = 90;

      else {
        const matchCount = words.filter((w) =>
          lowerText.includes(w)
        ).length;

        score = matchCount * 20;

        // 🔥 BRAND BOOST (first word like vivo, oppo, boat)
        if (lowerText.includes(words[0])) {
          score += 30;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = p;
      }
    });

    return { bestMatch, bestScore };
  };

  /* =========================
     BRAND DETECTION (MULTIPLE PRODUCTS)
  ========================= */
  const findBrandMatch = (products, text) => {
    const lowerText = text.toLowerCase();

    const brands = [
      ...new Set(products.map((p) => p.name.split(" ")[0].toLowerCase())),
    ];

    return brands.find((brand) => lowerText.includes(brand));
  };

  /* =========================
     START LISTENING
  ========================= */
  const startListening = () => {
    if (!SpeechRecognition) {
      alert("Voice recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      console.log("VOICE:", text);
      handleAI(text);
    };

    recognition.onerror = () => {
      speak("Voice recognition error");
    };
  };

  /* =========================
     AI HANDLER
  ========================= */
  const handleAI = (text) => {
    const lowerText = text.toLowerCase();

    const categories = ["laptop", "mobile", "earphone", "watch"];

    /* =========================
       1. PRODUCT MATCH (STRONG ONLY)
    ========================= */
    const { bestMatch, bestScore } = findBestProductMatch(
      products,
      lowerText
    );

    if (bestMatch && bestScore >= 30) {
      navigate(`/product/${bestMatch._id}`);
      speak(`Opening ${bestMatch.name}`);
      return;
    }

    /* =========================
       2. BRAND MATCH (SHOW MULTIPLE)
    ========================= */
    const matchedBrand = findBrandMatch(products, lowerText);

    if (matchedBrand) {
      navigate(`/shop?brand=${matchedBrand}`);
      speak(`Showing ${matchedBrand} products`);
      return;
    }

    /* =========================
       3. CATEGORY MATCH
    ========================= */
    const matchedCategory = categories.find((cat) =>
      lowerText.includes(cat)
    );

    if (matchedCategory) {
      navigate(`/shop?category=${matchedCategory}`);
      speak(`Showing ${matchedCategory} products`);
      return;
    }

    /* =========================
       4. DEFAULT INTENT (NAVIGATION)
    ========================= */
    const intent = getIntent(text);

    if (!intent) {
      speak("Sorry, I didn't understand");
      return;
    }

    // 🔒 AUTH CHECK
    if (intent.auth && !user) {
      navigate("/login");
      return;
    }

    // 🔴 LOGOUT
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