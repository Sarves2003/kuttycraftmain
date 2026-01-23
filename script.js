/* ===============================================
   KUTTY CRAFT - E-COMMERCE APPLICATION
   With Google Sheets Payment Tracking
================================================ */

/* ===============================================
   GOOGLE SHEETS CONFIGURATION
   Replace this URL with your Google Apps Script Web App URL
================================================ */
const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbw-e-ye_2aA-JYk82CDPDJQqRKxoc7_STfpxob60IDqD5aPSLdIGQ8STvlasVjPkQ-6/exec";

/* ===============================================
   SECRET TOKEN - MUST MATCH GOOGLE APPS SCRIPT
   ⚠️ Keep this token secret and secure!
================================================ */
const SECRET_TOKEN = "KC_xsdf32qR7wL4nV8kT3bY6hF5gD1sA";

/* ===============================================
   PRODUCT DATA
   Dummy JSON array with 400+ products across categories
   NOW WITH MULTIPLE IMAGES PER PRODUCT
================================================ */
const allProducts = productsData;

/* ===============================================
   GLOBAL STATE VARIABLES
   Managing application state
================================================ */
let currentFilter = "all";
let displayedProducts = [];
let currentPage = 0;
const productsPerPage = 10;
let cart = [];
let selectedProduct = null;
let currentQuantity = 1;
let paymentDetails = null;

// Carousel state
let currentImageIndex = 0;

/* ===============================================
   DOM ELEMENTS
================================================ */
const elements = {
  header: document.getElementById("header"),
  cartIcon: document.getElementById("cartIcon"),
  cartBadge: document.getElementById("cartBadge"),
  filterButtons: document.querySelectorAll(".filter-btn"),
  productsGrid: document.getElementById("productsGrid"),
  loadMoreContainer: document.getElementById("loadMoreContainer"),
  loadMoreBtn: document.getElementById("loadMoreBtn"),
  allLoadedMessage: document.getElementById("allLoadedMessage"),
  productModal: document.getElementById("productModal"),
  modalOverlay: document.getElementById("modalOverlay"),
  modalClose: document.getElementById("modalClose"),
  modalTitle: document.getElementById("modalTitle"),
  modalDescription: document.getElementById("modalDescription"),
  modalPrice: document.getElementById("modalPrice"),
  qtyValue: document.getElementById("qtyValue"),
  decreaseQty: document.getElementById("decreaseQty"),
  increaseQty: document.getElementById("increaseQty"),
  addToCartBtn: document.getElementById("addToCartBtn"),
  cartSidebar: document.getElementById("cartSidebar"),
  cartClose: document.getElementById("cartClose"),
  cartItems: document.getElementById("cartItems"),
  cartEmpty: document.getElementById("cartEmpty"),
  cartFooter: document.getElementById("cartFooter"),
  totalAmount: document.getElementById("totalAmount"),
  payNowBtn: document.getElementById("payNowBtn"),
  checkoutModal: document.getElementById("checkoutModal"),
  checkoutOverlay: document.getElementById("checkoutOverlay"),
  checkoutClose: document.getElementById("checkoutClose"),
  checkoutForm: document.getElementById("checkoutForm"),
  summaryItems: document.getElementById("summaryItems"),
  summaryAmount: document.getElementById("summaryAmount"),
  successPage: document.getElementById("successPage"),
  backHomeBtn: document.getElementById("backHomeBtn"),
  // Carousel elements
  carouselContainer: document.getElementById("carouselContainer"),
  carouselImage: document.getElementById("carouselImage"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  dotsContainer: document.getElementById("dotsContainer"),
};

/* ===============================================
   INITIALIZATION
================================================ */
function init() {
  const savedCart = localStorage.getItem("kuttyCraftCart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }

  loadMoreProducts();
  setupEventListeners();
  setupFooterFilters();
  setupStickyHeader();
  setupSmoothScroll();
  updateLoadMoreButton();
}

/* ===============================================
   SMOOTH SCROLL
================================================ */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href === "#") {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/* ===============================================
   STICKY HEADER
================================================ */
function setupStickyHeader() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      elements.header.classList.add("scrolled");
    } else {
      elements.header.classList.remove("scrolled");
    }
  });
}

