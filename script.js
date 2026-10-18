(function () {
  // Dados da clínica
  const WHATSAPP = "5519938042991";
  const MENSAGEM = "Olá! Gostaria de agendar uma consulta na Sorrisu's Odonto.";

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

  // Links do WhatsApp
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAGEM)}`;
  document.querySelectorAll(".js-whatsapp").forEach((a) => {
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
  });

  // Destaca o dia atual e mostra se está aberto
  const agora = new Date();
  const hoje = agora.getDay();
  const row = document.querySelector(`#hoursTable tr[data-day="${hoje}"]`);
  if (row) row.classList.add("today");

  const status = document.getElementById("status");
  const minutos = agora.getHours() * 60 + agora.getMinutes();

  function proximaAbertura() {
    for (let i = 1; i <= 7; i++) {
      const d = (hoje + i) % 7;
      if (HORARIOS[d]) return `${i === 1 ? "amanhã" : DIAS[d]} às ${HORARIOS[d][0]}`;
    }
    return "";
  }

  const hj = HORARIOS[hoje];
  if (hj && minutos >= toMin(hj[0]) && minutos < toMin(hj[1])) {
    status.textContent = `Aberto agora · fecha às ${hj[1]}`;
    status.classList.add("open");
  } else {
    const quando = hj && minutos < toMin(hj[0]) ? `hoje às ${hj[0]}` : proximaAbertura();
    status.textContent = `Fechado agora · abre ${quando}`;
    status.classList.add("closed");
  }

  // Menu mobile
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  toggle.addEventListener("click", () => {
    const aberto = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", aberto);
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  // Ano no rodapé
  document.getElementById("year").textContent = agora.getFullYear();
})();
