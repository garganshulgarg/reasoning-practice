// Question bank — text copied exactly from the book pages / school worksheet.
// ans = index of correct option (0=a, 1=b, 2=c, 3=d). Options starting with "img:" are pictures.

const TALLY = n => {
  // draws tally marks as inline SVG (groups of 5 with a slash)
  let s = '', x = 4;
  for (let i = 0; i < n; i++) {
    if (i % 5 === 4) { s += `<line x1="${x - 38}" y1="26" x2="${x + 2}" y2="4" stroke="#333" stroke-width="2.5"/>`; x += 12; continue; }
    s += `<line x1="${x}" y1="3" x2="${x}" y2="27" stroke="#333" stroke-width="2.5"/>`; x += 9;
  }
  return `<svg width="${x + 6}" height="30" viewBox="0 0 ${x + 6} 30">${s}</svg>`;
};

const barChart = (title, yLabel, xLabel, bars, max, step, colors) => {
  const W = 360, H = 230, L = 46, B = 190, T = 20, R = 350;
  const bw = (R - L) / bars.length;
  let g = `<text x="${W / 2}" y="14" text-anchor="middle" font-size="14" font-weight="700" fill="#333">${title}</text>`;
  for (let v = 0; v <= max; v += step) {
    const y = B - (v / max) * (B - T);
    g += `<line x1="${L}" y1="${y}" x2="${R}" y2="${y}" stroke="#ddd"/><text x="${L - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="#444">${v}</text>`;
  }
  bars.forEach(([name, v], i) => {
    const h = (v / max) * (B - T), x = L + i * bw + bw * 0.22;
    g += `<rect x="${x}" y="${B - h}" width="${bw * 0.56}" height="${h}" rx="3" fill="${colors[i % colors.length]}"/>`;
    g += `<text x="${x + bw * 0.28}" y="${B + 15}" text-anchor="middle" font-size="11" fill="#333">${name}</text>`;
  });
  g += `<line x1="${L}" y1="${T - 6}" x2="${L}" y2="${B}" stroke="#333" stroke-width="1.5"/><line x1="${L}" y1="${B}" x2="${R}" y2="${B}" stroke="#333" stroke-width="1.5"/>`;
  g += `<text x="${(L + R) / 2}" y="${H - 4}" text-anchor="middle" font-size="12" font-weight="700" fill="#333">${xLabel}</text>`;
  g += `<text transform="translate(13 ${(T + B) / 2}) rotate(-90)" text-anchor="middle" font-size="12" font-weight="700" fill="#333">${yLabel}</text>`;
  return `<svg class="chart" viewBox="0 0 ${W} ${H}">${g}</svg>`;
};

const books = n => '<span class="pic">' + '📕'.repeat(n) + '</span>';
const smile = n => '😊'.repeat(n);