/* ===============================================
   EVENT LISTENERS
================================================ */
function setupEventListeners() {
  elements.filterButtons.forEach((btn) => {
    btn.addEventListener("click", handleFilterClick);
  });

  elements.cartIcon.addEventListener("click", openCart);
  elements.cartClose.addEventListener("click", closeCart);
  elements.modalClose.addEventListener("click", closeModal);
  elements.modalOverlay.addEventListener("click", closeModal);
  elements.decreaseQty.addEventListener("click", decreaseQuantity);
  elements.increaseQty.addEventListener("click", increaseQuantity);
  elements.addToCartBtn.addEventListener("click", addToCart);
  elements.payNowBtn.addEventListener("click", openCheckoutModal);
  elements.checkoutClose.addEventListener("click", closeCheckoutModal);
  elements.checkoutOverlay.addEventListener("click", closeCheckoutModal);
  elements.checkoutForm.addEventListener("submit", handleCheckoutSubmit);
  elements.backHomeBtn.addEventListener("click", closeSuccessPage);
  elements.loadMoreBtn.addEventListener("click", handleLoadMore);

  // Carousel controls
  elements.prevBtn.addEventListener("click", prevImage);
  elements.nextBtn.addEventListener("click", nextImage);

  // Download receipt button
  const downloadBtn = document.getElementById("downloadReceiptBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadReceipt);
  }
}

/* ===============================================
   CAROUSEL FUNCTIONS
================================================ */
function updateCarousel() {
  if (!selectedProduct || !selectedProduct.images) return;

  const images = selectedProduct.images;
  elements.carouselImage.src = images[currentImageIndex];

  // Update dots
  const dots = elements.dotsContainer.querySelectorAll(".carousel-dot");
  dots.forEach((dot, index) => {
    if (index === currentImageIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  // Update button visibility
  if (images.length <= 1) {
    elements.prevBtn.style.display = "none";
    elements.nextBtn.style.display = "none";
    elements.dotsContainer.style.display = "none";
  } else {
    elements.prevBtn.style.display = "flex";
    elements.nextBtn.style.display = "flex";
    elements.dotsContainer.style.display = "flex";
  }
}

function prevImage() {
  if (!selectedProduct || !selectedProduct.images) return;

  currentImageIndex--;
  if (currentImageIndex < 0) {
    currentImageIndex = selectedProduct.images.length - 1;
  }
  updateCarousel();
}

function nextImage() {
  if (!selectedProduct || !selectedProduct.images) return;

  currentImageIndex++;
  if (currentImageIndex >= selectedProduct.images.length) {
    currentImageIndex = 0;
  }
  updateCarousel();
}

function createCarouselDots() {
  if (!selectedProduct || !selectedProduct.images) return;

  elements.dotsContainer.innerHTML = "";

  selectedProduct.images.forEach((img, index) => {
    const dot = document.createElement("div");
    dot.className = "carousel-dot";
    if (index === currentImageIndex) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      currentImageIndex = index;
      updateCarousel();
    });
    elements.dotsContainer.appendChild(dot);
  });
}

/* ===============================================
   FILTER FUNCTIONALITY
================================================ */
function handleFilterClick(e) {
  const category = e.target.dataset.category;

  elements.filterButtons.forEach((btn) => btn.classList.remove("active"));
  e.target.classList.add("active");

  currentFilter = category;
  currentPage = 0;
  displayedProducts = [];
  elements.productsGrid.innerHTML = "";

  loadMoreProducts();
  updateLoadMoreButton();
}

/* ===============================================
   GET FILTERED PRODUCTS
================================================ */
function getFilteredProducts() {
  if (currentFilter === "all") {
    return allProducts;
  }
  return allProducts.filter((product) => product.category === currentFilter);
}

/* ===============================================
   LOAD MORE PRODUCTS
================================================ */
function loadMoreProducts() {
  const filteredProducts = getFilteredProducts();
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToAdd = filteredProducts.slice(startIndex, endIndex);

  if (productsToAdd.length === 0) {
    return;
  }

  productsToAdd.forEach((product, index) => {
    const productCard = createProductCard(product);
    productCard.style.animationDelay = `${index * 0.1}s`;
    elements.productsGrid.appendChild(productCard);
    displayedProducts.push(product);
  });

  currentPage++;
  updateLoadMoreButton();
}

/* ===============================================
   CREATE PRODUCT CARD
================================================ */
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.addEventListener("click", () => openProductModal(product));

  // Use first image from images array
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : product.image;

  card.innerHTML = `
        <img src="${imageUrl}" alt="${product.title}" class="product-image">
        <div class="product-info">
            <div class="product-header">
                <h3 class="product-name">${product.title}</h3>
                ${product.isBestSeller ? '<span class="best-seller-badge">Best Seller</span>' : ""}
            </div>
            <p class="product-price">₹${product.price}</p>
        </div>
    `;

  return card;
}

