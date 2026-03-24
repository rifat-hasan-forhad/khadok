// review section

let clientImages = [
  "images/profile1.jpeg",
  "images/profile2.jpeg",
  "images/profile3.jpeg",
];

let clientNames = ["Guy Hawkins", "Sophia Anderson", "Olivia Smith"];

let clientSays = [
  `Foodie is the best. Besides the many delicious meals,
    the service is also very good, especially very fast
    delivery. I highly recommend Foodie to you.`,
  `Fresh ingredients, creative menu, and warm service
    make this spot a hidden gem. Perfect for casual dinners
    or special nights out. Truly a foodie’s paradise!`,
  `Delicious dishes, cozy ambiance, and exceptional service.
    A must-visit for food lovers seeking bold flavors and
    unforgettable dining experiences. Highly recommended,
    every bite delights!`,
];

let img = document.getElementById("client-img");
let clientName = document.getElementById("client-name");
let says = document.getElementById("client-says");

count = 0;

const next = () => {
  count++;

  if (count >= clientImages.length) {
    count = 0;
    img.src = clientImages[count];
    clientName.innerHTML = clientNames[count];
    says.innerHTML = clientSays[count];
  } else {
    img.src = clientImages[count];
    clientName.innerHTML = clientNames[count];
    says.innerHTML = clientSays[count];
  }
};

const prev = () => {
  count--;

  if (count < 0) {
    count = clientImages.length - 1;
    img.src = clientImages[count];
    clientName.innerHTML = clientNames[count];
    says.innerHTML = clientSays[count];
  } else {
    img.src = clientImages[count];
    clientName.innerHTML = clientNames[count];
    says.innerHTML = clientSays[count];
  }
};

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");
const toggleBar = document.querySelector(".toggle-bar");
const mobileNavList = document.querySelector(".mobile-nav-list");

cartIcon.addEventListener("click", (e) => {
  cartTab.classList.add("cart-tab-active");
  e.preventDefault();
});

closeBtn.addEventListener("click", (e) => {
  cartTab.classList.remove("cart-tab-active");
  e.preventDefault();
});

toggleBar.addEventListener("click", () => {
  mobileNavList.classList.toggle("mobile-nav-list-active");
});

let productList = [];
let cartProduct = [];

const cartTotal = document.querySelector(".cart-total");
const cartValue = document.querySelector(".cart-value");

const updateTotals = () => {
  let totalPrice = 0;
  let totalQuantity = 0;

  document.querySelectorAll(".item").forEach((item) => {
    const quantity = parseInt(
      item.querySelector(".quantity-value").textContent,
    );

    const price = parseFloat(
      item.querySelector(".item-total").textContent.replace("BDT", ""),
    );

    totalPrice += price;
    totalQuantity += quantity;
  });

  cartTotal.textContent = `BDT ${totalPrice.toFixed(2)}`;
  cartValue.textContent = totalQuantity;
};

const cardList = document.querySelector(".card-list");

const showCarts = () => {
  productList.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");

    orderCard.innerHTML = `
      <div class="card-image">
          <img src="${product.image}" alt="burger" />
      </div>
      <h4>${product.name}</h4>
      <h4 class="price">${product.price}</h4>
      <a href="#" class="btn card-btn ">Add to cart</a>
    `;

    cardList.appendChild(orderCard);

    const cardBtn = orderCard.querySelector(".card-btn");
    cardBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
};

const cartList = document.querySelector(".cart-list");

const addToCart = (product) => {
  const existingProduct = cartProduct.find((item) => item.id === product.id);
  if (existingProduct) {
    alert("Item already in your cart !!");
    return;
  }

  cartProduct.push(product);

  let quantity = 1;
  let price = parseFloat(product.price.replace("BDT", ""));

  const cardItem = document.createElement("div");
  cardItem.classList.add("item");
  cardItem.innerHTML = `
    <div class="item-image">
      <img src="${product.image}" alt="burger" />
    </div>

    <div class="detail" >
      <h4>${product.name}</h4>
      <h4 class="item-total">${product.price}</h4>
    </div>

    <div class="flex">
      <a href="#" class="quantity-btn">
        <i class="fa-solid fa-minus minus "></i>
      </a>
      <h4 class="quantity-value">1</h4>
      <a href="#" class="quantity-btn plus ">
        <i class="fa-solid fa-plus"></i>
      </a>
    </div>
  `;

  cartList.appendChild(cardItem);

  updateTotals();

  const plusBtn = cardItem.querySelector(".plus");
  const minusBtn = cardItem.querySelector(".minus");
  const quantityValue = cardItem.querySelector(".quantity-value");
  const itemTotal = cardItem.querySelector(".item-total");

  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `BDT ${(price * quantity).toFixed(2)}`;
    updateTotals();
  });

  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `BDT ${(price * quantity).toFixed(2)}`;
      updateTotals();
    } else {
      cardItem.classList.add("item-slide-out");

      setTimeout(() => {
        cardItem.remove();
        cartProduct = cartProduct.filter((item) => item.id !== product.id);
        updateTotals();
      }, 300);
    }
  });
};

const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      showCarts();
    });
};

initApp();
