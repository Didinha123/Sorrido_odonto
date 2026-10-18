(function () {
  document.documentElement.classList.add("js");

  // ===== Dados da clínica =====
  const WHATSAPP = "5519938042991";
  const MENSAGEM = "Olá! Gostaria de agendar uma avaliação na Sorrisu's Odonto.";

  // Horários por dia da semana (0 = domingo ... 6 = sábado). null = fechado.
  const HORARIOS = {
    0: null,
    1: ["08:30", "18:30"],
    2: ["08:30", "18:30"],
    3: ["08:30", "18:30"],
    4: ["08:30", "18:30"],
    5: ["08:30", "18:30"],
    6: null,
  };
  const DIAS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];

  const toMin = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };

  // ===== WhatsApp =====
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAGEM)}`;
  document.querySelectorAll(".js-whatsapp").forEach((a) => {
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
  });

  // ===== Dia atual + status aberto/fechado =====
  const agora = new Date();
  const hoje = agora.getDay();
  const row = document.querySelector(`#hoursTable tr[data-day="${hoje}"]`);
  if (row) row.classList.add("today");

  const minutos = agora.getHours() * 60 + agora.getMinutes();

  function proximaAbertura() {
    for (let i = 1; i <= 7; i++) {
      const d = (hoje + i) % 7;
      if (HORARIOS[d]) return `${i === 1 ? "amanhã" : DIAS[d]} às ${HORARIOS[d][0]}`;
    }
    return "";
  }

  const hj = HORARIOS[hoje];
  let texto, classe;
  if (hj && minutos >= toMin(hj[0]) && minutos < toMin(hj[1])) {
    texto = `Aberto agora · fecha às ${hj[1]}`;
    classe = "open";
  } else {
    const quando = hj && minutos < toMin(hj[0]) ? `hoje às ${hj[0]}` : proximaAbertura();
    texto = `Fechado agora · abre ${quando}`;
    classe = "closed";
  }
  ["status", "status2"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) { el.textContent = texto; el.classList.add(classe); }
  });

  // ===== Header com sombra ao rolar =====
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ===== Menu mobile =====
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const fechaMenu = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const aberto = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(aberto));
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", fechaMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fechaMenu(); });

  // ===== Animação de entrada ao rolar =====
  const itens = document.querySelectorAll(".reveal");
  // escalonamento dentro de grupos (cards, passos, etc.)
  document.querySelectorAll(".cards, .steps, .strip__grid, .faq__list").forEach((grupo) => {
    grupo.querySelectorAll(".reveal").forEach((el, i) => el.style.setProperty("--d", `${i * 0.08}s`));
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    itens.forEach((el) => io.observe(el));
  } else {
    itens.forEach((el) => el.classList.add("in"));
  }

  // ===== FAQ: abre um por vez =====
  const faq = document.querySelectorAll(".faq details");
  faq.forEach((d) => d.addEventListener("toggle", () => {
    if (d.open) faq.forEach((o) => { if (o !== d) o.open = false; });
  }));

  // ===== Ano no rodapé =====
  document.getElementById("year").textContent = agora.getFullYear();
})();