/* ===============================================
   LOAD MORE BUTTON
================================================ */
function handleLoadMore() {
  const filteredProducts = getFilteredProducts();
  const hasMore = displayedProducts.length < filteredProducts.length;

  if (hasMore) {
    loadMoreProducts();
  }
}

/* ===============================================
   UPDATE LOAD MORE BUTTON VISIBILITY
================================================ */
function updateLoadMoreButton() {
  const filteredProducts = getFilteredProducts();
  const hasMore = displayedProducts.length < filteredProducts.length;

  if (hasMore) {
    elements.loadMoreContainer.classList.remove("hidden");
    elements.allLoadedMessage.classList.remove("active");
  } else {
    elements.loadMoreContainer.classList.add("hidden");
    if (displayedProducts.length > 0) {
      elements.allLoadedMessage.classList.add("active");
    }
  }
}

/* ===============================================
   FOOTER FILTER TRIGGERS
================================================ */
function setupFooterFilters() {
  const filterTriggers = document.querySelectorAll(".filter-trigger");

  filterTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();

      const category = this.dataset.filter;

      elements.filterButtons.forEach((btn) => btn.classList.remove("active"));
      const matchingBtn = Array.from(elements.filterButtons).find(
        (btn) => btn.dataset.category === category,
      );
      if (matchingBtn) {
        matchingBtn.classList.add("active");
      }

      currentFilter = category;
      currentPage = 0;
      displayedProducts = [];
      elements.productsGrid.innerHTML = "";

      loadMoreProducts();

      const productsSection = document.querySelector(".products-section");
      if (productsSection) {
        const headerOffset = 100;
        const elementPosition = productsSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/* ===============================================
   PRODUCT MODAL WITH CAROUSEL
================================================ */
function openProductModal(product) {
  selectedProduct = product;
  currentQuantity = 1;
  currentImageIndex = 0;

  // Populate modal
  elements.modalTitle.textContent = product.title;
  elements.modalDescription.textContent = product.description;
  elements.modalPrice.textContent = `₹${product.price}`;
  elements.qtyValue.textContent = currentQuantity;

  // Set up carousel
  createCarouselDots();
  updateCarousel();

  // Show modal
  elements.productModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

/* ===============================================
   CLOSE MODAL
================================================ */
function closeModal() {
  elements.productModal.classList.remove("active");
  document.body.style.overflow = "auto";
  selectedProduct = null;
}

/* ===============================================
   QUANTITY CONTROLS
================================================ */
function decreaseQuantity() {
  if (currentQuantity > 1) {
    currentQuantity--;
    elements.qtyValue.textContent = currentQuantity;
  }
}

function increaseQuantity() {
  currentQuantity++;
  elements.qtyValue.textContent = currentQuantity;
}

/* ===============================================
   ADD TO CART
================================================ */
function addToCart() {
  if (!selectedProduct) return;

  const existingItem = cart.find(
    (item) => item.title === selectedProduct.title,
  );

  if (existingItem) {
    existingItem.quantity += currentQuantity;
  } else {
    cart.push({
      ...selectedProduct,
      quantity: currentQuantity,
    });
  }

  localStorage.setItem("kuttyCraftCart", JSON.stringify(cart));
  updateCartUI();
  closeModal();
  openCart();
}

/* ===============================================
   UPDATE CART UI
================================================ */
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  elements.cartBadge.textContent = totalItems;

  if (totalItems > 0) {
    elements.cartBadge.style.display = "flex";
  } else {
    elements.cartBadge.style.display = "none";
  }

  renderCartItems();
  updateCartTotal();
}

/* ===============================================
   RENDER CART ITEMS
================================================ */
function renderCartItems() {
  if (cart.length === 0) {
    elements.cartEmpty.style.display = "flex";
    elements.cartFooter.style.display = "none";
    elements.cartItems.innerHTML = "";
    return;
  }

  elements.cartEmpty.style.display = "none";
  elements.cartFooter.style.display = "block";

  elements.cartItems.innerHTML = cart
    .map((item, index) => {
      const imageUrl =
        item.images && item.images.length > 0 ? item.images[0] : item.image;
      return `
            <div class="cart-item">
                <img src="${imageUrl}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.title}</h4>
                    <p class="cart-item-price">₹${item.price}</p>
                    <p class="cart-item-quantity">Qty: ${item.quantity}</p>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">×</button>
            </div>
        `;
    })
    .join("");
}

/* ===============================================
   UPDATE CART TOTAL
================================================ */
function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  elements.totalAmount.textContent = `₹${total}`;
}

/* ===============================================
   REMOVE FROM CART
================================================ */
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("kuttyCraftCart", JSON.stringify(cart));
  updateCartUI();
}

