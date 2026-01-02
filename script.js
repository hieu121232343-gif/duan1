// Lấy số bàn từ QR
const params = new URLSearchParams(window.location.search);
const table = params.get("table") || "Không xác định";

// Hiển thị bàn
document.getElementById("table-info").innerText =
  "🪑 Bạn đang ngồi tại: BÀN " + table;

let cart = [];
let total = 0;

// Thêm món
function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  renderCart();
}

// Hiển thị giỏ
function renderCart() {
  const list = document.getElementById("cart");
  list.innerHTML = "";

  cart.forEach(item => {
    list.innerHTML += <li>${item.name} - ${item.price}đ</li>;
  });

  document.getElementById("total").innerText =
    "Tổng: " + total.toLocaleString() + "đ";
}

// Gửi đơn
function sendOrder() {
  if (cart.length === 0) {
    alert("Chưa chọn món!");
    return;
  }

  const orderText = cart.map(i => i.name).join(", ");
  const time = new Date().toLocaleTimeString();

  const message =
    ĐƠN MỚI%0A +
    Bàn: ${table}%0A +
    Món: ${orderText}%0A +
    Tổng: ${total}đ%0A +
    Giờ: ${time};

  // 👉 Cách 1: Gửi qua Zalo / LINE
  window.open("https://zalo.me/?text=" + message);

  // 👉 Cách 2: Gửi Google Sheet (nâng cao)
  // fetch("LINK_GOOGLE_FORM", { method: "POST", mode: "no-cors" });

  cart = [];
  total = 0;
  renderCart();
}
