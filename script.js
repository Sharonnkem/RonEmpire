//Function for navbar

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
      nav.classList.add('active');
  })
}

if (close) {
    close.addEventListener('click', () => {
     nav.classList.remove('active');
  })
}




//--------------------------------------------------------------------------------------------------------




document.addEventListener('DOMContentLoaded', function() {
    // Function to add items to the cart
    function addToCart() {
        // Select elements containing product details
        const productImgSrc = document.getElementById('mainimg').src;
        const productName = document.querySelector('#prodetails .single-pro-details h4').textContent;
        const productPrice = document.querySelector('#prodetails .single-pro-details h2').textContent;
        const selectedSize = document.querySelector('#prodetails .single-pro-details select').value;
        const quantity = document.querySelector('#prodetails .single-pro-details input[type="number"]').value;

        // Retrieve existing cart items from local storage or initialize an empty array
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Add the new item to the cart
        cartItems.push({
            productImgSrc,
            productName,
            productPrice,
            selectedSize,
            quantity
        });

        // Store the updated cart items back to local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Display a pop-up message
        const alertMessage = document.createElement('div');
        alertMessage.classList.add('alert');
        alertMessage.textContent = 'Item has been added to the cart';
        document.body.appendChild(alertMessage);

        // Remove the alert message after a certain time (e.g., 3 seconds)
        setTimeout(function() {
            alertMessage.remove();
        }, 3000);
    
    }

    // Add event listener to Add To Cart button
    const addToCartButton = document.querySelector('#prodetails .single-pro-details #add');
    addToCartButton.addEventListener('click', addToCart);
});


document.addEventListener('DOMContentLoaded', function() {
    // Function to retrieve product details from local storage and add to cart
    function addToCartFromLocalStorage() {
        // Retrieve cart items from local storage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Select the table body of the cart
        const cartTableBody = document.querySelector('#cart-tbody');

        // Reset subtotal and total
        // Reset subtotal and total
    let subtotal = 0;
    let total = 0;

    // Iterate over each item in the cart
    cartItems.forEach(item => {
        // Calculate subtotal for the item
        let itemSubtotal = 0;
        if (item.productPrice) {
            itemSubtotal = parseFloat(item.productPrice.replace('$', '')) * parseInt(item.quantity);
        }

        // Add item subtotal to overall subtotal
        subtotal += itemSubtotal;

        // Create a new table row for each item
        const newRow = document.createElement('tr');

        // Populate the row with data
        newRow.innerHTML = `
            <td><a href="#"><i class="far fa-times-circle remove-item"></i></a></td>
            <td><img src="${item.productImgSrc}" alt="${item.productName}" width="100"></td>
            <td>${item.productName}</td>
            <td>${item.productPrice}</td>
            <td>${item.selectedSize}</td>
            <td><input type="number" value="${item.quantity}"></td>
            <td>$${itemSubtotal.toFixed(2)}</td>
        `;

        // Append the row to the table body
        cartTableBody.appendChild(newRow);

        // Add event listener to the remove icon in the newly added row
        const removeIcon = newRow.querySelector('.remove-item');
        removeIcon.addEventListener('click', removeFromCart);
     });

        // Display subtotal and calculate total
        const cartSubtotalCell = document.querySelector('#td1');
        cartSubtotalCell.textContent = `$${subtotal.toFixed(2)}`;
        const shippingCell = document.querySelector('#td2');
        shippingCell.textContent = '$5';
        total = subtotal + 5;
        const totalCell = document.querySelector('#td3');
        totalCell.textContent = `$${total.toFixed(2)}`;
    }

    // Call function to add items to cart from local storage
    addToCartFromLocalStorage();

    // Function to remove item from cart
    function removeFromCart(event) {
        const rowToRemove = event.target.closest('tr'); // Find the closest parent table row
        rowToRemove.remove(); // Remove the row from the table
        
        // Remove the item from local storage
        const productName = rowToRemove.querySelector('td:nth-child(3)').textContent; // Get the product name
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = cartItems.filter(item => item.productName !== productName);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        // Update subtotal and total after removing item
        addToCartFromLocalStorage();
    }

    // Function to clear cart and display pop-up message
    const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', function() {
        // Clear cart items from local storage
        localStorage.removeItem('cartItems');
        
        // Clear table body
        const cartTableBody = document.querySelector('#cart-tbody');
        cartTableBody.innerHTML = '';

        // Display a pop-up message
        const alertMessage = document.createElement('div');
        alertMessage.classList.add('alert');
        alertMessage.textContent = 'Your order has been';
        document.body.appendChild(alertMessage);

        // Remove the alert message after a certain time (e.g., 3 seconds)
        setTimeout(function() {
            alertMessage.remove();
        }, 3000);
    });
});



