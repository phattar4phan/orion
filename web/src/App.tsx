import { LandingPage } from "./components/landing/LandingPage"
import { ToastProvider } from "./components/ui/Toast"

export default function App() {
  return (
    <ToastProvider>
      <LandingPage />
    </ToastProvider>
  )
}
