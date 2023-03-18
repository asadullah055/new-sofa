const sidebar = document.getElementById("sidebar");
const cart = document.getElementById("cart");
const closeBtn = document.getElementById("close-btn");
const sideBox = document.getElementById("side-box");
const overlay = document.getElementById("overlay");
const btn = document.getElementById("btn");
const closeMenu = document.getElementById("closeBtn");
const shop = document.getElementById("products-wrapper");
const cartItemsSum = document.getElementById("cart-items-sum");
const processAmount = document.getElementById("process-amount");
const shoppingCart = document.getElementById("shopping-cart");
const summaryCart = document.getElementById("summary-cart");
const subtotal = document.getElementById("subtotal");
const empty = document.getElementById("empty");
const expressDelivery = document.getElementById("express-d");
const regularDelivery = document.getElementById("regular-d");
const totalCost = document.getElementById("total-cost");
const sCost = document.getElementById("s-cost");
const popupOpen = document.getElementById("popup-open");
const popupContant = document.getElementById("popup-contant");
const popupClose = document.getElementById("popup-close");
const discount = document.getElementById("discount");

// =========add function ==========
const add = () => {
  document.body.classList.add("open");
  overlay.classList.add("overlay");
};
// =========close function ==========
const close = () => {
  document.body.classList.remove("open");
  overlay.classList.remove("overlay");
};
// =========open side bar function ==========
const openBar = () => {
  sidebar.style.right = "0px";
  add();
};

// =========close side bar function ==========
const closeBar = () => {
  sidebar.style.right = "-1300px";
  close();
};
// =========close menu function ==========
const menuClose = () => {
  document.getElementById("main-menu").style.left = "-500px";
  close();
};

// ===event Listener
btn.addEventListener("click", function () {
  document.getElementById("main-menu").style.left = "0";
  add();
});
cart.addEventListener("click", openBar);
if (sideBox) {
  sideBox.addEventListener("click", openBar);
}
closeBtn.addEventListener("click", closeBar);
overlay.addEventListener("click", closeBar);

