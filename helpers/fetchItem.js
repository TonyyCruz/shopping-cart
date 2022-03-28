//  busca o item pelo id
const fetchItem = async (item) => {
  // npm run test:coverage
  if (!item) { throw new Error('You must provide an url'); }
    const take = await fetch(`https://api.mercadolibre.com/items/${item}`)
    .then((i) => i.json());
    return take;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