//-----------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    

    
    
    
    
   // Function to add item to wishlist
    function addToWishlist() {
        // Clone the product element from the first page
        const productElement = document.querySelector("#sp .pro").cloneNode(true);

        // Add remove button to the cloned product element
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener("click", removeFromWishlist);
        productElement.appendChild(removeBtn);

        // Store the updated cart items back to local storage
        localStorage.setItem('productElement', JSON.stringify(productElement.outerHTML));
        

        // Display a pop-up message
        const alertMessage = document.createElement('div');
        alertMessage.classList.add('alert');
        alertMessage.textContent = 'Item has been added to the wishlist';
        document.body.appendChild(alertMessage);

        // Remove the alert message after a certain time (e.g., 3 seconds)
        setTimeout(function() {
            alertMessage.remove();
        }, 3000);
    }

    // Add event listener to the "Add to wishlist" button
    const addToWishlistBtn = document.getElementById("add1");
    addToWishlistBtn.addEventListener("click", addToWishlist);

    // Function to remove item from wishlist
    function removeFromWishlist(event) {
        const productElement = event.target.parentElement;
        productElement.remove();

        // If wishlist becomes empty, display default message
        const wishlistSection = document.querySelector('#wishlist');
        if (wishlistSection.childElementCount === 0) {
            wishlistSection.innerHTML = `
                <h3> WISHLIST IS EMPTY</h3>
                <p>You don't have any product in the wishlist yet. You will find a lot of interesting products on our "Shop" page.</p>
                <a href="shop.html"><button class="normal">Return to shop</button></a>
            `;
        }
    }

    // Function to add items to wishlist from local storage
    function addTowishlistFromLocalStorage() {
        // Retrieve cart items from local storage
        const productHTML = localStorage.getItem('productElement');
        if (productHTML) {
            // Select the wishlist section
            const wishlistSection = document.querySelector('#wishlist');

            // Check if wishlist is empty
            if (wishlistSection.childElementCount === 2) {
                // 2 because there are already 2 elements in the wishlist section (h3, p,)
                wishlistSection.innerHTML = ""; // Clear the default message
            }

            // Create a new div element and set its innerHTML to the retrieved product HTML
            const productElement = document.createElement('div');
            productElement.innerHTML = productHTML;

            // Add remove button to the product element
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("remove-btn");
            removeBtn.addEventListener("click", removeFromWishlist);
            productElement.appendChild(removeBtn);

            // Append the product element to the wishlist section
            wishlistSection.appendChild(productElement);
        }
    }

    // Call the function to add items to wishlist from local storage
    addTowishlistFromLocalStorage();
});



