import React, { useEffect, useState } from "react";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Home from "./pages/Home";
import Brand from "./pages/Brand";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Watch from "./pages/Watch";
import Contact from "./pages/Contact";
import ShippingReturns from "./pages/ShippingReturns";
import ProductCare from "./pages/ProductCare";
import Warranty from "./pages/Warranty";
import FAQ from "./pages/FAQ";
import { ArrowUp } from "lucide-react";
import Cart from "./pages/Cart";
import Chatbot from "./components/Chatbot";
import Payment from "./pages/Payment";

// To scroll to top for each page

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// A protected route
function ProtectedRoute({children}) {
  const location = useLocation();
  const isAuhenticated = Boolean(localStorage.getItem("authToken"));
  return isAuhenticated ? (
    children
  ) : (
    <Navigate to='/login' replace state={{from: location}} />
  );
}

const App =  () => {
  const [showButton, setShowButton] = useState(false);
  // It will show the btn for to top when scroll is more than 300
  useEffect(() => {
    const onScroll = () => setShowButton(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

   /* Defensive client-only styles to prevent any accidental horizontal overflow. */
    useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const root =
      document.getElementById("root") || document.getElementById("app");

    // Prevent horizontal overflow:
    html.style.overflowX = "hidden";
    body.style.overflowX = "hidden";

    // Ensure no default body margin/padding cause layout gaps
    body.style.margin = "0";
    body.style.padding = "0";

    // Use stable scrollbar gutter so width changes from scrollbars don't shift layout
    html.style.scrollbarGutter = "stable";

    // Defensive: ensure root full width and no accidental overflow
    if (root) {
      root.style.maxWidth = "100%";
      root.style.overflowX = "hidden";
    }

    return () => {
      html.style.overflowX = "";
      body.style.overflowX = "";
      body.style.margin = "";
      body.style.padding = "";
      html.style.scrollbarGutter = "";
      if (root) {
        root.style.maxWidth = "";
        root.style.overflowX = "";
      }
    };
  }, []);

  // When click on the btn it will take you to the top of the page.
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });


  return (
    <div className="min-h-screen w-full overflow-x-hidden antialiased bg-white dark:bg-gray-900 text-slate-900 dark:text-gray-100 transition-colors duration-300">
      <ScrollToTopOnRouteChange />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brands/:brandName" element={<Brand/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/watches" element={<Watch/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/shipping-returns" element={<ShippingReturns/>} />
        <Route path="/product-care" element={<ProductCare/>} />
        <Route path="/warranty" element={<Warranty/>} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="/cart" element={<ProtectedRoute>
          <Cart/>
        </ProtectedRoute>}/>
        <Route path="/payment" element={<ProtectedRoute>
          <Payment/>
        </ProtectedRoute>}/>
      </Routes>    

        {/* THE BTN */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`fixed right-6 bottom-24 z-50 flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-300
            ${
              showButton
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-6 pointer-events-none"
            }
            bg-gray-600 text-white hover:bg-amber-700`}
        >
          <ArrowUp size={18} />
        </button>

        <Chatbot />
    </div>
  );
};

export default App