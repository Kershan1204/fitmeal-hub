// -----------------------------------------------
// MEAL PRICES (used by if...else price logic)
// -----------------------------------------------
function getMealPrice(meal) {
  let price = 0;

  if (meal === "Grilled Chicken Set") {
    price = 12.90;
  } else if (meal === "Salmon Salad Bowl") {
    price = 15.50;
  } else if (meal === "Veggie Wrap") {
    price = 10.00;
  } else if (meal === "Tuna Brown Rice") {
    price = 13.50;
  } else if (meal === "Egg White Omelette") {
    price = 9.90;
  } else {
    price = 0;
  }

  return price;
}

// -----------------------------------------------
// DISCOUNT LOGIC
// -----------------------------------------------
function getDiscount(subtotal) {
  let discount = 0;

  if (subtotal >= 100) {
    discount = subtotal * 0.15; // 15% off for orders RM100+
  } else if (subtotal >= 50) {
    discount = subtotal * 0.10; // 10% off for orders RM50+
  } else {
    discount = 0;
  }

  return discount;
}

// -----------------------------------------------
// FORM VALIDATION
// -----------------------------------------------
function validateForm(name, phone, quantity) {
  let isValid = true;

  // Reset error messages
  $("#nameError").text("").hide();
  $("#phoneError").text("").hide();
  $("#qtyError").text("").hide();

  if (name.trim() === "") {
    $("#nameError").text("⚠ Customer name cannot be empty.").show();
    isValid = false;
  }

  if (phone.trim() === "") {
    $("#phoneError").text("⚠ Phone number cannot be empty.").show();
    isValid = false;
  }

  if (quantity <= 0 || isNaN(quantity)) {
    $("#qtyError").text("⚠ Quantity must be more than 0.").show();
    isValid = false;
  }

  return isValid;
}

// -----------------------------------------------
// MAIN ORDER CALCULATION (runs on Submit click)
// -----------------------------------------------
$(document).ready(function ()

  // ── Submit Button ──────────────────────────────
  document.getElementById("btnSubmit").addEventListener("click", function () {

    // 1. Retrieve input values using DOM
    const customerName = document.getElementById("customerName").value;
    const phone        = document.getElementById("phone").value;
    const meal         = document.getElementById("mealSelect").value;
    const quantity     = Number(document.getElementById("quantity").value); // Number() conversion

    // 2. Validate
    if (!validateForm(customerName, phone, quantity)) {
      // Hide output section if currently visible
      $("#outputSection").hide();
      return;
    }

    // 3. Get price using if...else
    const price = getMealPrice(meal);

    // 4. Calculations
    const packagingCharge = 2.00;                      // Fixed packaging charge per order
    const subtotal        = price * quantity;           // Subtotal
    const discount        = getDiscount(subtotal);      // Discount
    const totalPayment    = subtotal - discount;        // Total after discount
    const finalPayment    = totalPayment + packagingCharge; // Final with packaging

    // 5. Build output HTML and display in UI (NOT console)
    const outputHTML = `
      <div class="summary-card">
        <h4 class="summary-title">🥗 Order Summary</h4>
        <table class="table table-borderless summary-table">
          <tbody>
            <tr><td><strong>Customer Name</strong></td><td>${customerName}</td></tr>
            <tr><td><strong>Phone Number</strong></td><td>${phone}</td></tr>
            <tr><td><strong>Meal Package</strong></td><td>${meal}</td></tr>
            <tr><td><strong>Unit Price</strong></td><td>RM ${price.toFixed(2)}</td></tr>
            <tr><td><strong>Quantity</strong></td><td>${quantity}</td></tr>
            <tr class="separator-row"><td colspan="2"><hr></td></tr>
            <tr><td><strong>Subtotal</strong></td><td>RM ${subtotal.toFixed(2)}</td></tr>
            <tr class="text-success"><td><strong>Discount</strong></td><td>- RM ${discount.toFixed(2)}</td></tr>
            <tr><td><strong>Total Payment</strong></td><td>RM ${totalPayment.toFixed(2)}</td></tr>
            <tr><td><strong>Packaging Charge</strong></td><td>+ RM ${packagingCharge.toFixed(2)}</td></tr>
            <tr class="final-row"><td><strong>💰 Final Payment</strong></td><td><strong>RM ${finalPayment.toFixed(2)}</strong></td></tr>
          </tbody>
        </table>
        <p class="thank-you">✅ Thank you, <strong>${customerName}</strong>! Your order has been placed.</p>
      </div>
    `;

    // jQuery: show output with fade-in effect
    $("#outputSection").html(outputHTML).hide().fadeIn(600);

    // jQuery: scroll to output section smoothly
    $("html, body").animate({
      scrollTop: $("#outputSection").offset().top - 80
    }, 600);
  });

  // ── Reset Button ───────────────────────────────
  document.getElementById("btnReset").addEventListener("click", function () {
    // Clear error messages
    $("#nameError, #phoneError, #qtyError").text("").hide();

    // jQuery: hide output with slide-up effect
    $("#outputSection").slideUp(400, function () {
      $(this).html("");
    });
  });

  // ── Live price preview on meal selection ───────
  document.getElementById("mealSelect").addEventListener("change", function () {
    const selected = this.value;
    const price    = getMealPrice(selected);

    if (price > 0) {
      // jQuery: show price badge with slide-down effect
      $("#pricePreview")
        .text("Unit Price: RM " + price.toFixed(2))
        .hide()
        .slideDown(300);
    } else {
      $("#pricePreview").slideUp(200);
    }
  });

  // ── jQuery: Toggle "How It Works" section ──────
  $("#toggleHowItWorks").on("click", function () {
    $("#howItWorksContent").slideToggle(400);
    const btnText = $(this).text();
    $(this).text(btnText.includes("Show") ? "Hide Details ▲" : "Show Details ▼");
  });

});

// -----------------------------------------------
// jQuery: Navbar active link highlight
// -----------------------------------------------
$(document).ready(function () {

  // ALL your code here (submit, reset, toggle, navbar)

  $("#toggleHowItWorks").click(function () {
    $("#howItWorksContent").slideToggle(400);

    let btnText = $(this).text();
    $(this).text(btnText.includes("Show") ? "Hide Details ▲" : "Show Details ▼");
  });

});