const CTX = {
  ana: { title: 'Analogy', dir: 'Directions (Questions 1–15): Identify the relationship between the first pair of figures and find the missing figure:' },
  anaW: { title: 'Analogy', dir: 'Directions (Questions 16–25): Identify the relation between the first pair of words and choose the correct option to establish the same relation with the other words.' },
  ser: { title: 'Series and Pattern Completion', dir: 'Directions (Questions 26–40): Identify which figure will complete the given series/pattern.' },
  sci: { title: 'Scientific Reasoning', dir: 'Problems on Scientific Reasoning' },
  cars: {
    title: 'Data Handling', dir: 'Directions (Questions 107–109): The following graph shows the distance covered by 4 cars in an hour.',
    html: barChart('', 'Distance covered (in km)', 'Cars', [['Car A', 50], ['Car B', 100], ['Car C', 75], ['Car D', 25]], 100, 25, ['#f4c542', '#f28bb0', '#6f7fe0', '#4fc3c7'])
  },
  books: {
    title: 'Data Handling', dir: 'Directions (Questions 110–113): The following pictograph represents the number of books owned by five students. Read the pictograph and answer the questions given below.',
    html: `<table class="dt"><tr><th colspan="2">Each 📕 represents 5 books.</th></tr><tr><th>Name</th><th>Number of Books</th></tr>
      <tr><td>Rohit</td><td>${books(2)}</td></tr><tr><td>Mohit</td><td>${books(4)}</td></tr><tr><td>Shobhit</td><td>${books(3)}</td></tr>
      <tr><td>Sarthak</td><td>${books(5)}</td></tr><tr><td>Raman</td><td>${books(6)}</td></tr></table>`
  },
  zoo: {
    title: 'Data Handling', dir: 'Directions (Questions 114–116): Some children went to visit a zoo. Their teacher asked them to make a list of the animals and their numbers that they saw. They showed the list like given below.',
    html: `<table class="dt zoo"><tr><th>Lion</th><th>Tiger</th><th>Monkey</th><th>Elephant</th><th>Bear</th></tr>
      <tr class="big"><td>🦁</td><td>🐯</td><td>🐒</td><td>🐘</td><td>🐻</td></tr><tr><td>6</td><td>5</td><td>10</td><td>7</td><td>4</td></tr></table>`
  },
  food: {
    title: 'Data Handling', dir: 'Directions (Questions 117–119): The pictograph shows the food items liked by a group of boys and girls.',
    html: `<table class="dt food"><tr><th>Eggs</th><th>Rice</th><th>Green-Leafy Vegetables</th><th>Oats</th></tr>
      <tr><td>${smile(3)}</td><td>${smile(2)}</td><td>${smile(4)}</td><td>${smile(5)}</td></tr>
      <tr><td colspan="4" class="left">Each 😊 stands for 5 children.</td></tr></table>`
  },
  tally: {
    title: 'Data Handling', dir: 'Directions (Questions 120–123): Some students were asked about the game they liked the most. The information given by them is as follows.',
    html: `<table class="dt"><tr><th>Game</th><th>Tally Marks showing the number of students</th></tr>
      <tr><td>Cricket</td><td>${TALLY(7)}</td></tr><tr><td>Football</td><td>${TALLY(4)}</td></tr><tr><td>Volleyball</td><td>${TALLY(8)}</td></tr>
      <tr><td>Tennis</td><td>${TALLY(3)}</td></tr><tr><td>Hockey</td><td>${TALLY(9)}</td></tr></table>`
  },
  cal: {
    title: 'Comprehension-1', dir: 'Directions (Questions 124–127): Look at the given calender and answer the following questions. The following calender shows the month of July 20XX.',
    html: (() => {
      let d = ['', '', '', 1, 2, 3, 4], rows = [d];
      for (let s = 5; s <= 31; s += 7) rows.push([0, 1, 2, 3, 4, 5, 6].map(k => s + k <= 31 ? s + k : ''));
      return `<table class="dt cal"><tr><th colspan="7">July 20XX</th></tr><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thur</th><th>Fri</th><th>Sat</th></tr>` +
        rows.map(r => '<tr>' + r.map(c => `<td>${c}</td>`).join('') + '</tr>').join('') + '</table>';
    })()
  },
  teeth: {
    title: 'Comprehension-3', dir: 'Directions (Questions 132–135): Read the Passage and answer the questions that follow:',
    html: `<div class="passage"><img src="img/teeth.jpg" alt="teeth" class="float">Teeth are the hard white structures in the mouth which help us in eating food. They are of different shapes and sizes. There are four types of teeth in our mouth: incisors, canines, premolars and molars. Incisors are chisel-shaped teeth used for cutting and chopping the food. Canines are sharp-pointed teeth in each side of jaw to tear the food. Premolars are broad and grooved teeth which help in cracking the food. Molars are wider and stronger than premolars which grind the food. Teeth work closely with our tongue. Tongue helps us to taste the food and swallow it.</div>`
  },
  brain: {
    title: 'Comprehension-4', dir: 'Directions (Questions 136–139): Read the passage and answer the questions that follow:',
    html: `<div class="passage"><p>The brain is the most delicate organ of the human body. It is the control centre of the entire body. Every action which is done by the body is initiated by the brain. The brain is organized into three main parts: the cerebrum, the cerebellum and the brain stem.</p>
      <p>The cerebrum is the largest part of the brain. It is made up of ridges and furrows. It controls the functions of sense organs.</p>
      <p>The cerebellum is the second largest part of the brain. It controls the actions of muscles and makes them work together in coordination.</p>
      <p>The brain stem connects the cerebrum to the spinal cord. It controls breathing, circulation and other body processes.</p>
      <p>The spinal cord controls the reflex actions, for example, if we touch a hot iron, we remove our hand immediately.</p></div>`
  },
  ws1: {
    title: 'School Worksheet – Data Handling', dir: 'Directions: The following graph shows the number of students and their favourite sports activity.',
    html: barChart('Bar Graph', 'Number of Students', 'Sport', [['Cricket', 15], ['Badminton', 25], ['Chess', 10], ['Foot Ball', 15]], 30, 5, ['#9aa3ad'])
  },
  ws2: {
    title: 'School Worksheet – Data Handling', dir: 'Directions : The following graph shows the number of students and their favourite colours.',
    html: barChart('', 'Number of Students', 'Colours', [['Red', 50], ['Yellow', 20], ['Blue', 25], ['Orange', 30], ['Green', 10], ['Black', 40]], 50, 10, ['#e53935', '#fdd835', '#1e88e5', '#fb8c00', '#43a047', '#333'])
  }
};

