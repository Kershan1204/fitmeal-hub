$(document).ready(function () {

  // -------------------------------
  // MEAL PRICE FUNCTION
  // -------------------------------
  function getMealPrice(meal) {
    let price = 0;

    if (meal === "Grilled Chicken Set") {
      price = 18.00;
    } else if (meal === "Salad Delight") {
      price = 12.00;
    } else if (meal === "Protein Pack") {
      price = 15.00;
    } else if (meal === "Veggie Wrap") {
      price = 10.00;
    } else if (meal === "Omega Fish Set") {
      price = 22.00;
    } else if (meal === "Detox Bowl") {
      price = 13.00;
    }

    return price;
  }

  // -------------------------------
  // DISCOUNT
  // -------------------------------
  function getDiscount(subtotal) {
    let discount = 0;

    if (subtotal >= 100) {
      discount = subtotal * 0.15;
    } else if (subtotal >= 50) {
      discount = subtotal * 0.10;
    }

    return discount;
  }

  // -------------------------------
  // VALIDATION
  // -------------------------------
  function validateForm(name, phone, quantity) {
    let isValid = true;

    $("#nameError, #phoneError, #qtyError").text("").hide();

    if (name.trim() === "") {
      $("#nameError").text("⚠ Name required").show();
      isValid = false;
    }

    if (phone.trim() === "") {
      $("#phoneError").text("⚠ Phone required").show();
      isValid = false;
    }

    if (quantity <= 0 || isNaN(quantity)) {
      $("#qtyError").text("⚠ Invalid quantity").show();
      isValid = false;
    }

    return isValid;
  }

  // -------------------------------
  // SUBMIT BUTTON
  // -------------------------------
  $("#btnSubmit").click(function () {

    const name = $("#customerName").val();
    const phone = $("#phone").val();
    const meal = $("#mealSelect").val();
    const quantity = Number($("#quantity").val());

    if (!validateForm(name, phone, quantity)) {
      $("#outputSection").hide();
      return;
    }

    const price = getMealPrice(meal);
    const subtotal = price * quantity;
    const discount = getDiscount(subtotal);
    const total = subtotal - discount;
    const packaging = 2.00;
    const final = total + packaging;

    const output = `
      <div class="card p-3 shadow">
        <h4>Order Summary</h4>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Meal:</b> ${meal}</p>
        <p><b>Price:</b> RM ${price.toFixed(2)}</p>
        <p><b>Quantity:</b> ${quantity}</p>
        <hr>
        <p><b>Subtotal:</b> RM ${subtotal.toFixed(2)}</p>
        <p><b>Discount:</b> RM ${discount.toFixed(2)}</p>
        <p><b>Total:</b> RM ${total.toFixed(2)}</p>
        <p><b>Packaging:</b> RM ${packaging.toFixed(2)}</p>
        <h5><b>Final: RM ${final.toFixed(2)}</b></h5>
      </div>
    `;

    $("#outputSection").html(output).fadeIn();

  });

  // -------------------------------
  // RESET BUTTON
  // -------------------------------
  $("#btnReset").click(function () {
    $("#customerName, #phone, #quantity").val("");
    $("#mealSelect").val("");

    $("#outputSection").slideUp().html("");
    $("#pricePreview").hide();
    $("#nameError, #phoneError, #qtyError").text("").hide();
  });

  // -------------------------------
  // PRICE PREVIEW
  // -------------------------------
  $("#mealSelect").change(function () {
    const price = getMealPrice($(this).val());

    if (price > 0) {
      $("#pricePreview")
        .text("Price: RM " + price.toFixed(2))
        .slideDown();
    } else {
      $("#pricePreview").slideUp();
    }
  });

  // -------------------------------
  // SHOW DETAILS BUTTON
  // -------------------------------
  $("#toggleHowItWorks").click(function () {
    $("#howItWorksContent").slideToggle();

    let text = $(this).text();
    $(this).text(text.includes("Show") ? "Hide Details ▲" : "Show Details ▼");
  });

});

// -------------------------------
// CONTACT FORM (contact.html)
// -------------------------------
$("#contactForm").on("submit", function(e) {
  e.preventDefault();
  alert("✅ Message sent! We will contact you soon.");
  this.reset();
});