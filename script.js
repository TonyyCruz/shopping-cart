const items = document.querySelector('.items');
const cartIems = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) { // remove conteudo selecionado do carrinho<===
  console.log(event.target); // teste
  cartIems.removeChild(event.target);
  saveCartItems(cartIems);
}

function createCartItemElement({ sku, name, salePrice, image }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.appendChild(createProductImageElement(image));
  li.addEventListener('click', cartItemClickListener);
  return li;
}

//  inicio do meu código <-------------------

//  adiciona funcionalidade ao botão adicionar a carrinho <====
const addCartButtonConfig = (obj, id) => {
  const butt = obj.querySelector('.item__add');
  butt.id = id; // teste
  butt.addEventListener('click', async () => {
  const cardItem = await fetchItem(id); //  recebe o objeto do item pelo id
  const { id: sku, title: name, price: salePrice, thumbnail: image } = cardItem;
  const itemAdd = createCartItemElement({ sku, name, salePrice, image });
  cartIems.appendChild(itemAdd);
  saveCartItems(cartIems); //  salva os itens do carrinho no localstorage
  });
};

//  recebe um busca um array de itens em "fetchProducts()"  <====
// e envia para "createProductItemElement()" que monta o item no site.
const displayItems = async (find) => {
  const itemsArray = await fetchProducts(find);
  itemsArray.forEach((make) => {
    const { id: sku, title: name, thumbnail: image } = make;
    const element = createProductItemElement({ sku, name, image });
    addCartButtonConfig(element, sku);
    items.appendChild(element);
  });
};

const cartStorageRerelease = () => { // *******************
  const cartRelease = getSavedCartItems();
  console.log(cartRelease); // teste
  cartIems.innerHTML = cartRelease;
};
//

window.onload = () => {
  displayItems('computador');
  // cartStorageRerelease();
};
