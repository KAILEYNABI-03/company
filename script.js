const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }));
}
document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const category = document.getElementById("category");
    const wanted = link.dataset.service;
    if (category && [...category.options].some(option => option.text === wanted)) category.value = wanted;
  });
});

const form = document.getElementById("enquiry-form");
const status = document.getElementById("form-status");
const submit = form?.querySelector('button[type="submit"]');
form?.addEventListener("submit", async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const payload = Object.fromEntries(new FormData(form).entries());
  payload.consent = form.elements.consent.checked;
  status.textContent = "Sending your enquiry…";
  status.className = "form-status";
  submit.disabled = true;
  submit.textContent = "Sending…";
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "We could not send your enquiry. Please email or WhatsApp us directly.");
    status.textContent = "Thank you. Your enquiry has been sent successfully. We will be in touch.";
    status.className = "form-status success";
    form.reset();
  } catch (error) {
    status.textContent = error.message || "Something went wrong. Please email badishagadiprojects@outlook.com or WhatsApp 062 094 8638.";
    status.className = "form-status error";
  } finally {
    submit.disabled = false;
    submit.innerHTML = 'Send enquiry <span aria-hidden="true">→</span>';
  }
});
