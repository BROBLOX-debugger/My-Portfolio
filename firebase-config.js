
// (Project Settings > General > Your apps > SDK setup and configuration)

const firebaseConfig = {  
  apiKey: "AIzaSyDYRfZGOhmdyjNRFlNAsL15iEhPXlbCwxU",
  authDomain: "justins-booking.firebaseapp.com",
  projectId: "justins-booking",
  storageBucket: "justins-booking.firebasestorage.app",
  messagingSenderId: "1025617742708",
  appId: "1:1025617742708:web:09d4fcc825a6f3513d7a21"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Handle booking form submission
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("booking-form");
  const statusMsg = document.getElementById("booking-status");

  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("booking-name").value.trim();
    const song = document.getElementById("booking-song").value.trim();
    const date = document.getElementById("booking-date").value;

    if (!name || !song || !date) {
      statusMsg.textContent = "Please fill out all fields.";
      statusMsg.style.color = "red";
      return;
    }

    statusMsg.textContent = "Submitting your booking...";
    statusMsg.style.color = "black";

    try {
      await db.collection("bookings").add({
        name: name,
        song: song,
        eventDate: date,
        bookedBy: sessionStorage.getItem("userName") || null,
        submittedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      statusMsg.textContent = "Thank you! Your booking has been received. I will get back to you soon.";
      statusMsg.style.color = "green";
      bookingForm.reset();
    } catch (error) {
      console.error("Error adding booking: ", error);
      statusMsg.textContent = "Error, Try again later.";
      statusMsg.style.color = "red";
    }
  });
});
