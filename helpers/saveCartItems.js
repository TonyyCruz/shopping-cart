const saveCartItems = (content) => {
  // localStorage.clear(); // o teste nao passou com o .clear aqui, mudei ele para a função que o chama.
  localStorage.setItem('cartItems', content.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