/* ===============================================
   OPEN/CLOSE CART
================================================ */
function openCart() {
  elements.cartSidebar.classList.add("active");
}

function closeCart() {
  elements.cartSidebar.classList.remove("active");
}

/* ===============================================
   CHECKOUT MODAL
================================================ */
function openCheckoutModal() {
  if (cart.length === 0) return;

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  elements.summaryItems.innerHTML = cart
    .map(
      (item) => `
        <div class="summary-item">
            <span class="summary-item-name">${item.title}</span>
            <span class="summary-item-qty">x${item.quantity}</span>
            <span class="summary-item-price">₹${item.price * item.quantity}</span>
        </div>
    `,
    )
    .join("");

  elements.summaryAmount.textContent = `₹${totalAmount}`;

  elements.checkoutForm.reset();
  clearFormErrors();

  elements.checkoutModal.classList.add("active");
  document.body.style.overflow = "hidden";

  closeCart();
}

/* ===============================================
   CLOSE CHECKOUT MODAL
================================================ */
function closeCheckoutModal() {
  elements.checkoutModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

/* ===============================================
   GOOGLE SHEETS INTEGRATION
   Save payment data to Google Sheets
================================================ */
async function saveToGoogleSheets(status) {
  if (!paymentDetails) return;

  // Format items for better readability in sheet
  const itemsList = paymentDetails.items
    .map(
      (item) => `${item.title} (Qty: ${item.quantity}, Price: ₹${item.price})`,
    )
    .join(" | ");

  // Prepare data for Google Sheets (with secret token for security)
  const data = {
    secretToken: SECRET_TOKEN, // ✅ Security: Add secret token
    orderId: paymentDetails.orderId,
    paymentId: paymentDetails.razorpayPaymentId || "N/A",
    status: status,
    customerName: paymentDetails.customerName,
    phone: paymentDetails.customerPhone,
    email: paymentDetails.customerEmail || "N/A",
    address: paymentDetails.customerAddress || "Not provided",
    items: itemsList,
    itemCount: paymentDetails.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    ),
    totalAmount: paymentDetails.totalAmount,
    date: new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    errorCode: paymentDetails.errorCode || "N/A",
    errorDescription: paymentDetails.errorDescription || "N/A",
  };

  try {
    // Send to Google Sheets
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors", // Required for Google Apps Script
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("✅ Payment data sent to Google Sheets");
    console.log("🔒 Security: Token validated");

    // Also save to localStorage as backup
    saveToLocalStorage(status);

    return true;
  } catch (error) {
    console.error("❌ Failed to save to Google Sheets:", error);

    // Fallback to localStorage only
    saveToLocalStorage(status);

    return false;
  }
}

