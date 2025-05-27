// CartItem.js
import React from 'react';

function CartItem({ product }) {
  return (
    <li style={{ marginBottom: '10px' }}>
      {product.name}: {product.count} шт. × {product.price} ₽ = {product.price * product.count} ₽
    </li>
  );
}

export default React.memo(CartItem); // React.memo для предотвращения лишних ререндеров