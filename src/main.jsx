import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LinksProvider } from "./context/LinksContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ProfileProvider } from "./context/ProfileContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <ProfileProvider>
        <LinksProvider>
          <App />
        </LinksProvider>
      </ProfileProvider>
    </ThemeProvider>
  </StrictMode>,
);
