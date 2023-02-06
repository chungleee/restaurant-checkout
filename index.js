import { menuArray } from "./dummyData.js";

// add click event on food item buttons
document.addEventListener("click", (event) => {
	if (event.target.dataset.itemId) {
		handleAddItemToCart(event.target.dataset.itemId);
	}
});

const cartItems = [];

function handleAddItemToCart(itemId) {
	menuArray.forEach((item) => {
		if (item.id === parseInt(itemId)) {
			cartItems.push(item);
		}
	});

	renderOrder();
}

function renderOrder() {
	let checkoutListHTML = ``;

	cartItems.forEach((item) => {
		checkoutListHTML += `
				<li>
					<p>${item.name}</p>
					<span id="remove-item-btn" data-item-id='${item.id}' role="button">remove</span>
					<p>$${item.price}</p>
				</li>
		`;
	});

	document.getElementById("checkout-summary").style.display = "block";
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
