const fetchItem = async (item) => {
  // npm run test:coverage
  try {
    const take = await fetch(`https://api.mercadolibre.com/items/${item}`)
    .then((i) => i.json());
    return take;
  } catch (erro) { return erro.message; }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
