// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinksEl = document.querySelector(".nav-links");
navToggle.addEventListener("click", () => {
  navLinksEl.classList.toggle("open");
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => navLinksEl.classList.remove("open"));
});

// Scroll-spy: highlight active nav link based on visible section
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);

sections.forEach(section => observer.observe(section));

// Telegram bot ulanishi
// Server lokalda ishlayotganda shu manzil to'g'ri keladi. Agar serverni
// boshqa joyga (masalan hosting'ga) chiqarsangiz, shu yerdagi manzilni
// o'sha serverning haqiqiy manziliga almashtiring.
const SERVER_URL = "http://localhost:3000/send-message";

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const message = contactForm.message.value.trim();

  submitBtn.disabled = true;
  submitBtn.textContent = "Yuborilmoqda...";
  formStatus.textContent = "";

  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });
    const data = await response.json();

    if (data.ok) {
      formStatus.textContent = "✅ Xabaringiz yuborildi, rahmat!";
      contactForm.reset();
    } else {
      formStatus.textContent = "❌ Xatolik: " + (data.error || "Noma'lum xato");
    }
  } catch (err) {
    formStatus.textContent = "❌ Serverga ulanib bo'lmadi. Server ishga tushganini tekshiring.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Yuborish";
  }
});
