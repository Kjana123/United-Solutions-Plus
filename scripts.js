async function createOrder() {
    const response = await fetch("https://unitedsolutionsplus.in/.netlify/functions/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 50000, currency: "INR" }),
    });
  
    const order = await response.json();
  
    if (order.error) {
      alert("Error: " + order.error);
    } else {
      startRazorpayPayment(order);
    }
  }
  
  function startRazorpayPayment(order) {
    var options = {
      key: "rzp_live_buDyJvlYXAHg07", // Your Razorpay Key ID
      amount: order.amount,
      currency: order.currency,
      name: "United Solutions Plus",
      order_id: order.id,
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };
  
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }
  
  document.getElementById("payButton").addEventListener("click", createOrder);
  