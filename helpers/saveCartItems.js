const saveCartItems = (content) => {
  localStorage.clear();
  localStorage.setItem('cartItems', content.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
