"use strict";

// MENU PARA CELULARES
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu" : "Abrir menu"
    );
  });

  // Fecha o menu quando o usuário clica em um link.
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    });
  });
}

// ATUALIZA O ANO DO RODAPÉ
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// FORMATAÇÃO DO TELEFONE
const phoneInput = document.querySelector("#phone");

if (phoneInput) {
  phoneInput.addEventListener("input", (event) => {
    const digits = event.target.value
      .replace(/\D/g, "")
      .slice(0, 11);

    let formatted = digits;

    if (digits.length > 2 && digits.length <= 6) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length > 6 && digits.length <= 10) {
      formatted =
        `(${digits.slice(0, 2)}) ` +
        `${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else if (digits.length > 10) {
      formatted =
        `(${digits.slice(0, 2)}) ` +
        `${digits.slice(2, 7)}-${digits.slice(7)}`;
    }

    event.target.value = formatted;
  });
}

// CONFIGURAÇÃO DO WHATSAPP
// Substitua pelo número real da clínica.
// Use código do país + DDD + número, sem espaços ou símbolos.
// Exemplo fictício: 5511999999999

const WHATSAPP_NUMBER = "5500000000000";

// FORMULÁRIO DE CONTATO
const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

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

    // Verifica se o número real já foi configurado.
    if (WHATSAPP_NUMBER === "5500000000000") {
      formFeedback.textContent =
        "O formulário está funcionando! " +
        "Configure o número da clínica no arquivo script.js " +
        "para ativar o WhatsApp.";

      return;
    }

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );

    formFeedback.textContent =
      "Sua mensagem foi preparada. Confira os dados e envie pelo WhatsApp.";
  });
}