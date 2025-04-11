/*document.addEventListener("DOMContentLoaded", function () {
    //const params = new URLSearchParams(window.location.search);
    //const productId = Number(params.get('id'));

    const storedProducts = JSON.parse(localStorage.getItem("cart"))
    const selectedProduct = storedProducts.find(product=> product.id === productId);

    if (selectedProduct) {
        render(selectedProduct);
    } else {
        console.error("Product not found!");
    }
});*/

document.addEventListener('DOMContentLoaded', function () {
    displayItemsInCart();
    cartCounter();
    handleButtonClicks();
    removeAllItems();

});

document.getElementById("myForm").addEventListener('submit', saveData);

function saveData(e) {
    e.preventDefault();

    const nameInput = document.getElementById("name").value
    const emailInput = document.getElementById("email").value
    const phoneNumberInput = document.getElementById("phonenumber").value
    const addressInput = document.getElementById("address").value
    const zipCodeInput = document.getElementById("zipcode").value
    const cityInput = document.getElementById("city").value

    let confirmOrder;

    confirmOrder = validateName(nameInput)
        && validateEmail(emailInput)
        && validatePhoneNumber(phoneNumberInput)
        && validateAddress(addressInput)
        && validateZipCode(zipCodeInput)
        && validateCity(cityInput);

    if (!confirmOrder) {
        return;
    }

    window.location.href = "orderconfirmation.html";
    localStorage.clear();
}

function displayItemsInCart(){

    const itemsInCart = loadCartFromStorage();
    const displayItems = document.getElementById("display-shopping-cart-items")

    if (!displayItems) {
        return;
    }

    if (itemsInCart.length === 0) {
        displayItems.innerHTML ="<p>Varukorgen är tom</p>";
        return
    }

    let displayHtml = "";
    let totalPrice = 0;

    itemsInCart.forEach(item => {

        const itemTotalPrice=Math.ceil(item.quantity * Number(item.price) * 10);
        totalPrice += itemTotalPrice;

        displayHtml += `
        <div class = "shopping-cart-items"> 
            <div class="item-picture"> 
            <img src="${item.image}" class="card-img-top p-4" alt="${item.title}">
            </div>
            
            <div class="item-quantity"> <h5>Antal</h5> <p> ${item.quantity} </p>     
            <button class="button-add" data-id="${item.id}">+</button>
            <button class="button-remove" data-id="${item.id}">-</button> 
            <div class = "item-price"> <p> ${itemTotalPrice} SEK</p>
            </div>
          </div>
        </div> `;
    });

    displayHtml += `
    <div class="total-sum mt-3">
        <h5>Att betala: ${totalPrice} SEK</h5>
    </div>
    
    <button class="button-remove-all">Töm varukorgen</button>
    
`;

    displayItems.innerHTML = displayHtml;

}

function handleButtonClicks() {

    document.addEventListener('click', function (e) {

        if (e.target.classList.contains('button-add') || e.target.classList.contains('button-remove')) {
            const itemId = e.target.getAttribute('data-id');

            let itemsInCart = loadCartFromStorage();

            const item = itemsInCart.find(i => i.id === Number(itemId));

            if (e.target.classList.contains('button-add')) {
                item.quantity++;
            }

            if (e.target.classList.contains('button-remove')) {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    const index = itemsInCart.findIndex(i => i.id === Number(itemId));
                    itemsInCart.splice(index, 1);
                }
            }

            saveCartToStorage(itemsInCart);
            displayItemsInCart();
            cartCounter();

        }
    });
}

function removeAllItems() {
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('button-remove-all')) {
            localStorage.clear();
            console.log("clicked worked")
            displayItemsInCart();
            cartCounter();
        }
    });

}

        function validateName(nameInput) {
            let validateNameInput = document.getElementById("inputValidationName")

            if (nameInput.length < 2 || nameInput.length > 50) {
                validateNameInput.style.display = "block";
                return false;
            } else {
                validateNameInput.style.display = "none";
                return true;
            }
        }

        function validateEmail(emailInput) {
            let validateEmailInput = document.getElementById("inputValidationEmail")

            if (!emailInput.includes('@') || emailInput.length > 50) {
                validateEmailInput.style.display = "block";
                return false;
            } else {
                validateEmailInput.style.display = "none";
                return true;

            }
        }

        function validatePhoneNumber(phoneNumberInput) {
            let validatePhoneNumberInput = document.getElementById("inputValidationPhoneNumber")
            if (!/^[\d\-()]{1,50}$/.test(phoneNumberInput)) {
                validatePhoneNumberInput.style.display = "block";
                return false;
            } else {
                validatePhoneNumberInput.style.display = "none";
                return true;
            }
        }

        function validateAddress(addressInput) {
            let validateAddressInput = document.getElementById("inputValidationAddress")

            if (addressInput.length < 2 || addressInput.length > 50) {
                validateAddressInput.style.display = "block";
                return false;
            } else {
                validateAddressInput.style.display = "none";
                return true;
            }
        }

        function validateZipCode(zipCodeInput) {
            let validateZipCodeInput = document.getElementById("inputValidationZipCode")

            if (zipCodeInput.length !== 5 || isNaN(zipCodeInput)) {
                validateZipCodeInput.style.display = "block";
                return false;
            } else {
                validateZipCodeInput.style.display = "none";
                return true;
            }
        }

        function validateCity(cityInput) {
            let validateCityInput = document.getElementById("inputValidationCity")
            if (cityInput.length < 2 || cityInput.length > 50) {
                validateCityInput.style.display = "block";
                return false;
            } else {
                validateCityInput.style.display = "none";
                return true;
            }
        }
