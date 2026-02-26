// v2.1 — ИВТ-Викторина | Вопросы пересортированы по сложности, исправлены дистракторы

/* ═══════════════════════════════════════════════════════
   БАЗА ДАННЫХ ВОПРОСОВ
═══════════════════════════════════════════════════════ */
const QUESTIONS_DB = {
  "Игры": {
    10: { question: "На чём, кроме ПК и смартфона, играют в видеоигры?",
         answer: "консоли", options: ["консоли", "телевизор", "радио", "холодильник"], is_played: false },
    20: { question: "Мельчайшая точка на экране?",
         answer: "пиксель", options: ["пиксель", "байт", "курсор", "кадр"], is_played: false },
    30: { question: "Ошибка в программе (например, провал сквозь стену)?",
         answer: "баг", options: ["баг", "патч", "мод", "обновление"], is_played: false },
    40: { question: "Кто изначальный создатель Minecraft?",
         answer: "нотч", options: ["нотч", "гейб ньюэлл", "тодд говард", "сатья наделла"], is_played: false },
    50: { question: "Базовая программа (Unity/Unreal) для создания игр?",
         answer: "движок", options: ["движок", "браузер", "антивирус", "архиватор"], is_played: false },
  },
  "Компьютеры": {
    10: { question: "Главный «мозг» компьютера, выполняющий вычисления?",
         answer: "процессор", options: ["процессор", "монитор", "клавиатура", "колонки"], is_played: false },
    20: { question: "Устройство для вывода информации на бумагу?",
         answer: "принтер", options: ["принтер", "монитор", "клавиатура", "мышь"], is_played: false },
    30: { question: "Как расшифровывается аббревиатура ОЗУ?",
         answer: "оперативное запоминающее устройство", options: ["оперативное запоминающее устройство", "общее зарядное устройство", "основной звуковой усилитель", "объёмное записывающее устройство"], is_played: false },
    40: { question: "Как называется плата, к которой подключаются все остальные детали компьютера?",
         answer: "материнская", options: ["материнская", "видеокарта", "звуковая", "сетевая"], is_played: false },
    50: { question: "Вредоносная программа, которая маскируется под полезное приложение?",
         answer: "троян", options: ["троян", "антивирус", "драйвер", "кодек"], is_played: false },
  },
  "Двоичный код": {
    10: { question: "Из каких двух цифр состоит двоичная система счисления?",
         answer: "0 и 1", options: ["0 и 1", "1 и 2", "0 и 9", "A и B"], is_played: false },
    20: { question: "Сколько бит содержится в одном байте?",
         answer: "8", options: ["8", "4", "16", "2"], is_played: false },
    30: { question: "Как называется наименьшая единица измерения информации?",
         answer: "бит", options: ["бит", "байт", "килобайт", "мегабайт"], is_played: false },
    40: { question: "Чему равно число 10 в двоичной системе в десятичной?",
         answer: "2", options: ["2", "10", "1", "4"], is_played: false },
    50: { question: "Какое арифметическое действие используют для перевода из десятичной в двоичную систему?",
         answer: "деление", options: ["деление", "возведение в степень", "логарифм", "округление"], is_played: false },
  },
  "Текстовый штурм": {
    10: { question: "Какая комбинация клавиш используется для копирования (Ctrl + ...)?",
         answer: "c", options: ["c", "v", "x", "z"], is_played: false },
    20: { question: "Как называется наклонное начертание текста?",
         answer: "курсив", options: ["курсив", "полужирный", "подчёркнутый", "зачёркнутый"], is_played: false },
    30: { question: "Временное хранилище, куда попадает скопированный текст?",
         answer: "буфер обмена", options: ["буфер обмена", "рабочий стол", "корзина", "реестр"], is_played: false },
    40: { question: "Как называется набор символов, имеющих общий стиль (например, Arial или Times New Roman)?",
         answer: "шрифт", options: ["шрифт", "абзац", "поле страницы", "колонтитул"], is_played: false },
    50: { question: "Что такое отступ в начале первой строки абзаца?",
         answer: "красная строка", options: ["красная строка", "интервал", "поле", "выравнивание"], is_played: false },
  },
  "Повелитель Таблиц": {
    10: { question: "Каким знаком обязательно должна начинаться любая формула в Excel/Sheets?",
         answer: "=", options: ["=", "+", "@", "#"], is_played: false },
    20: { question: "Как называется пересечение строки и столбца в электронной таблице?",
         answer: "ячейка", options: ["ячейка", "строка", "столбец", "раздел"], is_played: false },
    30: { question: "Как обозначаются столбцы в Google Sheets или Excel?",
         answer: "буквами", options: ["буквами", "цифрами", "символами", "цветами"], is_played: false },
    40: { question: "Графическое представление данных из таблицы (например, круговая или столбчатая)?",
         answer: "диаграмма", options: ["диаграмма", "рисунок", "формула", "запрос"], is_played: false },
    50: { question: "Как записывается формула для суммы в ячейках от A1 до A5 в Excel?",
         answer: "=СУММ(A1:A5)", options: ["=СУММ(A1:A5)", "=ИТОГ(A1+A5)", "=СЛОЖИТЬ(A1,A5)", "СУММ[A1-A5]"], is_played: false },
  },
};

