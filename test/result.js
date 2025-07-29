const descriptions = {
  R: "R (Realistic) — Практичный, любит работать с инструментами, машинами, техникой, предпочитает физическую активность. Подходят профессии: инженер, техник, механик, строитель.",
  I: "I (Investigative) — Аналитический, любит исследовать, решать задачи, работать с данными. Подходят профессии: ученый, программист, аналитик, врач.",
  A: "A (Artistic) — Творческий, предпочитает свободу самовыражения, искусство, музыку. Подходят профессии: дизайнер, художник, писатель, музыкант.",
  S: "S (Social) — Ориентирован на помощь другим, любит работать с людьми. Подходят профессии: педагог, психолог, врач, социальный работник.",
  E: "E (Enterprising) — Лидер, умеет убеждать, организовывать, любит влиять. Подходят профессии: предприниматель, менеджер, политик, маркетолог.",
  C: "C (Conventional) — Организованный, любит порядок, работу с числами и документацией. Подходят профессии: бухгалтер, администратор, офис-менеджер."
};

function countTypes(answers) {
  const counts = {
    R: 0, I: 0, A: 0, S: 0, E: 0, C: 0
  };

  answers.forEach(category => {
    if (counts[category] !== undefined) {
      counts[category]++;
    }
  });

  return counts;
}

function getTopTypes(counts) {
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, 2).map(entry => entry[0]);
}

function displayResults() {
  const resultContainer = document.querySelector(".container");
  const stored = localStorage.getItem("riasecAnswers");

  if (!stored) {
    resultContainer.innerHTML = "<p>Результаты не найдены. Пожалуйста, пройдите тест.</p>";
    return;
  }

  const answers = JSON.parse(stored);
  const counts = countTypes(answers);
  const topTypes = getTopTypes(counts);

const resultHTML = topTypes.map(type => `
  <div class="type-block">
    <h2>Тип ${type}</h2>
    <p>${descriptions[type]}</p>
  </div>
`).join("");


  resultContainer.innerHTML = `
    <h2>Ваши ведущие типы личности: <strong>${topTypes.join(" и ")}</strong></h2>
    ${resultHTML}
    <div class="instruction">
      <h3>Что дальше?</h3>
      <p>Скопируйте результат: <strong>${topTypes.join(" и ")}</strong> и вставьте его в чат с нашим карьерным ботом, чтобы получить персональные рекомендации.</p>
      <p><p>Пример:</p> <p>Мой результат: ${topTypes.join(" и ")}</p></p>
    </div>
  `;
}

displayResults();

