import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Получаем начальное состояние из localStorage
  const getInitialProducts = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return [
      { id: 1, name: 'Телефон', description: 'Смартфон последней модели', price: 50000, count: 0 },
      { id: 2, name: 'Ноутбук', description: 'Мощный ноутбук для работы', price: 120000, count: 0 },
      { id: 3, name: 'Наушники', description: 'Беспроводные наушники', price: 15000, count: 0 },
      { id: 4, name: 'Планшет', description: 'Ультратонкий планшет', price: 80000, count: 0 },
      { id: 5, name: 'Чехол для телефона', description: 'Защитный чехол', price: 2000, count: 0 },
      { id: 6, name: 'Клавиатура', description: 'Механическая клавиатура', price: 10000, count: 0 },
      { id: 7, name: 'Мышь', description: 'Игровая мышь', price: 5000, count: 0 },
      { id: 8, name: 'Монитор', description: '4K монитор', price: 30000, count: 0 },
      { id: 9, name: 'Принтер', description: 'Цветной принтер', price: 25000, count: 0 },
      { id: 10, name: 'Флешка', description: 'USB флешка 64GB', price: 1500, count: 0 },
    ];
  };

  const [products, setProducts] = useState(getInitialProducts);

  // Сохраняем состояние корзины в localStorage при изменении products
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(products));
  }, [products]);

  // Кэшируем функцию добавления товара
  const addToCart = useCallback((productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, count: product.count + 1 } : product
      )
    );
  }, []);

  // Передаем значение через контекст
  const value = useMemo(() => ({ products, addToCart }), [products, addToCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};