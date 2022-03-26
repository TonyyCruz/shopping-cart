//  faz a busca do produto através do nome.
const fetchProducts = async (find) => {
  try {
    const products = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${find}`)
    .then((items) => items.json());
    // console.log(products.results[0]);
    return products.results;
  } catch (erro) { return erro.message; }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
