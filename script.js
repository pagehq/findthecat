const grid = document.getElementById('grid');
const out = document.getElementById('out');
const hint = document.getElementById('hint');
const sendBtn = document.getElementById('sendBtn');

const items = [
  "Beach",
  "Beauty Salon",
  "Grocery Store",
  "Airport",
  "Garage",
  "Bedroom",
  "Camping",
  "Kitchen",
  "Park",
  "Classroom",
  "Country Fair",
  "Diner",
  "Gas Station",
  "Living Room",
  "Drive-In Theater",
  "Lake",
  "School Bus",
  "Drive-In Diner",
  "Record Store",
  "Town Square",
  "Train Station",
  "Bowling Alley",
  "Street Market",
  "Dance Hall",
  "Toy Store",
  "Tailor Shop",
  "Route 66",
  "Christmas",
  "Birthday Party",
  "Post Office",
  "TV Studio",
  "Thanksgiving Day",
  "Vacation",
  "Ice Cream Truck",
  "Roller Rink",
  "Fourth of July"
];

// bottone disabilitato all'inizio
sendBtn.disabled = true;

items.forEach((labelText, idx) => {
  const i = idx + 1;

  const label = document.createElement('label');
  label.className = 'cell';

  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.value = labelText;
  cb.id = `item_${i}`;

  const text = document.createElement('span');
  text.textContent = labelText;

  cb.addEventListener('change', updateButtonState);

  label.appendChild(cb);
  label.appendChild(text);
  grid.appendChild(label);
});

function updateButtonState() {
  const checked = document.querySelectorAll('input[type="checkbox"]:checked');
  const count = checked.length;

  sendBtn.disabled = count !== 5;

  if (count === 5) {
    hint.textContent = "Perfetto: 5 selezionate. Puoi premere INVIA.";
  } else if (count < 5) {
    hint.textContent = `Seleziona esattamente 5 voci (ne mancano ${5 - count}).`;
  } else {
    hint.textContent = `Hai selezionato ${count} voci: devono essere esattamente 5.`;
  }
}

sendBtn.addEventListener('click', () => {
  const checked = [...document.querySelectorAll('input[type="checkbox"]:checked')]
    .map(x => x.value);

  out.textContent = `Hai selezionato: ${checked.join(', ')}`;
});