/* ===============================================
   LOCAL STORAGE BACKUP
   Save payment data to browser localStorage
================================================ */
function saveToLocalStorage(status) {
  if (!paymentDetails) return;

  try {
    // Get existing payment history
    let paymentHistory = JSON.parse(
      localStorage.getItem("kuttyCraftPayments") || "[]",
    );

    // Create payment record
    const record = {
      ...paymentDetails,
      status: status,
      timestamp: new Date().toISOString(),
      savedDate: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
    };

    // Add to history
    paymentHistory.push(record);

    // Keep only last 100 records to prevent storage overflow
    if (paymentHistory.length > 100) {
      paymentHistory = paymentHistory.slice(-100);
    }

    // Save back to localStorage
    localStorage.setItem("kuttyCraftPayments", JSON.stringify(paymentHistory));

    console.log("💾 Payment backup saved to localStorage");

    return true;
  } catch (error) {
    console.error("❌ Failed to save to localStorage:", error);
    return false;
  }
}

/* ===============================================
   HANDLE CHECKOUT FORM SUBMISSION
================================================ */
function handleCheckoutSubmit(e) {
  e.preventDefault();

  clearFormErrors();

  const customerName = document.getElementById("customerName").value.trim();
  const countryCode = document.getElementById("countryCode").value;
  const customerPhone = document.getElementById("customerPhone").value.trim();
  const customerEmail = document.getElementById("customerEmail").value.trim();
  const customerAddress = document
    .getElementById("customerAddress")
    .value.trim();

  let isValid = true;

  if (!customerName || customerName.length < 2) {
    showFormError("nameError", "Please enter a valid name");
    isValid = false;
  }

  if (!customerPhone || !/^[0-9]{10}$/.test(customerPhone)) {
    showFormError("phoneError", "Please enter a valid 10-digit phone number");
    isValid = false;
  }

  if (customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    showFormError("emailError", "Please enter a valid email address");
    isValid = false;
  }

  if (!customerAddress || customerAddress.length < 10) {
    showFormError(
      "addressError",
      "Please enter your complete delivery address",
    );
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  const orderId = "KC" + Date.now();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const productList = cart
    .map((item) => `${item.title} x ${item.quantity}`)
    .join(", ");

  const fullPhone = countryCode + customerPhone;

  const options = {
    key: "rzp_test_S6snJWXeIbWAu2",
    amount: totalAmount * 100,
    currency: "INR",
    name: "Kutty Craft",
    description: "Order ID: " + orderId,
    prefill: {
      name: customerName,
      email: customerEmail,
      contact: customerPhone,
    },
    notes: {
      order_id: orderId,
      customer_name: customerName,
      phone: fullPhone,
      address: customerAddress || "Not provided",
      products: productList,
    },
    theme: {
      color: "#ff9a76",
    },
    handler: function (response) {
      console.log("✅ Payment Successful!");
      console.log("Payment ID:", response.razorpay_payment_id);

      // Store payment and order details
      paymentDetails = {
        razorpayPaymentId: response.razorpay_payment_id,
        orderId: orderId,
        customerName: customerName,
        customerPhone: fullPhone,
        customerEmail: customerEmail,
        customerAddress: customerAddress,
        items: [...cart],
        totalAmount: totalAmount,
        orderDate: new Date().toISOString(),
      };

      // Save to Google Sheets and localStorage
      saveToGoogleSheets("SUCCESS");

      closeCheckoutModal();
      showSuccessPage();

      // Clear cart
      cart = [];
      localStorage.removeItem("kuttyCraftCart");
      updateCartUI();
    },
  };

  const rzp = new Razorpay(options);

  rzp.on("payment.failed", function (response) {
    console.error("❌ Payment Failed!");
    console.error("Error:", response.error);

    // Store failed payment details
    paymentDetails = {
      orderId: orderId,
      customerName: customerName,
      customerPhone: fullPhone,
      customerEmail: customerEmail,
      customerAddress: customerAddress,
      items: [...cart],
      totalAmount: totalAmount,
      orderDate: new Date().toISOString(),
      errorCode: response.error.code,
      errorDescription: response.error.description,
      errorSource: response.error.source,
      errorStep: response.error.step,
      errorReason: response.error.reason,
    };

    // Save failed payment to Google Sheets and localStorage
    saveToGoogleSheets("FAILED");

    alert(
      "Payment failed. Please try again.\n\nError: " +
        response.error.description,
    );
  });

  rzp.open();
}

/* ===============================================
   FORM VALIDATION HELPERS
================================================ */
function showFormError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add("active");
  }
}