/*document.addEventListener("DOMContentLoaded", function() {
    // Get the button and wishlist section
    const addToWishlistBtn = document.getElementById("add1");
    const wishlistSection = document.getElementById("wishlist");

    // Add event listener to the "Add to wishlist" button
    addToWishlistBtn.addEventListener("click", addToWishlist);

    // Load saved wishlist from local storage
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    savedWishlist.forEach(item => {
        const productElement = createProductElement(item);
        wishlistSection.appendChild(productElement);
    });

    function addToWishlist() {
        // Clone the product element from the first page
        const productElement = document.querySelector("#sp .pro").cloneNode(true);

        // Add remove button to the cloned product element
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener("click", removeFromWishlist);
        productElement.appendChild(removeBtn);

        // Check if wishlist is empty
        if (wishlistSection.childElementCount === 2) {
            // 2 because there are already 2 elements in the wishlist section (h3, p,)
            wishlistSection.innerHTML = ""; // Clear the default message
        }

        // Append the cloned product element to the wishlist section
        wishlistSection.appendChild(productElement);

        // Save wishlist to local storage
        const savedWishlist = Array.from(wishlistSection.children).map(product => ({
            name: product.querySelector('h5').textContent,
            price: product.querySelector('h4').textContent
        }));
        localStorage.setItem("wishlist", JSON.stringify(savedWishlist));

        // Show CSS-styled alert message
        showAlert();
    }

    // Function to remove item from wishlist
    function removeFromWishlist(event) {
        const productElement = event.target.parentElement;
        productElement.remove();

        // If wishlist becomes empty, display default message
        if (wishlistSection.childElementCount === 0) {
            wishlistSection.innerHTML = `
                <h3> WISHLIST IS EMPTY</h3>
                <p>You don't have any product in the wishlist yet. You will find a lot of interesting products on our "Shop" page.</p>
                <a href="shop.html"><button class="normal">Return to shop</button></a>
            `;
        }

        // Save wishlist to local storage
        const savedWishlist = Array.from(wishlistSection.children).map(product => ({
            name: product.querySelector('h5').textContent,
            price: product.querySelector('h4').textContent
        }));
        localStorage.setItem("wishlist", JSON.stringify(savedWishlist));
    }

    // Function to display CSS-styled alert message
    function showAlert() {
        const alertMessage = document.createElement("div");
        alertMessage.classList.add("alert");
        alertMessage.textContent = "Item has been added to wishlist";
        document.body.appendChild(alertMessage);

        // Remove the alert after 3 seconds
        setTimeout(() => {
            alertMessage.remove();
        }, 3000);
    }

    // Function to create product element
    function createProductElement(product) {
        const productElement = document.createElement("div");
        productElement.classList.add("pro");
        productElement.innerHTML = `
            <img src="img/products/VintageShirt.png" alt="">
            <div class="des">
                <span>Signature</span>
                <h5>${product.name}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4>${product.price}</h4>
            </div>
            <button class="remove-btn">Remove</button>
        `;
        return productElement;
    }
});




/*document.addEventListener("DOMContentLoaded", function() {
    // Get the button and wishlist section
    const addToWishlistBtn = document.getElementById("add1");
    const wishlistSection = document.getElementById("wishlist");

    // Add event listener to the "Add to wishlist" button
    addToWishlistBtn.addEventListener("click", addToWishlist);

    function addToWishlist() {
        // Clone the product element from the first page
        const productElement = document.querySelector("#sp .pro").cloneNode(true);

        // Add remove button to the cloned product element
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener("click", removeFromWishlist);
        productElement.appendChild(removeBtn);

        console.log (wishlistSection);

        // Check if wishlist is empty
        if (wishlistSection.childElementCount === 2) {
            // 2 because there are already 2 elements in the wishlist section (h3, p,)
            wishlistSection.innerHTML = ""; // Clear the default message
        }

        // Append the cloned product element to the wishlist section
        wishlistSection.appendChild(productElement);

        // Show CSS-styled alert message
        showAlert();
    }

    // Function to remove item from wishlist
    function removeFromWishlist(event) {
        const productElement = event.target.parentElement;
        productElement.remove();


        // If wishlist becomes empty, display default message
        if (wishlistSection.childElementCount === 0) {
            wishlistSection.innerHTML = `
                <h3> WISHLIST IS EMPTY</h3>
                <p>You don't have any product in the wishlist yet. You will find a lot of interesting products on our "Shop" page.</p>
                <a href="shop.html"><button class="normal">Return to shop</button></a>
            `;
        }
    }

    // Function to display CSS-styled alert message
    function showAlert() {
        const alertMessage = document.createElement("div");
        alertMessage.classList.add("alert");
        alertMessage.textContent = "Item has been added to wishlist";
        document.body.appendChild(alertMessage);

        // Remove the alert after 3 seconds
        setTimeout(() => {
            alertMessage.remove();
        }, 3000);
    }
});

  
//---------------------------------------------------------------------------------------------------------






//-----------------------------------------------------------------------------------------------------------
  

/* don't touch really
document.addEventListener('DOMContentLoaded', function() {
    // Function to add items to the cart
    function addToCart() {
        // Select elements containing product details
        const productImgSrc = document.getElementById('mainimg').src;
        const productName = document.querySelector('#prodetails .single-pro-details h4').textContent;
        const productPrice = document.querySelector('#prodetails .single-pro-details h2').textContent;
        const selectedSize = document.querySelector('#prodetails .single-pro-details select').value;
        const quantity = document.querySelector('#prodetails .single-pro-details input[type="number"]').value;

        // Retrieve existing cart items from local storage or initialize an empty array
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Add the new item to the cart
        cartItems.push({
            productImgSrc,
            productName,
            productPrice,
            selectedSize,
            quantity
        });

        // Store the updated cart items back to local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Display a pop-up message
        const alertMessage = document.createElement('div');
        alertMessage.classList.add('alert');
        alertMessage.textContent = 'Item has been added to the cart';
        document.body.appendChild(alertMessage);

        // Remove the alert message after a certain time (e.g., 3 seconds)
        setTimeout(function() {
            alertMessage.remove();
        }, 3000);
    
    }

    // Add event listener to Add To Cart button
    const addToCartButton = document.querySelector('#prodetails .single-pro-details #add');
    addToCartButton.addEventListener('click', addToCart);
});


document.addEventListener('DOMContentLoaded', function() {
    // Function to retrieve product details from local storage and add to cart
    function addToCartFromLocalStorage() {
        // Retrieve cart items from local storage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Select the table body of the cart
        const cartTableBody = document.querySelector('#cart-tbody');

        // Reset subtotal and total
        let subtotal = 0;
        let total = 0;

        // Iterate over each item in the cart
        cartItems.forEach(item => {
            // Create a new table row for each item
            const newRow = document.createElement('tr');

            // Calculate subtotal for the item
            let subtotal = 0;
         if (item.productPrice) {
            subtotal = parseFloat(item.productPrice.replace('$', '')) * parseInt(item.quantity);
         }

            

            // Populate the row with data
            newRow.innerHTML = `
                <td><a href="#"><i class="far fa-times-circle remove-item"></i></a></td>
                <td><img src="${item.productImgSrc}" alt="${item.productName}" width="100"></td>
                <td>${item.productName}</td>
                <td>${item.productPrice}</td>
                <td>${item.selectedSize}</td>
                <td><input type="number" value="${item.quantity}"></td>
                <td>$${subtotal.toFixed(2)}</td>
            `;

            // Append the row to the table body
            cartTableBody.appendChild(newRow);

            // Add event listener to the remove icon in the newly added row
            const removeIcon = newRow.querySelector('.remove-item');
            removeIcon.addEventListener('click', removeFromCart);
        });

        

        // Display subtotal and calculate total
        const cartSubtotalCell = document.querySelector('#subtotal table tr:nth-child(1) td:nth-child(2)');
        cartSubtotalCell.textContent = `$${subtotal.toFixed(2)}`;
        const shippingCell = document.querySelector('#subtotal table tr:nth-child(2) td:nth-child(2)');
        shippingCell.textContent = '$5';
        total = subtotal + 5;
        const totalCell = document.querySelector('#subtotal table tr:nth-child(3) td:nth-child(2) strong');
        totalCell.textContent = `$${total.toFixed(2)}`;
    }

    // Call function to add items to cart from local storage
    addToCartFromLocalStorage();

    // Function to remove item from cart
    function removeFromCart(event) {
        const rowToRemove = event.target.closest('tr'); // Find the closest parent table row
        rowToRemove.remove(); // Remove the row from the table
        
        // Remove the item from local storage
        const productName = rowToRemove.querySelector('td:nth-child(3)').textContent; // Get the product name
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = cartItems.filter(item => item.productName !== productName);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        // Update subtotal and total after removing item
        addToCartFromLocalStorage();
    }

    // Function to clear cart and display pop-up message
    const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', function() {
        // Clear cart items from local storage
        localStorage.removeItem('cartItems');
        
        // Clear table body
        const cartTableBody = document.querySelector('#cart-tbody');
        cartTableBody.innerHTML = '';

        // Display a pop-up message
        const alertMessage = document.createElement('div');
        alertMessage.classList.add('alert');
        alertMessage.textContent = 'Your order has been placed';
        document.body.appendChild(alertMessage);

        // Remove the alert message after a certain time (e.g., 3 seconds)
        setTimeout(function() {
            alertMessage.remove();
        }, 3000);
    });
});



/*
//Don't Touch!!!
document.addEventListener('DOMContentLoaded', function() {
    // Function to add items to the cart
    function addToCart() {
        // Select elements containing product details
        const productImgSrc = document.getElementById('mainimg').src;
        const productName = document.querySelector('#prodetails .single-pro-details h4').textContent;
        const productPrice = document.querySelector('#prodetails .single-pro-details h2').textContent;
        const selectedSize = document.querySelector('#prodetails .single-pro-details select').value;
        const quantity = document.querySelector('#prodetails .single-pro-details input[type="number"]').value;

        // Retrieve existing cart items from local storage or initialize an empty array
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Add the new item to the cart
        cartItems.push({
            productImgSrc,
            productName,
            productPrice,
            selectedSize,
            quantity
        });

        // Store the updated cart items back to local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Display a pop-up message
        const alertMessage = document.createElement('div');
        alertMessage.classList.add('alert');
        alertMessage.textContent = 'Item has been added to the cart';
        document.body.appendChild(alertMessage);

        // Remove the alert message after a certain time (e.g., 3 seconds)
        setTimeout(function() {
            alertMessage.remove();
        }, 3000);
    
    }

    // Add event listener to Add To Cart button
    const addToCartButton = document.querySelector('#prodetails .single-pro-details .normal');
    addToCartButton.addEventListener('click', addToCart);
});

 //Don't touch!!!
document.addEventListener('DOMContentLoaded', function() {
    // Function to retrieve product details from local storage and add to cart
    function addToCartFromLocalStorage() {
        // Retrieve cart items from local storage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Select the table body of the cart
        const cartTableBody = document.querySelector('#cart-tbody');

        // Iterate over each item in the cart
        cartItems.forEach(item => {
            // Create a new table row for each item
            const newRow = document.createElement('tr');

            // Calculate subtotal for the item
            let subtotal = 0;
         if (item.productPrice) {
            subtotal = parseFloat(item.productPrice.replace('$', '')) * parseInt(item.quantity);
         }

            // Populate the row with data
            newRow.innerHTML = `
                <td><a href="#"><i class="far fa-times-circle remove-item"></i></a></td>
                <td><img src="${item.productImgSrc}" alt="${item.productName}" width="100"></td>
                <td>${item.productName}</td>
                <td>${item.productPrice}</td>
                <td>${item.selectedSize}</td>
                <td><input type="number" value="${item.quantity}"></td>
                <td>$${subtotal.toFixed(2)}</td>
            `;

            // Append the row to the table body
            cartTableBody.appendChild(newRow);

            // Add event listener to the remove icon in the newly added row
            const removeIcon = newRow.querySelector('.remove-item');
            removeIcon.addEventListener('click', removeFromCart);
        });
    }

    // Call function to add items to cart from local storage
    addToCartFromLocalStorage();

    // Function to remove item from cart
    function removeFromCart(event) {
        const rowToRemove = event.target.closest('tr'); // Find the closest parent table row
        rowToRemove.remove(); // Remove the row from the table
        
        // Remove the item from local storage
        const productName = rowToRemove.querySelector('td:nth-child(3)').textContent; // Get the product name
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = cartItems.filter(item => item.productName !== productName);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
});




/*document.addEventListener('DOMContentLoaded', function() {
    // Function to add items to the cart
    function addToCart() {
        // Select elements containing product details
        const productImgSrc = document.getElementById('mainimg').src;
        const productName = document.querySelector('#prodetails .single-pro-details h4').textContent;
        const productPrice = document.querySelector('#prodetails .single-pro-details h2').textContent;
        const selectedSize = document.querySelector('#prodetails .single-pro-details select').value;
        const quantity = document.querySelector('#prodetails .single-pro-details input[type="number"]').value;

        // Retrieve existing cart items from local storage or initialize an empty array
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Add the new item to the cart
        cartItems.push({
            productImgSrc,
            productName,
            productPrice,
            selectedSize,
            quantity
        });

        // Store the updated cart items back to local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Display a pop-up message
        const alertMessage = document.createElement('div');
        alertMessage.classList.add('alert');
        alertMessage.textContent = 'Item has been added to the cart';
        document.body.appendChild(alertMessage);

        // Remove the alert message after a certain time (e.g., 3 seconds)
        setTimeout(function() {
            alertMessage.remove();
        }, 3000);
    
    }

    // Add event listener to Add To Cart button
    const addToCartButton = document.querySelector('#prodetails .single-pro-details #add');
    addToCartButton.addEventListener('click', addToCart);
});


document.addEventListener('DOMContentLoaded', function() {
    // Function to retrieve product details from local storage and add to cart
    function addToCartFromLocalStorage() {
        // Retrieve cart items from local storage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Select the table body of the cart
        const cartTableBody = document.querySelector('#cart-tbody');

        // Reset subtotal and total
        let subtotal = 0;
        let total = 0;

        // Iterate over each item in the cart
        cartItems.forEach(item => {
            // Create a new table row for each item
            const newRow = document.createElement('tr');

            // Calculate subtotal for the item
            const itemSubtotal = parseFloat(item.productPrice.replace('$', '')) * parseInt(item.quantity);
            subtotal += itemSubtotal;

            // Populate the row with data
            newRow.innerHTML = `
                <td><a href="#"><i class="far fa-times-circle remove-item"></i></a></td>
                <td><img src="${item.productImgSrc}" alt="${item.productName}" width="100"></td>
                <td>${item.productName}</td>
                <td>${item.productPrice}</td>
                <td>${item.selectedSize}</td>
                <td><input type="number" value="${item.quantity}"></td>
                <td>$${itemSubtotal.toFixed(2)}</td>
            `;

            // Append the row to the table body
            cartTableBody.appendChild(newRow);

            // Add event listener to the remove icon in the newly added row
            const removeIcon = newRow.querySelector('.remove-item');
            removeIcon.addEventListener('click', removeFromCart);
        });

        // Display subtotal and calculate total
        const cartSubtotalCell = document.querySelector('#subtotal table tr:nth-child(1) td:nth-child(2)');
        cartSubtotalCell.textContent = `$${subtotal.toFixed(2)}`;
        const shippingCell = document.querySelector('#subtotal table tr:nth-child(2) td:nth-child(2)');
        shippingCell.textContent = '$5';
        total = subtotal + 5;
        const totalCell = document.querySelector('#subtotal table tr:nth-child(3) td:nth-child(2) strong');
        totalCell.textContent = `$${total.toFixed(2)}`;
    }

    // Call function to add items to cart from local storage
    addToCartFromLocalStorage();

    // Function to remove item from cart
    function removeFromCart(event) {
        const rowToRemove = event.target.closest('tr'); // Find the closest parent table row
        rowToRemove.remove(); // Remove the row from the table
        
        // Remove the item from local storage
        const productName = rowToRemove.querySelector('td:nth-child(3)').textContent; // Get the product name
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = cartItems.filter(item => item.productName !== productName);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        // Update subtotal and total after removing item
        addToCartFromLocalStorage();
    }

    // Function to clear cart and display pop-up message
    const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', function() {
        // Clear cart items from local storage
        localStorage.removeItem('cartItems');
        
        // Clear table body
        const cartTableBody = document.querySelector('#cart-tbody');
        cartTableBody.innerHTML = '';

        // Display pop-up message
        alert('Your order has been placed.');
    });
});
*/












