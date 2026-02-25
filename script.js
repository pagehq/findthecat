const WEBHOOK_URL = "https://hook.eu2.make.com/g8lpeddzq9hhk7brsoja1dvd9pha6aqq";

// ---------- HOME (index) ----------
const grid = document.getElementById('grid');
const sendBtn = document.getElementById('sendBtn');

const ITEMS = [
  "Beach","Beauty Salon","Grocery Store","Airport","Garage","Bedroom",
  "Camping","Kitchen","Park","Classroom","Country Fair","Diner",
  "Gas Station","Living Room","Drive-In Theater","Lake","School Bus","Drive-In Diner",
  "Record Store","Town Square","Train Station","Bowling Alley","Street Market","Dance Hall",
  "Toy Store","Tailor Shop","Route 66","Christmas","Birthday Party","Post Office",
  "TV Studio","Thanksgiving Day","Vacation","Ice Cream Truck","Roller Rink","Fourth of July"
];

const CORRECT_SET = ["Airport","Gas Station","Bowling Alley","Route 66","Vacation"];
const CORRECT_URL = "correct.html";
const WRONG_URL = "wrong.html";

function renderGrid() {
  const frag = document.createDocumentFragment();

  ITEMS.forEach((t, i) => {
    const label = document.createElement('label');
    label.className = 'cell';
    label.innerHTML = `<input type="checkbox" value="${t}"><span><strong>${i + 1}.</strong> ${t}</span>`;
    frag.appendChild(label);
  });

  grid.appendChild(frag);
}

function selectedValues() {
  return [...grid.querySelectorAll('input[type="checkbox"]:checked')].map(x => x.value);
}

function isCorrectSelection(selected) {
  if (selected.length !== CORRECT_SET.length) return false;
  const s = new Set(selected);
  return CORRECT_SET.every(x => s.has(x));
}

function track(payload) {
  return fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true
  }).catch(() => {});
}

if (grid && sendBtn) {
  renderGrid();

  sendBtn.addEventListener('click', () => {
    const selected = selectedValues();
    const isCorrect = isCorrectSelection(selected);
    const target = isCorrect ? CORRECT_URL : WRONG_URL;

    track({
      event: "send_click",
      result: isCorrect ? "CORRECT" : "WRONG",
      selectedText: selected.join(", "),
      timestamp: new Date().toISOString(),
      page: location.href
    });

    setTimeout(() => { location.href = target; }, 150);
  });
}

// ---------- REVIEW button (correct/wrong) ----------
const reviewBtn = document.getElementById('reviewBtn');
// Metti REVIEW_LINK come variabile globale in correct.html / wrong.html (window.REVIEW_LINK)
if (reviewBtn && window.REVIEW_LINK) {
  reviewBtn.addEventListener('click', () => {
    track({
      event: "review_click",
      timestamp: new Date().toISOString(),
      page: location.href
    });

    setTimeout(() => { location.href = window.REVIEW_LINK; }, 150);
  });
}