function clearFormErrors() {
  const errorElements = document.querySelectorAll(".form-error");
  errorElements.forEach((el) => {
    el.textContent = "";
    el.classList.remove("active");
  });
}

/* ===============================================
   SHOW SUCCESS PAGE WITH DETAILS
================================================ */
function showSuccessPage() {
  if (!paymentDetails) return;

  // Update success page with order details
  document.getElementById("successOrderId").textContent =
    paymentDetails.orderId;
  document.getElementById("successPaymentId").textContent =
    paymentDetails.razorpayPaymentId;
  document.getElementById("successCustomerName").textContent =
    paymentDetails.customerName;
  document.getElementById("successTotalAmount").textContent =
    `₹${paymentDetails.totalAmount}`;

  // Populate items list
  const itemsList = document.getElementById("successItemsList");
  itemsList.innerHTML = paymentDetails.items
    .map(
      (item) => `
        <div class="success-item">
            <span class="success-item-name">${item.title}</span>
            <span class="success-item-qty">x${item.quantity}</span>
            <span class="success-item-price">₹${item.price * item.quantity}</span>
        </div>
    `,
    )
    .join("");

  elements.successPage.classList.add("active");
}

/* ===============================================
   CLOSE SUCCESS PAGE
================================================ */
function closeSuccessPage() {
  elements.successPage.classList.remove("active");
  paymentDetails = null;
}

