// Sorrisu's Odonto — interações do site
"use strict";

// MENU PARA CELULARES
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    });
  });
}

// ANO ATUAL NO RODAPÉ
const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// MÁSCARA DO TELEFONE
const phoneInput = document.querySelector("#phone");

if (phoneInput) {
  phoneInput.addEventListener("input", (event) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 11);
    let formatted = digits;

    if (digits.length > 2 && digits.length <= 6) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length > 6 && digits.length <= 10) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else if (digits.length > 10) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }

    event.target.value = formatted;
  });
}

// WHATSAPP DA CLÍNICA: Brasil (55) + DDD (19) + número informado.
const WHATSAPP_NUMBER = "551938042991";

// FORMULÁRIO DE CONTATO
const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const service = String(formData.get("service") || "").trim();

    const message = [
      "Olá! Gostaria de falar com a Sorrisu's Odonto.",
      "",
      `Nome: ${name}`,
      `Meu WhatsApp: ${phone}`,
      `Assunto: ${service}`,
      "",
      "Poderiam me orientar sobre os próximos passos?"
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (formFeedback) {
      formFeedback.textContent =
        "Sua mensagem foi preparada. Confira os dados e envie pelo WhatsApp.";
    }
  });
}
