import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@fontsource/noto-naskh-arabic/400.css"
import "@fontsource/noto-naskh-arabic/600.css"
import "./index.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