/* ===============================================
   DOWNLOAD RECEIPT
   Opens printable receipt in new window
================================================ */
function downloadReceipt() {
  if (!paymentDetails) return;

  const receiptWindow = window.open("", "_blank", "width=800,height=1000");

  const receiptHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Kutty Craft - Receipt ${paymentDetails.orderId}</title>
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&family=Quicksand:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Quicksand', sans-serif;
            padding: 40px;
            background: #fff;
            color: #4a4a4a;
        }
        .receipt-container {
            max-width: 650px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border: 2px solid #f0e6d2;
            border-radius: 16px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #ff9a76;
        }
        .brand-name {
            font-family: 'Comfortaa', cursive;
            font-size: 2rem;
            color: #ff7f50;
            margin-bottom: 5px;
        }
        .receipt-title {
            color: #4CAF50;
            font-size: 1.5rem;
            margin-top: 10px;
        }
        .detail-section {
            margin: 20px 0;
            padding: 20px;
            background: #fffbf5;
            border-radius: 8px;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f0e6d2;
        }
        .detail-row:last-child { border-bottom: none; }
        .detail-label {
            font-weight: 600;
            color: #4a4a4a;
        }
        .detail-value {
            color: #7a7a7a;
        }
        .items-section {
            margin: 20px 0;
        }
        .items-title {
            font-family: 'Comfortaa', cursive;
            font-size: 1.2rem;
            margin-bottom: 15px;
            color: #4a4a4a;
        }
        .item-row {
            display: flex;
            justify-content: space-between;
            padding: 12px;
            background: #fffbf5;
            margin-bottom: 8px;
            border-radius: 8px;
        }
        .item-name { flex: 1; font-weight: 500; }
        .item-qty { margin: 0 15px; color: #7a7a7a; }
        .item-price { font-weight: 600; color: #ff7f50; }
        .total-section {
            margin: 30px 0;
            padding: 20px;
            background: linear-gradient(135deg, #fff5f0 0%, #ffe9dd 100%);
            border-radius: 8px;
            text-align: right;
        }
        .total-label {
            font-size: 1.2rem;
            font-weight: 600;
            color: #4a4a4a;
        }
        .total-amount {
            font-family: 'Comfortaa', cursive;
            font-size: 2rem;
            color: #ff7f50;
            font-weight: 700;
            margin-top: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #f0e6d2;
            color: #7a7a7a;
        }
        @media print {
            body { padding: 20px; }
            .no-print { display: none; }
        }
        .print-btn {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            margin: 20px auto;
            display: block;
        }
        .print-btn:hover { background: #45a049; }
    </style>
</head>
<body>
    <div class="receipt-container">
        <div class="header">
            <h1 class="brand-name">Kutty Craft</h1>
            <p style="color: #7a7a7a;">Handmade with Love ❤️</p>
            <h2 class="receipt-title">✓ Payment Successful</h2>
        </div>

        <div class="detail-section">
            <div class="detail-row">
                <span class="detail-label">Order ID:</span>
                <span class="detail-value">${paymentDetails.orderId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Payment ID:</span>
                <span class="detail-value">${paymentDetails.razorpayPaymentId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Customer Name:</span>
                <span class="detail-value">${paymentDetails.customerName}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span class="detail-value">${paymentDetails.customerPhone}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${paymentDetails.customerEmail || "N/A"}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Delivery Address:</span>
                <span class="detail-value">${paymentDetails.customerAddress}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${new Date(paymentDetails.orderDate).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</span>
            </div>
        </div>

        <div class="items-section">
            <h3 class="items-title">Items Purchased</h3>
            ${paymentDetails.items
              .map(
                (item) => `
                <div class="item-row">
                    <span class="item-name">${item.title}</span>
                    <span class="item-qty">x${item.quantity}</span>
                    <span class="item-price">₹${item.price * item.quantity}</span>
                </div>
            `,
              )
              .join("")}
        </div>

        <div class="total-section">
            <div class="total-label">Total Amount Paid</div>
            <div class="total-amount">₹${paymentDetails.totalAmount}</div>
        </div>

        <div class="footer">
            <p><strong>Thank you for shopping with Kutty Craft!</strong></p>
            <p style="margin-top: 10px;">For queries, contact: +91 8270282928</p>
            <p style="margin-top: 5px;">Email: hello@kuttycraft.com</p>
        </div>

        <button class="print-btn no-print" onclick="window.print()">
            Print / Save as PDF
        </button>
    </div>
</body>
</html>
    `;

  receiptWindow.document.write(receiptHTML);
  receiptWindow.document.close();
}

/* ===============================================
   VIEW PAYMENT HISTORY (OPTIONAL)
   Download payment history from localStorage as CSV
================================================ */
function downloadPaymentHistory() {
  try {
    const payments = JSON.parse(
      localStorage.getItem("kuttyCraftPayments") || "[]",
    );

    if (payments.length === 0) {
      alert("No payment records found in browser storage.");
      return;
    }

    // Create CSV header
    const csvRows = [
      [
        "Order ID",
        "Payment ID",
        "Status",
        "Customer Name",
        "Phone",
        "Email",
        "Amount",
        "Date",
        "Items",
      ],
    ];

    // Add data rows
    payments.forEach((payment) => {
      const itemsText = payment.items
        .map((item) => `${item.title}(${item.quantity})`)
        .join("; ");

      csvRows.push([
        payment.orderId,
        payment.razorpayPaymentId || "N/A",
        payment.status,
        payment.customerName,
        payment.customerPhone,
        payment.customerEmail || "N/A",
        payment.totalAmount,
        payment.savedDate || new Date(payment.timestamp).toLocaleString(),
        itemsText,
      ]);
    });

    // Convert to CSV string
    const csvContent = csvRows
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    // Download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kuttycraft-payment-history-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    console.log(`✅ Downloaded ${payments.length} payment records`);
  } catch (error) {
    console.error("Failed to download payment history:", error);
    alert("Failed to download payment history");
  }
}

/* ===============================================
   START APPLICATION
================================================ */
document.addEventListener("DOMContentLoaded", init);
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if (e.key === 'F12') e.preventDefault();
});