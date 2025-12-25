import { SmoothScroll, LoadingScreen, CustomCursor } from "./components/ui";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Pages
import Home from "./pages/Home";
import AppHome from "./pages/AppHome";
import Login from "./pages/Login";
import { MainLayout } from "./components/layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";

// Public Pages
import AboutUs from "./pages/AboutUs";
import News from "./pages/News";
import Categories from "./pages/Categories";
import SupportUs from "./pages/SupportUs";
import ContactUs from "./pages/ContactUs";

// Admin Pages
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PostsManager from "./pages/admin/PostsManager";
import CategoriesManager from "./pages/admin/CategoriesManager";
import NewsManager from "./pages/admin/NewsManager";
import TeamManager from "./pages/admin/TeamManager";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <SmoothScroll />
      <div className="grain-overlay" />
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} duration={2500} />}
      <CustomCursor />

      <BrowserRouter>
        <main className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />

            {/* Protected Routes (Logged In Users) */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/home" element={<AppHome />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/news" element={<News />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/support" element={<SupportUs />} />
                <Route path="/contact" element={<ContactUs />} />
              </Route>
            </Route>

            {/* Admin Routes (ADMIN Role Only) */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="posts" element={<PostsManager />} />
                <Route path="categories" element={<CategoriesManager />} />
                <Route path="news" element={<NewsManager />} />
                <Route path="team" element={<TeamManager />} />
              </Route>
            </Route>

          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;