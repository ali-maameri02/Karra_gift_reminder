import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTHENTICATION */}
        <Route path="/login" element={<div>Login Page</div>} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <div>Admin Dashboard</div>
            </ProtectedRoute>
          }
        />

        {/* VENDOR DASHBOARD */}
        <Route
          path="/vendor/*"
          element={
            <ProtectedRoute role="vendor">
              <div>Vendor Dashboard</div>
            </ProtectedRoute>
          }
        />

        {/* DELIVERY DASHBOARD */}
        <Route
          path="/delivery/*"
          element={
            <ProtectedRoute role="delivery">
              <div>Delivery Dashboard</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
