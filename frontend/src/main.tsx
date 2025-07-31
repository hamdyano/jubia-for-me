import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./AppRoutes.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ToastProvider } from "./contexts/ToastProvider.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
     <ToastProvider>
    <QueryClientProvider client={queryClient}>
      
        <AuthProvider>
        <App />
        </AuthProvider>
    
    </QueryClientProvider>
    </ToastProvider>
  </React.StrictMode>
);
