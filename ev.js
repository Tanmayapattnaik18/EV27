document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const categoryFilter = document.getElementById('category-filter');
    const sortOrder = document.getElementById('sort-order');
    const searchInput = document.getElementById('search-input');
    
    async function fetchProducts() {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      return products;
    }
    
    async function renderProducts() {
      const products = await fetchProducts();
      productList.innerHTML = ''; 
  
      products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
  
        productItem.innerHTML = `
          <img class="product-image" src="${product.image}" alt="${product.title}">
          <h2 class="product-title">${product.title}</h2>
          <p class="product-price">$${product.price}</p>
        `;
  
        productList.appendChild(productItem);
      });
    }
    
    async function filterProductsByCategory(category) {
      const products = await fetchProducts();
      const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
      renderFilteredProducts(filteredProducts);
    }
    
    function renderFilteredProducts(filteredProducts) {
      productList.innerHTML = '';
  
      filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
  
        productItem.innerHTML = `
          <img class="product-image" src="${product.image}" alt="${product.title}">
          <h2 class="product-title">${product.title}</h2>
          <p class="product-price">$${product.price}</p>
        `;
  
        productList.appendChild(productItem);
      });
    }
    
    async function sortProductsByPrice(order) {
      const products = await fetchProducts();
      const sortedProducts = order === 'asc' ? products.sort((a, b) => a.price - b.price) : products.sort((a, b) => b.price - a.price);
      renderFilteredProducts(sortedProducts);
    }
    
    categoryFilter.addEventListener('change', () => {
      filterProductsByCategory(categoryFilter.value);
    });
  
    sortOrder.addEventListener('change', () => {
      sortProductsByPrice(sortOrder.value);
    });
  
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query));
      renderFilteredProducts(filteredProducts);
    });
    
    renderProducts();
  });
  