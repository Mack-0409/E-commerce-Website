import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from './CartContext.jsx';
import { ThemeProvider } from './ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeProvider>
  </BrowserRouter>
);
