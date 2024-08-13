import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CourseProvider } from './Contexts/CourseContext';
import { UserProvider } from './Contexts/UserContext';
import { CartProvider } from './Contexts/CartContext';
import { RemainingProvider } from './Contexts/RemainingContext';
// import 'swiper/swiper-bundle.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <CourseProvider>
      <CartProvider>
        <RemainingProvider>
          <App />
        </RemainingProvider>
      </CartProvider>
    </CourseProvider>
  </UserProvider>
);

