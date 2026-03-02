function goBack() {
    window.history.back();
}

let productName = "Digital Product";
let productPrice = 0;
let cartItems = [];
let customerData = {};

function getProductDetailsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("product");
    const price = urlParams.get("price");
    const cartItemsParam = urlParams.get("cartItems");
    const total = urlParams.get("total");

    if (cartItemsParam && total) {
        const items = decodeURIComponent(cartItemsParam).split("|");
        cartItems = items.map(item => {
            const [itemName, itemPrice] = item.split(":");
            return { name: itemName, price: parseInt(itemPrice) };
        });
        productName = cartItems.map(item => item.name).join(" + ");
        productPrice = parseInt(total);
    } else if (name && price) {
        productName = decodeURIComponent(name);
        productPrice = parseInt(price);
        cartItems = [{ name: productName, price: productPrice }];
    }

    updateProductDisplay();
}

function updateProductDisplay() {
    document.getElementById("productName").textContent = productName;
    document.getElementById("productPrice").textContent = "₹" + productPrice;
}

function generateQRCode() {
    const upiString = `upi://pay?pa=7010705106m@pnb&pn=LORN VINGEST&am=${productPrice}&cu=INR&tn=Payment for ${productName}`;
    
    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = "";
    qrContainer.style.cursor = "pointer";
    qrContainer.onclick = () => openUPI('upi');
    
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const qrSize = isMobile ? 200 : 256;
    
    new QRCode(qrContainer, {
        text: upiString,
        width: qrSize,
        height: qrSize,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    
    document.getElementById("qrAmount").textContent = "₹" + productPrice;
}

function openUPI(app) {
    const upiId = "7010705106m@pnb";
    const name = "LORN VINGEST";
    const amount = productPrice;
    const note = `Payment for ${productName}`;
    
    let url;
    
    if (app === 'gpay') {
        url = `tez://upi/pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    } else if (app === 'phonepe') {
        url = `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    } else if (app === 'paytm') {
        url = `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    } else {
        url = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    }
    
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    if (isMobile) {
        window.location.href = url;
    } else {
        alert('Please scan the QR code with your mobile phone to pay via UPI apps');
    }
}

document.getElementById("paymentForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    if (productPrice === 0) {
        alert("Please select a product first!");
        return;
    }
    
    customerData = {
        name: document.getElementById("customerName").value,
        email: document.getElementById("customerEmail").value,
        phone: document.getElementById("countryCode").value + document.getElementById("phoneNumber").value
    };
    
    document.getElementById("paymentForm").style.display = "none";
    document.getElementById("qrSection").classList.add("show");
    generateQRCode();
});

document.getElementById("transactionId").addEventListener("input", function(e) {
    const transactionId = e.target.value.trim();
    const isValid = /^[0-9]{12,15}$/.test(transactionId);
    document.getElementById("submitButton").disabled = !isValid;
});

document.getElementById("submitButton").addEventListener("click", async function() {
    const transactionId = document.getElementById("transactionId").value.trim();
    
    if (!/^[0-9]{12,15}$/.test(transactionId)) {
        alert("Please enter a valid 12-15 digit UPI Transaction ID!");
        return;
    }
    
    this.disabled = true;
    this.textContent = "Submitting...";
    
    try {
        const productsName = cartItems.map(item => item.name).join(", ");
        
        const paymentData = {
            customerName: customerData.name,
            customerEmail: customerData.email,
            customerPhone: customerData.phone,
            productsName: productsName,
            productPrice: productPrice,
            upiTransactionId: transactionId,
            timestamp: new Date()
        };
        
        const db = firebase.firestore();
        const docId = customerData.name.replace(/\s+/g, '_') + '_' + Date.now();
        await db.collection("upi_payments").doc(docId).set(paymentData);
        
        document.getElementById("overlay").classList.add("show");
        document.getElementById("successPopup").classList.add("show");
        
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
        
    } catch (error) {
        console.error("Error:", error);
        alert("Submission failed. Please try again.");
        this.disabled = false;
        this.textContent = "Submit Payment";
    }
});

window.addEventListener("load", getProductDetailsFromURL);
