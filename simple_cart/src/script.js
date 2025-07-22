document.addEventListener('DOMContentLoaded', () => {
  console.log("JS is linked");
  

  const products = [
    { id: 1, name: 'Product1', Price: 19.99 },
    { id: 2, name: 'Product2', Price: 12.99 },
    { id: 3, name: 'Product3', Price: 39.99 },
    { id: 4, name: 'Product4', Price: 13.99 },
    { id: 5, name: 'Product5', Price: 20.99 },
    { id: 6, name: 'Product6', Price: 21.99 },
    { id: 7, name: 'Product7', Price: 22.99 },
    { id: 8, name: 'Product8', Price: 23.99 },
  ];

  const cart = [];
  

  // grab the elements
  const cartItem = document.getElementById('cart');
  const totalPrice = document.getElementById('total-price');
  const checkOutBtn = document.getElementById('check-outBtn');
  const emptyCartMessage = document.getElementById("empty-card");
  const productsDiv = document.getElementById('products'); 
  renderCart()

  // now show the items 
  products.forEach(item => {
    console.log(item);
    //create the itmes div
    const itemDiv = document.createElement('div');
    itemDiv.className = "flex justify-between items-center bg-gray-600 px-4 py-2 rounded mt-2 ";
    itemDiv.id = item.id;
    itemDiv.innerHTML = `
      <h3>${item.name}</h3>
      <p>Rs:</p>
      <h4>${item.Price}</h4>
      <button class="add-item-btn bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">Add</button>`;

    productsDiv.appendChild(itemDiv); 
  });

  // now when click add btn  update the cart array
  // event delegation to listen for clicks on any .add-item-btn and then add to the array
  productsDiv.addEventListener('click', (e) => {
    console.log('Add item btn clicked');

    if (e.target.classList.contains('add-item-btn')) {
      // Get item
      const item_grab = e.target.parentElement;
      const item_grab_id = Date.now(); // use timestamp as unique id
      const name = item_grab.querySelector('h3').innerText;
      const price = item_grab.querySelector('h4').innerText;

      // make the obj and push to array
      let new_cart_item = {
        id: Number(item_grab_id),
        name: name,
        price: Number(price)
      };
     
        cart.push(new_cart_item);
        

      // now display the cart section
      renderCart(); 
    }
  });

  // now display the cart section
  
  function renderCart() {
    // clear previous cart items (except static text)
    const oldCartItems = cartItem.querySelectorAll('.cart-item');
    oldCartItems.forEach(el => el.remove());

    // inject when cart is empty
    if (cart.length === 0) {
      emptyCartMessage.innerText = "No items in cart.";
    } else {
      emptyCartMessage.innerText = "";
    }

    // else inject this
    cart.forEach(cart_item => {
      // grab the section
      const cartDiv = document.createElement('div');
      cartDiv.className = "cart-item flex justify-between items-center bg-gray-500 px-3 py-2 rounded";
      cartDiv.id = `cart-${cart_item.id}`;
      cartDiv.innerHTML = `
        <h3>${cart_item.name}</h3>
        <p>Rs:</p>
        <h4>${cart_item.price}</h4>
        <button class="remove-btn bg-red-600 hover:bg-red-700 px-2 py-1 rounded" data-id="${cart_item.id}">Remove</button>


      `;

      cartItem.appendChild(cartDiv);
    });

    // update the price
    updateCart_price();
  }

  function updateCart_price() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPrice.innerText = `Rs ${total.toFixed(2)}`;
  }

  cartItem.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const idToRemove = Number(e.target.dataset.id);
    const index = cart.findIndex(item => item.id === idToRemove);
    if (index !== -1) {
      cart.splice(index, 1); // remove 1 item at that index
      renderCart(); // re-render cart
    }
  }
});


}); 
