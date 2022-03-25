const getSavedCartItems = () => {
  const recover = localStorage.getItem('cartItems');
  return recover;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
