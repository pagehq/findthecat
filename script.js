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
const CORRECT_URL = "correct/";
const WRONG_URL = "wrong/";

function render() {
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

sendBtn.addEventListener('click', () => {
  const selected = selectedValues();
  location.href = isCorrectSelection(selected) ? CORRECT_URL : WRONG_URL;
});

render();
