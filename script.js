const items = document.querySelector('.items');
const cartIems = document.querySelector('.cart__items');
const emptyCart = document.querySelector('.empty-cart');

//

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

//  função que cria os elementos <====
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

//  cria os elementos para os itens que foram buscados no site <====
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

// function getSkuFromProductItem(item) { // não usei <<<<<
//   return item.querySelector('span.item__sku').innerText;
// }

//  atribui o valor total ao carrinho <====
const totalCartPrice = (valor = 0) => { //  nao esta resetando o valor, precisou de outra funcao
  const subtotalPrice = document.querySelector('.total-price');
  subtotalPrice.innerHTML = `Subtotal: R$ ${valor}`;
};

const carReset = () => { //  função para resetar o valor do carrinho <====
  if (cartIems.children.length === 0) { totalCartPrice(0); }
};

const cartItensSum = async () => {
  let toPay = 0;
  const carItem = document.querySelectorAll('.cart__item');
  carItem.forEach(async (element, i) => {
    const valor = await fetchItem(element.id);
    toPay += valor.price;
  // chama a função que atribui o preço no ultimo for.
    if (i + 1 === carItem.length) { totalCartPrice(toPay); } 
  });
};

//  atualiza o carrinho ao adicionar ou remover itens <====****
const cartStatusReload = () => {
  carReset();
  cartItensSum();
  saveCartItems(cartIems); //  salva os itens do carrinho no localstorage
};

function cartItemClickListener(event) { // remove o conteudo selecionado do carrinho<===
  cartIems.removeChild(event.target);
  cartStatusReload();
}

//  cria os elementos do carrinho <====
function createCartItemElement({ sku, name, salePrice, image }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.appendChild(createProductImageElement(image));
  li.addEventListener('click', cartItemClickListener);
  return li;
}

//
//  inicio do meu código <---------------------------------------------------------------

//  adiciona funcionalidade ao botão adicionar a carrinho <====
const addCartButtonConfig = (obj, id) => {
  const butt = obj.querySelector('.item__add');
  butt.addEventListener('click', async () => {
  const cardItem = await fetchItem(id); //  recebe o objeto do item pelo id
  const { id: sku, title: name, price: salePrice, thumbnail: image } = cardItem;
  const itemAdd = createCartItemElement({ sku, name, salePrice, image });
  cartIems.appendChild(itemAdd);
  cartStatusReload();
  });
};

//  envia o item buscado  para "fetchProducts()" que envia um array com os itens <====
// depois envia os itens para "createProductItemElement()" que monta o item no site.
const displayItems = async (find) => {
  const itemsArray = await fetchProducts(find);
  itemsArray.forEach((make) => {
    const { id: sku, title: name, thumbnail: image } = make;
    const element = createProductItemElement({ sku, name, image });
    addCartButtonConfig(element, sku);
    items.appendChild(element);
  });
};

//  recupera os itens do storage e os poe novamente no carrinho<====
const cartStorageRerelease = () => {
  const cartRelease = getSavedCartItems();
  cartIems.innerHTML = cartRelease;
  cartIems.childNodes
  .forEach((li) => li.addEventListener('click', cartItemClickListener));
};

// Cria um h3 para mostrar o subtotal do carrinho <==== *****
// const subtotal = (valor) => {
//   const h3 = document.createElement('h3');
//   h3.classList.add('total-price');
//   h3.innerHTML = `Subtotal: <b>RS ${valor}</b>`;
//   cart.appendChild(h3);
// };

//  esvazia o carrinho de compras <====
emptyCart.addEventListener('click', () => {
  cartIems.innerHTML = '';
  cartStatusReload();
});

//  desabilita a frase de carregamento <====
/*  baseado em "https://www.youtube.com/watch?v=1WpoqviwrPM&t=618s&ab_channel=ilustraCode-Programa%C3%A7%C3%A3oWeb" */
const preload = () => {
  document.querySelector('.loading').style.display = 'none';
  document.querySelector('.container').style.display = 'flex';
};

//

window.onload = () => {
  displayItems('computador');
  cartStorageRerelease();
  cartStatusReload();
  preload();
};
