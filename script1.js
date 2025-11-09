let order = JSON.parse(localStorage.getItem('order')) || [];

function addToOrder(name, price) {
    order.push({ name, price });
    localStorage.setItem('order', JSON.stringify(order));
    window.location.href = 'checkout.html';  // Redirect to checkout
}

function updateOrderDisplay() {
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    orderItems.innerHTML = '';
    let total = 0;
    order.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price} <button onclick="removeFromOrder(${index})">Remove</button>`;
        orderItems.appendChild(li);
        total += item.price;
    });
    orderTotal.textContent = `Total: $${total.toFixed(2)}`;
    localStorage.setItem('order', JSON.stringify(order));
}

function removeFromOrder(index) {
    order.splice(index, 1);
    updateOrderDisplay();
}

function submitPayment() {
    alert('Payment successful! Your order is confirmed. Thank you for dining with us.');
    localStorage.removeItem('order');
    order = [];
    window.location.href = 'index.html';  // Redirect to home
}

// Initialize on checkout page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('order-items')) {
        updateOrderDisplay();
    }
    // Form handling
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitPayment();
        });
    }
});