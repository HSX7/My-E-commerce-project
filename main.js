if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}else {
    ready();
}

function ready() {
    var removeBtn = document.getElementsByClassName('dlt-btn');
    for (var i = 0; i < removeBtn.length; i++) {
        var button = removeBtn[i];
        button.addEventListener('click', removeCartItem);
    }

    var addToCartButton = document.getElementsByClassName("bx-cart");
    for (var i = 0; i < addToCartButton.length; i++) {
        var button = addToCartButton[i];
        button.addEventListener("click", addItemToCart);
    }

    var quantityInput = document.getElementsByClassName('quantity');
    for (var i=0; i < quantityInput.length; i++) {
        let input = quantityInput[i];
        input.addEventListener('change', quantityChange)
    }

    let addToCartIcon = document.getElementsByClassName('shopping-bag')[0];
    let cart = document.getElementsByClassName("cart")[0];
    addToCartIcon.addEventListener('click', () => {
        cart.classList.add('active');
    });

    let closeBtn = document.getElementsByClassName("bx-exit")[0];
    closeBtn.addEventListener('click', () => {
        cart.classList.remove('active');
    })
}

function quantityChange(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatePrice();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatePrice();
}

function addItemToCart(event) {
    var buttonClicked = event.target;
    var shopItem = buttonClicked.parentElement;
    var title = shopItem.getElementsByClassName('title')[0].innerText;
    var proInfo = shopItem.getElementsByClassName('pro-des')[0].innerText;
    var image = shopItem.getElementsByClassName("product-img")[0].src;
    var price = shopItem.getElementsByClassName('price')[0].innerText;
    addItemToCartClicked(title, proInfo, image, price);
    updatePrice();
}

function addItemToCartClicked(title, proInfo, image, price) {
    var list = document.createElement('div');
    var cart = document.getElementsByClassName('cart-countainer')[0];
    var cartListContent  = `<div class="cart-list">
    <img class="cart-img" src="${image}" alt="">
    <div class="info">
        <h5 class="product-title">${title}</h5>
        <h3 class="product-information">${proInfo}</h3>
        <h4 class="price">${price}</h4>
        <input class="quantity" type="number" value="1">
    </div>
    <i class='bx bx-trash dlt-btn'></i>
    </div>`;
    list.innerHTML = cartListContent;
    cart.append(list);
    list.getElementsByClassName('dlt-btn')[0].addEventListener('click', removeCartItem);
    list.getElementsByClassName('quantity')[0].addEventListener('change', quantityChange);
}

function updatePrice() {
    var cart = document.getElementsByClassName('cart-countainer')[0];
    var cartLists = cart.getElementsByClassName('cart-list');
    var total = 0;
    for (var i=0; i < cartLists.length; i++){
        var cartList = cartLists[i];
        var priceElement = cartList.getElementsByClassName("price")[0];
        var quantityElement = cartList.getElementsByClassName('quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        total = Math.round(total * 100) / 100
    }
    document.getElementsByClassName('total-price')[0].innerText ='$' + total;
}

