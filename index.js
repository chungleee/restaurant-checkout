import { menuArray } from "./dummyData.js";

// add click event on food item buttons
document.addEventListener("click", (event) => {
	if (event.target.dataset.itemId) {
		handleAddItemToCart(event.target.dataset.itemId);
	} else if (event.target.dataset.itemIndexRemove) {
		handleRemoveItemFromCart(event.target.dataset.itemIndexRemove);
		console.log(event.target.dataset.itemIndexRemove);
	}
});

let cartItems = [];
let totalPrice = 0;

function handleAddItemToCart(itemId) {
	menuArray.forEach((item) => {
		if (item.id === parseInt(itemId)) {
			cartItems.push(item);
			totalPrice += item.price;
		}
	});
	console.log("cart: ", cartItems);
	renderOrder();
}

function handleRemoveItemFromCart(itemIndex) {
	const updatedCart = cartItems.filter((item, index) => {
		return parseInt(itemIndex) !== index;
	});

	cartItems = updatedCart;
	handleTotalPrice();
	renderOrder();
}

function handleTotalPrice() {
	let newTotal = 0;
	cartItems.forEach((item) => {
		newTotal += item.price;
	});

	totalPrice = newTotal;
}

function renderOrder() {
	let checkoutListHTML = ``;

	cartItems.forEach((item, index) => {
		checkoutListHTML += `
				<li>
					<p>${item.name}</p>
					<span id="remove-item-btn" data-item-index-remove='${index}' role="button">remove</span>
					<p>$${item.price}</p>
				</li>
		`;
	});

	document.getElementById("total-price").textContent = `$${totalPrice}`;
	if (cartItems.length) {
		document.getElementById("checkout-summary").style.display = "block";
	} else {
		document.getElementById("checkout-summary").style.display = "none";
	}
	document.getElementById("checkout-list").innerHTML = checkoutListHTML;
}

function render() {
	let menuItemHTML = "";
	menuArray.forEach((item) => {
		let ingredients = item.ingredients.join(", ");
		menuItemHTML += `
                    <div class="menu-item">
                        <p role="img" aria-details='${item.name}' class="menu-item-emoji">${item.emoji}</p>
                        <div class="menu-item-description">
                          <h3>${item.name}</h3>
                          <p>${ingredients}</p>
                          <p>$${item.price}</p>
                        </div>
                        <button data-item-id='${item.id}' class="add-btn">+</button>
                    </div>
  `;
	});
	document.getElementById("menu-item-container").innerHTML = menuItemHTML;
}

render();
