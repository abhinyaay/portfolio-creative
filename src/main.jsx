import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./index.css";
import App from "./App.jsx";

gsap.registerPlugin(ScrollTrigger);

// handy while developing: drive timelines from the console / devtools
if (import.meta.env.DEV) {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
