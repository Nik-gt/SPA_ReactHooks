// Header.js
import React, { useContext, useMemo } from 'react';
import { CartContext } from './CartContext';

function Header() {
  const { products } = useContext(CartContext);

  // Подсчитываем количество товаров в корзине
  const cartCount = useMemo(() => {
    return products.reduce((sum, product) => sum + product.count, 0);
  }, [products]);

  return (
    <header style={{ padding: '10px', background: '#121212', color: '#ffffff', textAlign: 'center' }}>
      <h1>Интернет-магазин, React Hooks</h1>
      <div>Товаров в корзине: {cartCount}</div>
    </header>
  );
}

export default React.memo(Header);