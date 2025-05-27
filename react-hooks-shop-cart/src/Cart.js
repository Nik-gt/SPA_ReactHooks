// Cart.js
import React, { useContext, useMemo } from 'react';
import { CartContext } from './CartContext';
import CartItem from './CartItem';

function Cart() {
  const { products } = useContext(CartContext);

  // Фильтруем товары с count > 0
  const cartItems = useMemo(() => {
    return products.filter((product) => product.count > 0);
  }, [products]);

  // Подсчитываем общую стоимость
  const totalCost = useMemo(() => {
    return cartItems.reduce((sum, product) => sum + product.price * product.count, 0);
  }, [cartItems]);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Корзина</h2>
      {cartItems.length > 0 ? (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </ul>
          <h3>Общая стоимость: {totalCost} ₽</h3>
        </>
      ) : (
        <p>Корзина пуста.</p>
      )}
    </div>
  );
}

export default React.memo(Cart); // React.memo для предотвращения лишних ререндеров