//--------------------------------------------------------------------------------------------------------------------------------------



































/*document.addEventListener('DOMContentLoaded', function() {
    // Function to add items to the cart
    function addToCart() {
        // Select elements containing product details
        const productImgSrc = document.getElementById('mainimg').src;
        const productName = document.querySelector('#prodetails .single-pro-details h4').textContent;
        const productPrice = document.querySelector('#prodetails .single-pro-details h2').textContent;
        const selectedSize = document.querySelector('#prodetails .single-pro-details select').value;
        const quantity = document.querySelector('#prodetails .single-pro-details input[type="number"]').value;

        // Retrieve existing cart items from local storage or initialize an empty array
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Add the new item to the cart
        cartItems.push({
            productImgSrc,
            productName,
            productPrice,
            selectedSize,
            quantity
        });

        // Store the updated cart items back to local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Display a pop-up message
        const alertMessage = document.createElement('div');
        alertMessage.classList.add('alert');
        alertMessage.textContent = 'Item has been added to the cart';
        document.body.appendChild(alertMessage);

        // Remove the alert message after a certain time (e.g., 3 seconds)
        setTimeout(function() {
            alertMessage.remove();
        }, 3000);
    
    }

    // Add event listener to Add To Cart button
    const addToCartButton = document.querySelector('#prodetails .single-pro-details #add');
    addToCartButton.addEventListener('click', addToCart);
});


document.addEventListener('DOMContentLoaded', function() {
    // Function to retrieve product details from local storage and add to cart
    function addToCartFromLocalStorage() {
        // Retrieve cart items from local storage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Select the table body of the cart
        const cartTableBody = document.querySelector('#cart-tbody');

        // Iterate over each item in the cart
        cartItems.forEach(item => {
            // Create a new table row for each item
            const newRow = document.createElement('tr');

            // Calculate subtotal for the item
            const subtotal = parseFloat(item.productPrice.replace('$', '')) * parseInt(item.quantity);

            // Populate the row with data
            newRow.innerHTML = `
                <td><a href="#"><i class="far fa-times-circle remove-item"></i></a></td>
                <td><img src="${item.productImgSrc}" alt="${item.productName}" width="100"></td>
                <td>${item.productName}</td>
                <td>${item.productPrice}</td>
                <td>${item.selectedSize}</td>
                <td><input type="number" value="${item.quantity}"></td>
                <td>$${subtotal.toFixed(2)}</td>
            `;

            // Append the row to the table body
            cartTableBody.appendChild(newRow);

            // Add event listener to the remove icon in the newly added row
            const removeIcon = newRow.querySelector('.remove-item');
            removeIcon.addEventListener('click', removeFromCart);
        });
    }

    // Call function to add items to cart from local storage
    addToCartFromLocalStorage();

    // Function to remove item from cart
    function removeFromCart(event) {
        const rowToRemove = event.target.closest('tr'); // Find the closest parent table row
        rowToRemove.remove(); // Remove the row from the table
        
        // Remove the item from local storage
        const productName = rowToRemove.querySelector('td:nth-child(3)').textContent; // Get the product name
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = cartItems.filter(item => item.productName !== productName);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
});
*/



//------------------------------------------------------------------------------------


// Function to fetch data from the API
/*async function fetchData() {
  try {
      const response = await fetch('https://api.example.com/products');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

// Function to update HTML content with fetched data
async function updateContent() {
  const products = await fetchData();

  // Select all elements to update
  const images = document.querySelectorAll('.pro img');
  const spans = document.querySelectorAll('.pro .des span');
  const h5s = document.querySelectorAll('.pro .des h5');
  const h4s = document.querySelectorAll('.pro .des h4');

  // Iterate over each product and update corresponding HTML elements
  products.forEach((product, index) => {
      if (index < images.length) {
          images[index].src = product.imageUrl;
      }
      if (index < spans.length) {
          spans[index].textContent = product.brand;
      }
      if (index < h5s.length) {
          h5s[index].textContent = product.name;
      }
      if (index < h4s.length) {
          h4s[index].textContent = `$${product.price}`;
      }
  });
}

// Call the updateContent function to update the HTML content
updateContent(); */
