const grid = document.getElementById('grid');
const sendBtn = document.getElementById('sendBtn');
const hint = document.getElementById('hint');
const out = document.getElementById('out');

const ITEMS = [
  "Beach","Beauty Salon","Grocery Store","Airport","Garage","Bedroom",
  "Camping","Kitchen","Park","Classroom","Country Fair","Diner",
  "Gas Station","Living Room","Drive-In Theater","Lake","School Bus","Drive-In Diner",
  "Record Store","Town Square","Train Station","Bowling Alley","Street Market","Dance Hall",
  "Toy Store","Tailor Shop","Route 66","Christmas","Birthday Party","Post Office",
  "TV Studio","Thanksgiving Day","Vacation","Ice Cream Truck","Roller Rink","Fourth of July"
];

const required = 5;

function render(){
  const frag = document.createDocumentFragment();

  ITEMS.forEach((t, i) => {
    const label = document.createElement('label');
    label.className = 'cell';
    label.innerHTML =
      `<input type="checkbox" value="${t}">
       <span><strong>${i + 1}.</strong> ${t}</span>`;
    frag.appendChild(label);
  });

  grid.appendChild(frag);
  grid.addEventListener('change', onChange);
}

function selectedValues(){
  return [...grid.querySelectorAll('input[type="checkbox"]:checked')].map(x => x.value);
}

function updateUI(){
  const c = selectedValues().length;
  sendBtn.disabled = c !== required;

  if (c < required) hint.textContent = `Select exactly ${required} items (${required - c} remaining).`;
  else if (c === required) hint.textContent = "Perfect! Now you can press SEND.";
  else hint.textContent = `You selected ${c} items: they must be exactly ${required}.`;
}

function onChange(){
  updateUI();
}

sendBtn.addEventListener('click', () => {
  if (sendBtn.disabled) return;
  const v = selectedValues();
  out.textContent = `You selected: ${v.join(', ')}`;
});

render();
updateUI();
