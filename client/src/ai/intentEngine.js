import nlp from "compromise";

export const getIntent = (text) => {
  const doc = nlp(text.toLowerCase());

  /* ========================
     INTENT DEFINITIONS
  ======================== */
  const intents = [
    {
      name: "HOME",
      patterns: ["home", "main page", "landing"],
      route: "/",
      auth: false,
    },
    {
      name: "SHOP",
      patterns: ["shop", "store", "products", "buy"],
      route: "/shop",
      auth: false,
    },
    {
      name: "CART",
      patterns: ["cart", "basket", "my cart"],
      route: "/cart",
      auth: true,
    },
    {
      name: "ORDERS",
      patterns: ["orders", "purchases", "previous orders"],
      route: "/orders",
      auth: true,
    },
    {
      name: "PROFILE",
      patterns: [
        "profile",
        "my profile",
        "account",
        "my account",
        "user profile",
      ],
      route: "/profile",
      auth: true,
    },
    {
      name: "ABOUT",
      patterns: ["about", "about us", "company", "who are you", "information"],
      route: "/about",
      auth: false,
    },
    {
      name: "CONTACT",
      patterns: [
        "contact",
        "contact us",
        "support",
        "help",
        "customer support",
      ],
      route: "/contact",
      auth: false,
    },
    {
      name: "LOGOUT",
      patterns: [
        "logout",
        "log out",
        "sign out",
        "exit account",
        "logout my account",
      ],
      action: "LOGOUT",
      auth: true,
    },
    {
      name: "ADMIN",
      patterns: ["admin", "dashboard", "management"],
      route: "/admin",
      auth: true,
      role: "admin",
    },
  ];

  /* ========================
     NLP MATCHING
  ======================== */
  for (let intent of intents) {
    for (let pattern of intent.patterns) {
      if (doc.has(pattern)) {
        return intent;
      }
    }
  }

  return null;
};
