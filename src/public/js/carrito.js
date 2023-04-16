




let allContainerCart = document.querySelector('.container-detalle-producto');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.cant-carrito');


let buyThings = [];
let totalCard = 0;
let countProduct = 0;


//leemos si hay algo el en local storage
if (localStorage.getItem('buyThings')) {
    buyThings = JSON.parse(localStorage.getItem('buyThings'));
    console.log(buyThings)
    loadHtml();
}


if(localStorage.getItem('countProduct')){
    countProduct = parseInt(localStorage.getItem('countProduct'));
    amountProduct.innerHTML = countProduct;
}

if(localStorage.getItem('totalCard')){
    totalCard = parseInt(localStorage.getItem('totalCard'));
    priceTotal.innerHTML = totalCard;
}

//functions
loadEventListenrs();
function loadEventListenrs(){
    try {
        allContainerCart.addEventListener('click', addProduct);
      } catch (error) {
        console.log("estamos en otra pantalla que no es detalles")
      }
    

    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        readTheContent(allContainerCart);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        countProduct--;
        saveLocalStorage();
        loadHtml();
        console.log(buyThings)
        
        
    }
    //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
}

function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('.product-img img').src,
        title: product.querySelector('.product-desc h2').textContent,
        price: product.querySelector('#product-price p span').textContent,
        id: product.querySelector('.product-desc h2').textContent,
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    saveLocalStorage();
    loadHtml();
    //console.log(infoProduct);
}

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Cant: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        amountProduct.innerHTML = countProduct;
    });
}
 function clearHtml(){
    containerBuyCart.innerHTML = '';
 }

 function saveLocalStorage() {
    localStorage.setItem('buyThings', JSON.stringify(buyThings)); 
    localStorage.setItem('countProduct', countProduct);
    localStorage.setItem('totalCard', totalCard);// guardar los datos en el localStorage como un string JSON
}


function ClearAll(){
    clearHtml();
    buyThings = []
    totalCard = 0;
    countProduct = 0;
    localStorage.removeItem('buyThings');
    localStorage.removeItem('totalCard');
    localStorage.removeItem('countProduct');
    priceTotal.innerHTML = totalCard;
    amountProduct.innerHTML = countProduct;
}

function RealizarCompra(){
    GetCarritoByEmail();
}