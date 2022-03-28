const saveCartItems = (content) => localStorage.setItem('cartItems', content);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
