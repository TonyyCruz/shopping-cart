//  faz a busca do produto através do nome.
const fetchProducts = async (find) => {
    if (!find) { throw new Error('You must provide an url'); }
    const products = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${find}`)
    .then((items) => items.json());
    return products;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