// Порядок тем и баллов
const CATEGORIES = Object.keys(QUESTIONS_DB);
const POINTS = [10, 20, 30, 40, 50];

// Буквы строк (A–E) и цифры столбцов (1–5)
const CELL_LETTERS = ['A', 'B', 'C', 'D', 'E'];
const CELL_NUMBERS = ['1', '2', '3', '4', '5'];

// Цвета команд (до 8 команд)
const TEAM_COLORS = [
  "#ff6b6b",
  "#4ecdc4",
  "#ffe66d",
  "#a29bfe",
  "#fd79a8",
  "#55efc4",
  "#fdcb6e",
  "#74b9ff",
];

/* ═══════════════════════════════════════════════════════
   СОСТОЯНИЕ ИГРЫ
═══════════════════════════════════════════════════════ */
let state = {
  teams: [],
  currentTeamIdx: 0,
  questions: {},
  activeQuestion: null,
};

/* ═══════════════════════════════════════════════════════
   УТИЛИТЫ
═══════════════════════════════════════════════════════ */
function $(id) {
  return document.getElementById(id);
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $(id).classList.add("active");
}

function openModal(id) {
  const m = $(id);
  m.setAttribute("aria-hidden", "false");
  m.classList.add("open");
}

function closeModal(id) {
  const m = $(id);
  m.setAttribute("aria-hidden", "true");
  m.classList.remove("open");
}

function cloneQuestions() {
  const clone = {};
  for (const cat of CATEGORIES) {
    clone[cat] = {};
    for (const pts of POINTS) {
      clone[cat][pts] = { ...QUESTIONS_DB[cat][pts] };
    }
  }
  return clone;
}

function normalize(str) {
  return str.trim().toLowerCase().replace(/ё/g, "е");
}

/* ═══════════════════════════════════════════════════════
   ЗВЁЗДЫ — АНИМАЦИЯ ФОНА
═══════════════════════════════════════════════════════ */
function createStars() {
  const container = $("stars");
  if (!container) return;
  for (let i = 0; i < 120; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${(Math.random() * 4 + 2).toFixed(1)}s;
      --delay: ${(Math.random() * 5).toFixed(1)}s;
    `;
    container.appendChild(star);
  }
}

/* ═══════════════════════════════════════════════════════
   ЭКРАН НАСТРОЙКИ
═══════════════════════════════════════════════════════ */
function renderTeamInputs(count) {
  const list = $("teams-list");
  list.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const color = TEAM_COLORS[i];
    const item = document.createElement("div");
    item.classList.add("team-item");
    item.style.borderColor = color + "55";

    item.innerHTML = `
      <div class="team-color-dot" style="background:${color}; color:${color};"></div>
      <span class="team-label">Команда ${i + 1}</span>
      <input
        type="text"
        class="team-name-input"
        id="team-name-${i}"
        placeholder="Название команды…"
        maxlength="30"
        value="${state.teams[i]?.name || ""}"
        style="border-bottom-color: ${color}66;"
      />
    `;
    list.appendChild(item);

    const inp = item.querySelector(`#team-name-${i}`);
    inp.addEventListener("focus", () => {
      item.style.borderColor = color;
      item.style.boxShadow = `0 0 16px ${color}33`;
    });
    inp.addEventListener("blur", () => {
      item.style.borderColor = color + "55";
      item.style.boxShadow = "";
    });
  }

  $("btn-start-game").style.display = count >= 1 ? "inline-flex" : "none";
}

function getTeamCount() {
  const v = parseInt($("team-count-input").value, 10);
  if (isNaN(v) || v < 1) return 1;
  if (v > 8) return 8;
  return v;
}

