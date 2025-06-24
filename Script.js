function calculateTotal() {
  const checkedCars = document.querySelectorAll('input[name="car"]:checked');
  const summary = document.getElementById("summary");
  summary.innerHTML = "";

  if (checkedCars.length === 0) {
    alert("Pilih setidaknya satu mobil.");
    return;
  }

  const name = document.getElementById("customer-name").value;
  if (!name.trim()) {
    alert("Masukkan nama pelanggan.");
    return;
  }

  let total = 0;
  let details = `<h3>Ringkasan Pemesanan untuk ${name}</h3><ul>`;

  checkedCars.forEach((car) => {
    const carName = car.value;
    const price = parseInt(car.dataset.price);
    const duration = parseInt(document.querySelector(`[name="duration-${carName}"]`).value);
    const startDate = document.querySelector(`[name="start-date-${carName}"]`).value;

    if (!duration || !startDate) {
      alert(`Lengkapi data untuk ${carName}`);
      return;
    }

    const subtotal = price * duration;
    total += subtotal;
    details += `<li>${carName} (${startDate} - ${duration} hari): Rp ${subtotal.toLocaleString()}</li>`;
  });

  details += `</ul><strong>Total Harga: Rp ${total.toLocaleString()}</strong>`;
  summary.innerHTML = details;
}

function saveBooking() {
  calculateTotal(); // pastikan valid
  const name = document.getElementById("customer-name").value;
  const summary = document.getElementById("summary").innerHTML;
  if (!summary) return;

  const timestamp = new Date().toLocaleString();
  const booking = { name, summary, timestamp };

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("Pemesanan disimpan!");
  loadBookings();
}

function loadBookings() {
  const list = document.getElementById("booking-list");
  list.innerHTML = "";

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  bookings.forEach((b, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>${b.summary}</div>
      <small>Waktu Pemesanan: ${b.timestamp}</small>
      <button class="delete-btn" onclick="deleteBooking(${index})">Hapus</button>
    `;
    list.appendChild(li);
  });
}

function deleteBooking(index) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.splice(index, 1);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  loadBookings();
}

window.onload = loadBookings;
