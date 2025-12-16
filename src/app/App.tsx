import { RouterProvider } from "./providers/RouterProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;  // 👈 default export