const F = (n, ans, why) => ({ n: String(n), ctx: n === 26 ? 'ser' : 'ana', sec: n === 26 ? 'Series' : 'Analogy', qimg: `img/q${n}.jpg`, opts: 'abcd'.split('').map(c => `img:img/q${n}${c}.jpg`), ans, why });
const Q = (n, sec, ctx, q, opts, ans, why, extra = {}) => ({ n: String(n), sec, ctx, q, opts, ans, why, ...extra });

const QUESTIONS = [
  F(1, 1, 'The dots move to the empty triangles (the pattern turns one step). So the shaded parts move to the white parts.'),
  F(2, 1, 'Hexagon (6 sides) → shape with 5 sides. So Pentagon (5 sides) → shape with 4 sides: the diamond.'),
  F(3, 0, 'The arrow turns upside down. So the heart also turns upside down.'),
  Q(4, 'Analogy', 'ana', 'q : d : : c : ______', ['ε', 'c', 's', 'ɔ'], 3, 'Turn "q" upside down and you get "d". Turn "c" upside down and you get "ɔ".'),
  F(5, 3, 'Each sign moves one corner and the arrow flips. So + moves to the bottom-right corner and ▼ becomes ▲ in the top-right corner.'),
  F(6, 1, 'The big outside shape and the small inside shape swap places. So the house becomes big with a small square inside.'),
  F(7, 1, 'Both clock hands turn a quarter turn clockwise (like the clock hands move).'),
  F(8, 1, 'The figure turns upside down, so the dot moves from below the centre to above it.'),
  F(9, 2, 'The second spiral is the mirror image of the first. The mirror image of the square spiral is (c).'),
  F(10, 2, 'A small filled copy of the inside shape is added in the middle. So a small filled diamond is added.'),
  F(11, 3, 'The flower loses one petal (6 petals → 5 petals). So the lotus also loses one petal.'),
  F(12, 0, 'Square (4 sides) → Triangle (3 sides): one side less. Hexagon (6 sides) → Pentagon (5 sides).'),
  F(13, 0, 'The circle is cut in half and both halves are flipped. Do the same to the parallelogram and you get (a).'),
  F(14, 3, 'The whole star turns one point (anticlockwise) and the smile becomes a sad face.'),
  F(15, 3, 'The symbol on top and the symbol on the right side swap places. The front stays the same.'),
  Q(16, 'Analogy', 'anaW', 'Kidneys : 2 : : Bones : ______', ['602', '506', '206', '260'], 2, 'We have 2 kidneys and 206 bones in our body.'),
  Q(17, 'Analogy', 'anaW', 'Time : Clock : : Temperature : ______', ['Thermometer', 'Celcius', 'Heat', 'Fever'], 0, 'A clock measures time. A thermometer measures temperature.'),
  Q(18, 'Analogy', 'anaW', 'Charles Babbage : Computer : : Thomas Alva Edison : ______', ['Radar', 'Bulb', 'Bicycle', 'Telephone'], 1, 'Charles Babbage made the computer. Thomas Alva Edison made the bulb.'),
  Q(19, 'Analogy', 'anaW', 'India : Hockey : : England : ______', ['Cricket', 'Tennis', 'Ping pong', 'Wrestling'], 0, 'Hockey is the national game of India. Cricket is the national game of England.'),
  Q(20, 'Analogy', 'anaW', 'Shirt : Tailor : : Shoes : ______', ['Sole', 'Polish', 'Cobbler', 'Market'], 2, 'A tailor makes shirts. A cobbler makes/mends shoes.'),
  Q(21, 'Analogy', 'anaW', 'Aeroplane : Hanger : : Ship : ______', ['Captain', 'Harbour', 'Sea', 'Crew'], 1, 'An aeroplane is parked in a hangar. A ship is parked in a harbour.'),
  Q(22, 'Analogy', 'anaW', 'Carpenter : Chair : : Author : ______', ['Article', 'Paper', 'Novel', 'Poem'], 2, 'A carpenter makes a chair. An author writes a novel.'),
  Q(23, 'Analogy', 'anaW', 'Herbivore : Zebra : : Carnivore : ______', ['Bear', 'Cow', 'Monkey', 'Wolf'], 3, 'Zebra eats only plants (herbivore). Wolf eats only meat (carnivore).'),
  Q(24, 'Analogy', 'anaW', 'Star : Sun : : Constellation : ______', ['Milky way', 'Solar system', 'Ursa major', 'Aryabhatta'], 2, 'The Sun is a star. Ursa Major is a constellation.'),
  Q(25, 'Analogy', 'anaW', 'Taj Mahal : Marble : : Charminar : ______', ['Granite', 'Gravel', 'Hyderabad', 'Architecture'], 0, 'Taj Mahal is made of marble. Charminar is made of granite.'),
  F(26, 2, 'The nose flips every time (∨, ∩, ∨ …) and the face goes sad, happy, sad … So next is the ∩ nose with a happy smile.'),

  Q(70, 'Science', 'sci', 'Tick the wrong statement.', ['The Sun is a star.', 'The Sun gives us heat and light.', 'The Sun is the nearest star to our earth.', 'The temperature of the Sun is very low.'], 3, 'The Sun is extremely HOT, so "very low temperature" is wrong.', { img: 'img/sun.jpg' }),
  Q(71, 'Science', 'sci', 'The green pigment present in the leaves is called ______.', ['leaf blade', 'main vein', 'side vein', 'chlorophyll'], 3, 'Chlorophyll gives leaves their green colour.'),
  Q(72, 'Science', 'sci', 'Cow and goat are ______', ['flesh eaters', 'insect eaters', 'plant eaters', 'all of these'], 2, 'Cows and goats eat grass and leaves — they are plant eaters.'),
  Q(73, 'Science', 'sci', 'Match the following:', ['(i)–(D), (ii)–(A), (iii)–(B), (iv)–(C)', '(i)–(A), (ii)–(B), (iii)–(C), (iv)–(D)', '(i)–(C), (ii)–(B), (iii)–(D), (iv)–(A)', '(i)–(B), (ii)–(C), (iii)–(A), (iv)–(D)'], 0,
    'Skin helps us feel (D), hands help us hold (A), legs help us walk (B), tongue helps us taste (C).',
    { match: { left: ['img/q73i.jpg', 'img/q73ii.jpg', 'img/q73iii.jpg', 'img/q73iv.jpg'], right: ['help us in grasping and holding things.', 'help us to walk, run and stand.', 'helps us to taste our food.', 'helps us to feel.'] } }),
  Q(74, 'Science', 'sci', 'All man-made things are ______ things.', ['living', 'non-living', 'natural', 'permanent'], 1, 'Things made by people (chair, car, pen) are non-living.'),
  Q(75, 'Science', 'sci', 'Tick the wrong statement.', ['Arms and legs are known as our limbs.', 'Our body is like a machine.', 'Bones give shape and support to our body.', 'We have four sense organs.'], 3, 'We have FIVE sense organs: eyes, ears, nose, tongue and skin.'),
  Q(76, 'Science', 'sci', 'We use water for ______ .', ['cooking', 'bathing', 'drinking', 'All of these'], 3, 'We use water for cooking, bathing and drinking — all of these!'),
  Q(77, 'Science', 'sci', 'We must take bath every day because ______ .', ['there is no other work to do.', 'dust and sweat make our body dirty.', 'there is plenty of water.', 'All of the above.'], 1, 'Dust and sweat make our body dirty, so we bathe daily.'),
  Q(78, 'Science', 'sci', 'This makes the soil rich and fertile. It is ______ .', ['heat', 'humus', 'pesticide', 'weedicide'], 1, 'Humus (made from rotten leaves and plants) makes soil rich.'),
  Q(79, 'Science', 'sci', 'Match the following people with their work place.', ['(i)–(C), (ii)–(A), (iii)–(D), (iv)–(B)', '(i)–(A), (ii)–(D), (iii)–(C), (iv)–(B)', '(i)–(B), (ii)–(C), (iii)–(D), (iv)–(A)', '(i)–(A), (ii)–(B), (iii)–(C), (iv)–(D)'], 2,
    'Doctor → Hospital (B), Policeman → Police Station (C), Gardener → Garden (D), Teacher → School (A).',
    { match: { left: ['img/q79i.jpg', 'img/q79ii.jpg', 'img/q79iii.jpg', 'img/q79iv.jpg'], right: ['School', 'Hospital', 'Police Station', 'Garden'] } }),
  Q(80, 'Science', 'sci', 'The movement of water from water bodies on the earth into the atmosphere and back to the earth is called ______ .', ['water cycle', 'water vapour', 'rain', 'ocean waves'], 0, 'Water going up and coming back down again and again is the water cycle.'),
  Q(81, 'Science', 'sci', 'Jute is a ______ .', ['man-made fibre', 'animal fibre', 'plant fibre', 'none of these'], 2, 'Jute comes from the jute plant — it is a plant fibre.'),
  Q(82, 'Science', 'sci', 'Fox, lion, tiger and wolf can be grouped under ______ .', ['carnivores', 'herbivores', 'omnivores', 'None of these'], 0, 'They all eat meat — carnivores.'),
  Q(83, 'Science', 'sci', 'Which of the following prepares its own food?', ['Mushroom', 'Plants', 'Animals', 'Human Beings'], 1, 'Green plants make their own food using sunlight.'),
  Q(84, 'Science', 'sci', 'The process by which water changes into water vapour is ______ .', ['freezing', 'melting', 'condensation', 'evaporation'], 3, 'Water → water vapour is called evaporation.'),
  Q(85, 'Science', 'sci', 'I have planted some plants, whose leaves are eatable. Which plants have I planted?', ['Turnip and Beetroot', 'Onion and Potato', 'Tomato and Peas', 'Cabbage and Spinach'], 3, 'We eat the leaves of cabbage and spinach.'),
  Q(86, 'Science', 'sci', 'Which organ of the body is shown in the diagram?', ['Heart', 'Lungs', 'Chest', 'Stomach'], 1, 'The picture shows the lungs — they help us breathe.', { img: 'img/lungs.jpg' }),
  Q(87, 'Science', 'sci', 'While driving, my father saw this traffic sign on road. He should ______ .', ['take a left turn', 'park his car', 'take a right turn', 'slow down the speed'], 3, 'This sign means a speed breaker is ahead — slow down!', { img: 'img/sign.jpg' }),
  Q(88, 'Science', 'sci', 'Which of the following keeps our teeth and bones strong?', ['Butter', 'A glass of milk', 'Burger', 'Salad of raw vegetables'], 1, 'Milk has calcium which makes teeth and bones strong.'),
  Q(89, 'Science', 'sci', 'Ajay blows air in a balloon and it expands. This shows ______ .', ['air has colour', 'balloon occupies space', 'air is light weighted', 'air occupies space'], 3, 'The balloon gets bigger because air takes up space.', { img: 'img/balloon.jpg' }),
  Q(90, 'Science', 'sci', 'This type of soil is good for cultivation of rice crops. It is also used by a potter to make pots. This is ______ .', ['clayey soil', 'sandy soil', 'loamy soil', 'None of these'], 0, 'Clayey soil holds water (good for rice) and is sticky (good for pots).'),
  Q(91, 'Science', 'sci', 'What will occur when moon is between the Sun and the Earth?', ['Lunar Eclipse', 'Solar Eclipse', 'Phases of moon', 'Constellation'], 1, 'Moon blocks the Sun → Solar Eclipse.'),
  Q(92, 'Science', 'sci', "The time taken by Sun's rays to reach the earth is ______ .", ['1 hour', '30 minutes', '42 seconds', '8 minutes'], 3, "Sunlight takes about 8 minutes to reach the Earth."),
  Q(93, 'Science', 'sci', 'Which type of root does an onion plant have?', ['Tap root', 'Woody root', 'Fibrous root', 'Thin root'], 2, 'Onion has many thin roots coming out together — fibrous roots.'),
  Q(94, 'Science', 'sci', '______ are known as food factories of a plant.', ['Green leaves', 'Roots', 'Stem', 'Flower'], 0, 'Green leaves make food for the plant.'),
  Q(95, 'Science', 'sci', 'Water droplets that are too heavy to float make', ['Fog', 'Clouds', 'Rain', 'Dew'], 2, 'Heavy water drops fall down as rain.'),
  Q(96, 'Science', 'sci', 'Which of the following does not take the shape of the container it is in?', ['Pencil', 'Oil', 'Water', 'Milk'], 0, 'A pencil is a solid — it keeps its own shape. Liquids take the shape of the container.'),
  Q(97, 'Science', 'sci', 'The bird that can never fly', ['Duck', 'Crow', 'Bulbul', 'Kiwi'], 3, 'Kiwi is a bird that cannot fly.'),
  Q(98, 'Science', 'sci', 'Ducks have', ['Short and broad beaks', 'Broad and flat beaks', 'Slender beaks', 'Pointed beaks'], 1, 'Ducks have broad and flat beaks to find food in water.'),
  Q(99, 'Science', 'sci', 'In which Earth layer do most grasses grow? [Olympiad]', ['Solid rock', 'Subsoil', 'Topsoil', 'Bedrock'], 2, 'Grass grows in the topsoil — the top layer of soil.'),
  Q(100, 'Science', 'sci', 'Which of these do people build to stop flooding? [Olympiad]', ['Sidewalks', 'Dams', 'Bridges', 'Streets'], 1, 'Dams hold back river water and stop floods.'),
  Q(101, 'Science', 'sci', 'The bird that lays its eggs in the nest of a crow is [Olympiad]', ['Cuckoo', 'Parrot', 'Wood pecker', 'Pigeon'], 0, 'The cuckoo lays its eggs in a crow\'s nest.'),
  Q(102, 'Science', 'sci', 'Which of the following will not dissolve in water? [Olympiad]', ['Salt', 'Sugar', 'Sand', 'Baking soda'], 2, 'Sand does not dissolve in water.'),
  Q(103, 'Science', 'sci', 'Soil helps trees because soil', ['makes food for the trees', 'moves the tree seeds to new places', 'gives nutrients to the trees', 'turns the roots into new trees'], 2, 'Soil gives nutrients (food materials) to trees.'),
  Q(104, 'Science', 'sci', 'What can be the reason that a taxi driver has to be more careful when driving on a rainy day than driving on a hot summer day? [Olympiad]',
    ['Gravitational force between taxi and road is higher on a hot summer day', 'Frictional force between taxi and road is lower on a rainy day', 'Gravitational force between taxi and road is lower on a rainy day', 'Frictional force between taxi and road is lower on a hot summer day'], 1, 'Wet roads are slippery — less friction on a rainy day.'),
  Q(105, 'Science', 'sci', "Radha's grandmother got seriously ill and needs to be taken to hospital immediately. In such a situation, which of the following modes should she the most preferably use in order to communicate to her father who was in his office? [Olympiad]", ['E-mail', 'Letter', 'Radio broadcast', 'Phone call'], 3, 'In an emergency, a phone call is the fastest.'),
  Q(106, 'Science', 'sci', 'Which of the following types of clouds bring us rain?', ['Cirrus', 'Cumulus', 'Nimbus', 'Stratus'], 2, 'Nimbus clouds are dark rain clouds.'),

  Q(107, 'Data Handling', 'cars', 'Which car covered the maximum distance?', ['Car A', 'Car B', 'Car C', 'Car D'], 1, 'Car B has the tallest bar (100 km).'),
  Q(108, 'Data Handling', 'cars', 'Car C covered ______ more than Car D.', ['60 km', '50 km', '40 km', '30 km'], 1, 'Car C = 75 km, Car D = 25 km. 75 − 25 = 50 km.'),
  Q(109, 'Data Handling', 'cars', 'Car A covered ______ less than Car B.', ['30 km', '40 km', '50 km', '60 km'], 2, 'Car B = 100 km, Car A = 50 km. 100 − 50 = 50 km.'),
  Q(110, 'Data Handling', 'books', 'The total number of books with five students is ______ .', ['115', '100', '20', '25'], 1, 'Total 📕 = 2+4+3+5+6 = 20. 20 × 5 = 100 books.'),
  Q(111, 'Data Handling', 'books', 'The maximum number of books is with ______ .', ['Shobhit', 'Rohit', 'Raman', 'Mohit'], 2, 'Raman has the most 📕 (6 × 5 = 30 books).'),
  Q(112, 'Data Handling', 'books', 'The student who has 25 books with him, is ______ .', ['Sarthak', 'Raman', 'Mohit', 'Shobhit'], 0, '25 books = 5 📕 → Sarthak.'),
  Q(113, 'Data Handling', 'books', 'The number of books, Rohit has is ______ .', ['5', '10', '15', '20'], 1, 'Rohit has 2 📕 → 2 × 5 = 10 books.'),
  Q(114, 'Data Handling', 'zoo', 'How many kinds of animals were there in the zoo?', ['5', '6', '4', '7'], 0, 'Lion, Tiger, Monkey, Elephant, Bear = 5 kinds.'),
  Q(115, 'Data Handling', 'zoo', 'Which animal was maximum in number?', ['Elephant', 'Bear', 'Lion', 'Monkey'], 3, 'Monkeys = 10, the biggest number.'),
  Q(116, 'Data Handling', 'zoo', 'What was the total number of animals in the zoo?', ['32', '30', '34', '27'], 0, '6 + 5 + 10 + 7 + 4 = 32.'),
  Q(117, 'Data Handling', 'food', 'If 5 girls like rice, then how many boys like rice?', ['5', '10', '15', 'None'], 0, 'Rice = 2 😊 = 10 children. 10 − 5 girls = 5 boys.'),
  Q(118, 'Data Handling', 'food', 'If 15 boys liked oats, then how many girls liked oats?', ['10', '15', '5', '20'], 0, 'Oats = 5 😊 = 25 children. 25 − 15 boys = 10 girls.'),
  Q(119, 'Data Handling', 'food', 'How many more children like green-leafy vegetables than eggs?', ['10', '5', '15', '8'], 1, 'Green-leafy = 4 😊 = 20, Eggs = 3 😊 = 15. 20 − 15 = 5.'),
  Q(120, 'Data Handling', 'tally', 'Football is liked by ______ students.', ['5', '4', '6', '3'], 1, 'Football has 4 tally marks ||||.'),
  Q(121, 'Data Handling', 'tally', 'Most of the students like the game of ______ .', ['cricket', 'hockey', 'football', 'tennis'], 1, 'Hockey = 9, the biggest number.'),
  Q(122, 'Data Handling', 'tally', 'The least liked game is ______ .', ['tennis', 'football', 'volleyball', 'cricket'], 0, 'Tennis = 3, the smallest number.'),
  Q(123, 'Data Handling', 'tally', 'The total number of students who are asked about their favourite game is ______ .', ['27', '25', '30', '31'], 3, '7 + 4 + 8 + 3 + 9 = 31.'),

  Q(124, 'Comprehension', 'cal', 'Aditya has music classes on Monday and Friday. How many music lessons will he have during the month?', ['6', '8', '9', '10'], 2, 'Mondays: 6, 13, 20, 27 (4). Fridays: 3, 10, 17, 24, 31 (5). 4 + 5 = 9.'),
  Q(125, 'Comprehension', 'cal', 'Raj is going out of town for a week. He will be leaving on July 4. He will come back on', ['July 11', 'July 10', 'July 13', 'July 15'], 0, 'A week = 7 days. July 4 + 7 = July 11.'),
  Q(126, 'Comprehension', 'cal', 'The fourth Monday of the month falls on', ['July 29', 'July 27', 'July 21', 'July 20'], 1, 'Mondays: 6, 13, 20, 27 → the 4th one is July 27.'),
  Q(127, 'Comprehension', 'cal', 'Sushant was not well. He missed the school from July 6 to July 10. For how many days was he marked absent in the school?', ['6 days', '7 days', '4 days', '5 days'], 3, 'July 6, 7, 8, 9, 10 = 5 days (Monday to Friday).'),
  Q(132, 'Comprehension', 'teeth', 'What do your molar teeth do?', ['Tear the food', 'Cut and chop the food', 'Taste the food', 'Grind the food'], 3, 'The passage says: molars grind the food.'),
  Q(133, 'Comprehension', 'teeth', 'Why are some of the teeth chisel-shaped?', ['They look beautiful.', 'They occupy less space.', 'They chop and cut the food.', 'They are strong and trim.'], 2, 'Incisors are chisel-shaped for cutting and chopping food.'),
  Q(134, 'Comprehension', 'teeth', 'Why do teeth have different shapes?', ['To look beautiful.', 'To be arranged properly.', 'To help us to eat different types of food.', 'None of the above'], 2, 'Each shape does a different job — cut, tear, crack, grind.'),
  Q(135, 'Comprehension', 'teeth', 'Which of the following is not a function of tongue?', ['It pushes food to the front of the mouth.', 'It helps people to talk.', 'It pushes chewed food to the back of the mouth.', 'It helps us to taste the food.'], 0, 'The tongue pushes food to the BACK (to swallow), not to the front.'),
  Q(136, 'Comprehension', 'brain', 'Which part of the brain controls circulation?', ['The cerebrum', 'The cerebellum', 'The brain stem', 'The spinal cord'], 2, 'The passage says: the brain stem controls breathing, circulation…'),
  Q(137, 'Comprehension', 'brain', 'What can be concluded about the spinal cord?', ['It connects brain to other body parts.', 'It is the largest organ of the brain.', 'It controls breathing and circulation.', 'It is connected to the cerebrum.'], 0, 'The spinal cord carries messages between the brain and the body.'),
  Q(138, 'Comprehension', 'brain', 'Which of the following is true?', ['Cerebellum is made up of ridges and furrows.', 'Cerebrum controls the muscular actions.', 'Cerebrum is the largest part of the brain.', 'None of these'], 2, 'The passage says: the cerebrum is the largest part of the brain.'),
  Q(139, 'Comprehension', 'brain', 'Which of the following is a reflex action?', ['Breathing', 'Swimming', 'Talking', 'Sneezing'], 3, 'Sneezing happens by itself, very fast — a reflex action.'),

  Q('W1', 'Worksheet', 'ws1', 'Which is the most popular sport and how many children like it?', ['Cricket, 15', 'Chess, 10', 'Badminton, 25', 'Football, 15'], 2, 'Badminton has the tallest bar: 25.'),
  Q('W2', 'Worksheet', 'ws1', 'Which sports is liked by 10 students?', ['Chess', 'Football', 'Cricket', 'Badminton'], 0, 'The Chess bar reaches 10.'),
  Q('W3', 'Worksheet', 'ws1', 'Cricket and ______ is liked by equal number of students?', ['Badminton', 'Chess', 'Football', 'Hockey'], 2, 'Cricket = 15 and Football = 15.'),
  Q('W4', 'Worksheet', 'ws1', 'Difference between number of students who like badminton and chess is ?', ['15', '10', '5', '25'], 0, '25 − 10 = 15.'),
  Q('W5', 'Worksheet', 'ws1', 'How many students like Football ?', ['5', '20', '25', '15'], 3, 'The Football bar reaches 15.'),
  Q('W6', 'Worksheet', 'ws2', 'How many students like red ?', ['60', '50', '45', '70'], 1, 'Red bar = 50.'),
  Q('W7', 'Worksheet', 'ws2', 'How many students like yellow and blue ?', ['55', '50', '45', '40'], 2, 'Yellow 20 + Blue 25 = 45.'),
  Q('W8', 'Worksheet', 'ws2', 'Which colour is liked by least number of students ?', ['Green', 'Black', 'Red', 'Orange'], 0, 'Green = 10, the smallest bar.'),
  Q('W9', 'Worksheet', 'ws2', 'Total number of students in the class are ?', ['175', '150', '165', '180'], 0, '50 + 20 + 25 + 30 + 10 + 40 = 175.'),
  Q('W10', 'Worksheet', 'ws2', 'How many students like Green, Orange, and Black ?', ['60', '80', '90', '70'], 1, '10 + 30 + 40 = 80.'),
];
QUESTIONS.forEach((q, i) => q.id = i);
const SECTIONS = ['Analogy', 'Series', 'Science', 'Data Handling', 'Comprehension', 'Worksheet'];
