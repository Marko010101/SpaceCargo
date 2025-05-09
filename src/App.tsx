// src/App.tsx
// import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";

function App() {
  const queryClient = new QueryClient();

  return (
    <Router>
      {/* <Suspense fallback={<SpinnerFullPage />}> */}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" index element={<Home />} />
              {/* <Route path="*" element={<PageNotFound />} /> */}
            </Route>

            <Route
              path="login"
              element={
                <RedirectIfAuthenticated>
                  <Login />
                </RedirectIfAuthenticated>
              }
            />
          </Routes>
          {/* </Suspense> */}
          <Toaster position="top-right" />
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
