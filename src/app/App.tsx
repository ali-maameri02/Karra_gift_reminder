// src/app/providers/AppProviders.tsx
'use client';

// import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { QueryProvider } from "./providers/QueryProvider";
import { RouterProvider } from "./providers/RouterProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

// import { ReactNode } from "react";
// import { I18nProvider } from "./I18nProvider";

export const App = () => {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          {/* <I18nProvider> */}
             <RouterProvider />
          {/* </I18nProvider> */}
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
};