closeMenu.addEventListener("click", menuClose);
overlay.addEventListener("click", menuClose);

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  if (shop) {
    shop.innerHTML = sofaData
      .map((x) => {
        let { name, price, img, id } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
            <div id='card-${id}' class="card">
            <img onclick="popup('${id}')" height="200" class="card-img p-5" src=${img} alt="" />
            <div class="cart-body p-10">
              <p class="card-title p-5">${name}</p>
              <div class="d-flex card-price-button">
                <h3>$${price}</h3>
                <div class="bg-green increase-decrease-button">
                <i onclick="decrement('${id}')" class="fa-solid text-white fa-minus"></i>
                <div id=${id} class="quantity text-white">
                ${search.item === undefined ? 0 : search.item}
              
              </div>
                <i onclick="increment('${id}')" class="fa-solid text-white fa-plus"></i>
                </div>
              </div>
            </div>
          </div>
            `;
      })
      .join("");
  }
};
popupClose?.addEventListener("click", function () {
  popupOpen.style.display = "none";
  close();
});
let popup = (id) => {
  popupOpen.style.display = "block";
  add();
  let data = sofaData.find((y) => y.id === id);

  let { img, name, price, categories, desc, discountPrice } = data;
  popupContant.innerHTML = `
  <img class="p-5 w-50"  height="350" src=${img} alt="" />
  <div class="description p-10">
    <h2 class="d-title">${name}</h2>
    <p class="stock"><span>In stock</span></p>
    <p class="dec"> ${desc}</p>
    <h3 class="price-dis">$${price} <span>$${discountPrice}</span></h3>
    
      <button onclick="increment('${id}')" class="add-to-cart">Add to cart</button>
   
     <h4 class="categories-name p-5">Categories: <span>${categories}</span></h4>
  </div>
   `;
};

overlay.addEventListener("click", () => {
  if (popupOpen) {
    popupOpen.style.display = "none";
  }
  close();
});
generateShop();
let shoppingItems = () => {
  return basket
    .map((x) => {
      let { id, item } = x;
      let search = sofaData.find((y) => y.id === id) || [];

      let { name, price, img } = search;

      return `  
      <div class="cart-items">
      <img width="100" height="100" src=${img} alt="" />
      <div class="details">
        <h3 class="cart-tile">${name}</h3>
        <p>Item price $${price}</p>
        <div class="numbers">
          <h3>$ ${item * price}</h3>
          <div class="increase-decrease-button">
          <i onclick="decrement('${id}')" class="fa-solid fa-minus"></i>
            <div id=${id} class="quantity">${
        item === undefined ? 0 : item
      }</div>
    <i onclick="increment('${id}')" class="fa-solid fa-plus"></i>
          </div>
          <i onclick="removeItem('${id}')" class="fa-solid fa-trash-can"></i>
        </div>
      </div>
    </div>
      `;
    })
    .join("");
};
let generate = () => {
  if (basket.length !== 0) {
    shoppingCart.innerHTML = shoppingItems();
  } else {
    shoppingCart.innerHTML = ``;
  }
};
let summary = () => {
  if (summaryCart) {
    if (basket.length !== 0) {
      summaryCart.innerHTML = shoppingItems();
    } else {
      summaryCart.innerHTML = ``;
    }
  }
};
summary();
generate();

let increment = (id) => {
  let selectItem = id;

  let search = basket.find((x) => x.id === selectItem);
  let data = sofaData.find((y) => y.id === id);
  if (search === undefined) {
    basket.push({
      id: selectItem,
      item: 1,
      data: [data],
    });
  } else {
    search.item += 1;
  }
  update(selectItem);
  totalAmount();
  generate();
  summary();
  totalShippingCost();
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectItem = id;
  let search = basket.find((x) => x.id === selectItem);

  if (search === undefined) {
    return;
  } else if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }
  update(selectItem);
  totalAmount();
  totalShippingCost();
  summary();
  basket = basket.filter((x) => x.item !== 0);
  removeItem();
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id) || [];
  document.getElementById(id).innerHTML = search.item;
  calculate();
};
let calculate = () => {
  let itemAmount = document.getElementById("itemAmount");
  let cartItems = document.getElementById("cart-items");
  let sum = basket.map((x) => x.item).reduce((a, b) => a + b, 0);
  if (cartItems) {
    cartItems.innerHTML = sum < 10 ? "0" + sum : sum;
  }
  itemAmount.innerHTML = sum < 10 ? "0" + sum : sum;
};
let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem);
  generate();
  summary();
  generateShop();
  calculate();
  totalAmount();
  totalShippingCost();
  localStorage.setItem("data", JSON.stringify(basket));
};
let totalAmount = () => {
  let amount = basket
    .map((x) => {
      let search = sofaData.find((a) => a.id === x.id) || [];
      return x.item * search.price;
    })
    .reduce((a, b) => a + b, 0);
  if (cartItemsSum) {
    cartItemsSum.innerHTML = amount;
  }
  processAmount.innerHTML = amount;
  if (subtotal) {
    subtotal.innerHTML = amount;
  }
  if (totalCost) {
    totalCost.innerHTML =
      parseInt(subtotal.innerHTML) +
      parseInt(sCost.innerHTML) -
      parseInt(discount.innerHTML);
  }
  return amount;
};
let totalShippingCost = () => {
  if (expressDelivery) {
    expressDelivery.addEventListener("click", function () {
      if (expressDelivery.checked) {
        sCost.innerHTML = 30;
        totalCost.innerHTML = 30 + totalAmount() - parseInt(discount.innerHTML);
      }
    });
  }
  if (regularDelivery) {
    regularDelivery.addEventListener("click", function () {
      if (regularDelivery.checked) {
        sCost.innerHTML = 20;
        totalCost.innerHTML = 20 + totalAmount() - parseInt(discount.innerHTML);
      }
    });
  }
};
totalShippingCost();
calculate();
totalAmount();
