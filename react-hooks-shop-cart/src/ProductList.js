// ProductList.js
import React, { Component } from 'react';
import { CartContext } from './CartContext';

class ProductList extends Component {
  static contextType = CartContext;

  state = {
    currentPage: 1,
  };

  productsPerPage = 5;

  // Вычисление индексов товаров для текущей страницы
  get currentProducts() {
    const { products } = this.context;
    const { currentPage } = this.state;
    const indexOfLastProduct = currentPage * this.productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - this.productsPerPage;
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  }

  // Переключение страниц
  nextPage = () => {
    const { products } = this.context;
    const { currentPage } = this.state;
    if (currentPage * this.productsPerPage < products.length) {
      this.setState({ currentPage: currentPage + 1 }, () => {
        document.querySelector('.product-list-container').scrollTo(0, 0);
      });
    }
  };

  prevPage = () => {
    this.setState((prevState) => ({ currentPage: Math.max(1, prevState.currentPage - 1) }), () => {
      document.querySelector('.product-list-container').scrollTo(0, 0);
    });
  };

  // Метод для добавления всех товаров в корзину
  addAllProducts = () => {
    const { products } = this.context;
    const { addToCart } = this.context;

    // мутируем массив напрямую
    products.forEach((product) => {
      //addToCart(product.id); // метод контекста
      product.count += 1; // Мутируем объект напрямую
    });

    // Принудительно обновляем компонент
    //this.forceUpdate(); // React не знает об изменениях, поэтому нужно принудительно перерисовать компонент
    //console.log('Товары добавлены, но состояние мутировано напрямую.');
  };

  render() {
    const { products } = this.context;
    const { currentPage } = this.state;

    return (
      <div className="product-list-container" style={{ marginTop: '20px', overflowY: 'auto', height: 'calc(100vh - 250px)', paddingRight: '10px' }}>
        <h2>Список товаров</h2>
        <button
          onClick={this.addAllProducts}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
          Добавить все товары
        </button>
        {this.currentProducts.map((product) => (
          <div key={product.id} style={{ marginBottom: '15px', border: '1px solid #333', padding: '10px', borderRadius: '8px', backgroundColor: '#1e1e1e', color: '#ffffff' }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Цена:</strong> {product.price} ₽</p>
            <button
              onClick={() => {
                const { addToCart } = this.context;
                addToCart(product.id);
              }}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                cursor: 'pointer',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
              }}
            >
              Добавить в корзину
            </button>
          </div>
        ))}
        {/* Кнопки пагинации */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            onClick={this.prevPage}
            disabled={currentPage === 1}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              backgroundColor: currentPage === 1 ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Предыдущая страница
          </button>
          <button
            onClick={this.nextPage}
            disabled={currentPage * this.productsPerPage >= products.length}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              backgroundColor: currentPage * this.productsPerPage >= products.length ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Следующая страница
          </button>
        </div>
      </div>
    );
  }
}

export default ProductList;