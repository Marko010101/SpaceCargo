import { lazy, Suspense } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

const Login = lazy(() => import("./pages/Login"));
const Cities = lazy(() => import("./pages/Cities"));
const Countries = lazy(() => import("./pages/Countries"));
const Flights = lazy(() => import("./pages/Flights"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  const queryClient = new QueryClient();

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Suspense fallback={<div className="p-10 text-center text-white">Loading...</div>}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/" element={<Navigate to="/flights" replace />} />
                <Route path="/flights" index element={<Flights />} />
                <Route path="/cities" element={<Cities />} />
                <Route path="/countries" element={<Countries />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route
                path="/login"
                element={
                  <RedirectIfAuthenticated>
                    <Login />
                  </RedirectIfAuthenticated>
                }
              />
            </Routes>
          </Suspense>
          <Toaster position="top-right" />
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
