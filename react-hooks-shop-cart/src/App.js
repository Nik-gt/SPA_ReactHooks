// App.js
import React from 'react';
import { CartProvider } from './CartContext';
import Header from './Header';
import ProductList from './ProductList';
import Cart from './Cart';

function App() {
  return (
    <CartProvider>
      <div style={{ display: 'flex', height: '100vh', backgroundColor: '#121212', color: '#ffffff', overflow: 'hidden' }}>
        {/* Основной контент */}
        <div style={{ flex: 3, padding: '20px', overflowY: 'auto', height: '100vh', borderRight: '1px solid #333' }}>
          <Header />
          <ProductList />
        </div>
        {/* Корзина справа */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#1e1e1e', borderLeft: '1px solid #333' }}>
          <Cart />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;