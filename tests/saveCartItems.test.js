const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {

  it('Verifica se ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método "localStorage.setItem" é chamado', () => {
    expect.assertions(1);
    const ol = '<ol><li>Item</li></ol>';
  saveCartItems(ol);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('verifica se ao executar saveCartItems com o argumento "<ol><li>Item</li></ol>", o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems.', () => {
    expect.assertions(1);
    const ol = '<ol><li>Item</li></ol>';
    saveCartItems(ol);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', ol.innertext);
  });

  // fail('Teste vazio');
});
