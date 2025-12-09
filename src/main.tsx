import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RainbowKitProvider } from "./components/RainbowKitProvider";

createRoot(document.getElementById("root")!).render(
  <RainbowKitProvider>
    <App />
  </RainbowKitProvider>
);
  