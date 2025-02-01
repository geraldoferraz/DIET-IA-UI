import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./index.css";
import { ThemeProvider } from "./components/theme/theme-provider";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="diet-ia-theme" defaultTheme="light">
        <Helmet titleTemplate="Diet.ia" />
        <Toaster richColors closeButton />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