/* ═══════════════════════════════════════════════════════
   ИГРОВОЕ ПОЛЕ
═══════════════════════════════════════════════════════ */
function buildBoard() {
  const table = $("question-board");
  table.innerHTML = "";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.classList.add("board-header");

  // Угловая ячейка
  const cornerTh = document.createElement("th");
  cornerTh.classList.add("corner-cell");
  headerRow.appendChild(cornerTh);

  // Заголовки столбцов: только баллы
  POINTS.forEach((pts) => {
    const th = document.createElement("th");
    th.classList.add("col-header");
    th.innerHTML = `<span class="col-pts">${pts}</span>`;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Тело: строки = темы, столбцы = баллы
  const tbody = document.createElement("tbody");
  CATEGORIES.forEach((cat, rowIdx) => {
    const tr = document.createElement("tr");

    // Левая ячейка — название темы
    const rowTh = document.createElement("th");
    rowTh.classList.add("row-header");
    rowTh.innerHTML = `<span class="row-name">${cat}</span>`;
    tr.appendChild(rowTh);

    // Ячейки вопросов
    POINTS.forEach((pts, colIdx) => {
      const td = document.createElement("td");
      td.classList.add("question-cell");
      td.dataset.cat = cat;
      td.dataset.pts = pts;
      const label = `${CELL_LETTERS[rowIdx]}${CELL_NUMBERS[colIdx]}`;

      if (state.questions[cat][pts].is_played) {
        td.classList.add("played");
      } else {
        td.textContent = label;
        td.addEventListener("click", () => openQuestionModal(cat, pts));
      }
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
}

function renderScoreboard() {
  const leftBoard = $("scoreboard-left");
  const rightBoard = $("scoreboard-right");
  if (leftBoard) leftBoard.innerHTML = "";
  if (rightBoard) rightBoard.innerHTML = "";

  const half = Math.ceil(state.teams.length / 2);

  state.teams.forEach((team, i) => {
    const chip = document.createElement("div");
    chip.classList.add("score-chip");
    chip.id = `score-chip-${i}`;
    chip.style.background = team.color + "22";
    chip.style.borderColor = team.color + "99";
    chip.style.color = team.color;

    if (i === state.currentTeamIdx) chip.classList.add("active-team");

    chip.innerHTML = `
      <div class="score-dot" style="background:${team.color};"></div>
      <span class="score-name">${team.name}</span>
      <span class="score-value">${team.score}</span>
    `;
    
    if (i < half) {
      if (leftBoard) leftBoard.appendChild(chip);
    } else {
      if (rightBoard) rightBoard.appendChild(chip);
    }
  });

  const currentTeam = state.teams[state.currentTeamIdx];
  const nameEl = $("current-team-name");
  nameEl.textContent = currentTeam.name;
  nameEl.style.color = currentTeam.color;
}

/* ═══════════════════════════════════════════════════════
   МОДАЛ ВОПРОСА
═══════════════════════════════════════════════════════ */
function openQuestionModal(category, points) {
  const qData = state.questions[category][points];
  if (qData.is_played) return;

  const rowIdx = CATEGORIES.indexOf(category);
  const colIdx = POINTS.indexOf(points);
  const cellCode = `${CELL_LETTERS[rowIdx]}${CELL_NUMBERS[colIdx]}`;
  state.activeQuestion = { category, points, data: qData };

  $("modal-category").textContent = cellCode + " · " + category;
  $("modal-points-badge").textContent = points + " очков";
  $("modal-question-text").textContent = qData.question;

  $("answer-result").style.display = "none";
  $("answer-result").className = "answer-result";
  $("answer-reveal").style.display = "none";
  $("btn-correct").style.display = "none";
  $("btn-wrong").style.display = "none";
  $("btn-close-modal").style.display = "none";

  renderOptions(qData.options, qData.answer);
  openModal("modal-question");
}

function renderOptions(options, correctAnswer) {
  const grid = $("options-grid");
  grid.innerHTML = "";
  const labels = ["A", "B", "C", "D"];
  const shuffled = [...options].sort(() => Math.random() - 0.5);
  shuffled.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.innerHTML =
      `<span class="opt-label">${labels[i]}</span>` +
      `<span class="opt-text">${opt}</span>`;
    btn.addEventListener("click", () => selectOption(opt, correctAnswer, btn));
    grid.appendChild(btn);
  });
}

function selectOption(chosen, correct, clickedBtn) {
  if (!state.activeQuestion) return;

  document.querySelectorAll(".option-btn").forEach((b) => { b.disabled = true; });

  const isCorrect = normalize(chosen) === normalize(correct);

  document.querySelectorAll(".option-btn").forEach((b) => {
    const text = b.querySelector(".opt-text").textContent;
    if (normalize(text) === normalize(correct)) {
      b.classList.add("opt-correct");
    } else if (b === clickedBtn && !isCorrect) {
      b.classList.add("opt-wrong");
    }
  });

  const resultEl = $("answer-result");
  resultEl.style.display = "block";

  if (isCorrect) {
    resultEl.className = "answer-result correct";
    resultEl.textContent = "✅ Правильно! Очки начисляются…";
    setTimeout(() => awardPoints(true), 1600);
  } else {
    resultEl.className = "answer-result wrong";
    resultEl.textContent = "❌ Неверно. Ведущий решает:";
    $("btn-correct").style.display = "inline-flex";
    $("btn-wrong").style.display = "inline-flex";
  }
}

function awardPoints(correct) {
  if (!state.activeQuestion) return;

  const { category, points } = state.activeQuestion;

  if (correct) {
    state.teams[state.currentTeamIdx].score += points;
  }

  state.questions[category][points].is_played = true;

  const cell = document.querySelector(
    `.question-cell[data-cat="${CSS.escape(category)}"][data-pts="${points}"]`,
  );
  if (cell) {
    cell.classList.add("played");
    cell.textContent = "";
  }

  state.currentTeamIdx = (state.currentTeamIdx + 1) % state.teams.length;
  renderScoreboard();

  closeModal("modal-question");
  state.activeQuestion = null;

  if (isGameOver()) {
    setTimeout(showEndModal, 400);
  }
}

function isGameOver() {
  for (const cat of CATEGORIES) {
    for (const pts of POINTS) {
      if (!state.questions[cat][pts].is_played) return false;
    }
  }
  return true;
}

/* ═══════════════════════════════════════════════════════
   ФИНАЛЬНЫЙ ЭКРАН
═══════════════════════════════════════════════════════ */
function showEndModal() {
  const sorted = [...state.teams].sort((a, b) => b.score - a.score);
  const endResults = $("end-results");
  endResults.innerHTML = "";

  const medals = ["🥇", "🥈", "🥉"];

  sorted.forEach((team, i) => {
    const row = document.createElement("div");
    row.classList.add("end-result-row");
    if (i === 0) row.classList.add("winner");
    row.style.borderLeftColor = team.color;
    row.style.borderLeftWidth = "4px";

    row.innerHTML = `
      <span class="end-rank">${medals[i] || i + 1 + "."}</span>
      <span class="end-name" style="color:${team.color}">${team.name}</span>
      <span class="end-score">${team.score} очков</span>
    `;
    endResults.appendChild(row);
  });

  openModal("modal-end");
}

/* ═══════════════════════════════════════════════════════
   ЗАПУСК ИГРЫ
═══════════════════════════════════════════════════════ */
function startGame() {
  const count = getTeamCount();
  const teams = [];

  for (let i = 0; i < count; i++) {
    const input = $(`team-name-${i}`);
    const name = input ? input.value.trim() : "";
    teams.push({
      name: name || `Команда ${i + 1}`,
      color: TEAM_COLORS[i],
      score: 0,
    });
  }

  state.teams = teams;
  state.currentTeamIdx = 0;
  state.questions = cloneQuestions();
  state.activeQuestion = null;

  buildBoard();
  renderScoreboard();
  showScreen("screen-game");
}

/* ═══════════════════════════════════════════════════════
   ПРИВЯЗКА СОБЫТИЙ
═══════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  createStars();

  // ── Главное меню ──────────────────────────────
  $("btn-start-setup").addEventListener("click", () => {
    showScreen("screen-setup");
    const count = getTeamCount();
    renderTeamInputs(count);
  });

  // ── Экран настройки ───────────────────────────
  $("btn-back-to-menu").addEventListener("click", () => showScreen("screen-menu"));

  $("team-count-input").addEventListener("input", () => {
    let v = parseInt($("team-count-input").value, 10);
    if (isNaN(v)) v = 1;
    v = Math.max(1, Math.min(8, v));
    $("team-count-input").value = v;
    renderTeamInputs(v);
  });

  $("btn-count-minus").addEventListener("click", () => {
    let v = getTeamCount();
    if (v > 1) {
      $("team-count-input").value = v - 1;
      $("team-count-input").dispatchEvent(new Event("input"));
    }
  });

  $("btn-count-plus").addEventListener("click", () => {
    let v = getTeamCount();
    if (v < 8) {
      $("team-count-input").value = v + 1;
      $("team-count-input").dispatchEvent(new Event("input"));
    }
  });

  $("team-count-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") renderTeamInputs(getTeamCount());
  });

  $("btn-start-game").addEventListener("click", startGame);

  // ── Игровой экран ──────────────────────────────
  $("btn-end-game").addEventListener("click", () => showEndModal());

  // ── Модал вопроса ─────────────────────────────
  $("btn-correct").addEventListener("click", () => awardPoints(true));
  $("btn-wrong").addEventListener("click", () => awardPoints(false));

  $("btn-close-modal").addEventListener("click", () => {
    closeModal("modal-question");
    state.activeQuestion = null;
  });

  // ── Финальный модал ───────────────────────────
  $("btn-restart").addEventListener("click", () => {
    closeModal("modal-end");
    showScreen("screen-menu");
  });
});
