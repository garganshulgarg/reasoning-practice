// Term 3 question bank — Questions 27–67 from the reasoning book (pages 56–63).
// (Term 2 questions are saved in archive/term-2/.)
// ans = index of correct option (0=a, 1=b, 2=c, 3=d). Options starting with "img:" are pictures.

const CTX = {
  ser: { title: 'Series and Pattern Completion', dir: 'Directions (Questions 26–40): Identify which figure will complete the given series/pattern.' },
  mir: { title: 'Mirror Images', dir: 'Directions (Questions 41–50): Tick (✓) the correct mirror image of the given figure. The mirror is the slanted lines on the right.' },
  emb: { title: 'Embedded Figures', dir: 'Directions (Questions 51–60): Select the option figure in which the given figure is exactly embedded (hidden inside).' },
  rid: { title: 'Riddle Time', dir: 'Directions (Questions 61–67): Read the riddle and identify who or what it is.' }
};

// Figure question: picture of the question + 4 picture options.
const F = (n, sec, ctx, ans, why, o = {}) => {
  const ext = o.ext || 'jpg';
  return {
    n: String(n), sec, ctx, qimg: `img/q${n}.${ext}`, blank: !!o.blank,
    opts: 'abcd'.split('').map(c => `img:img/q${n}${c}.${ext}`), ans, why
  };
};
const SER = (n, ans, why, ext) => F(n, 'Series', 'ser', ans, why, { blank: true, ext });
const MIR = (n, ans, why) => F(n, 'Mirror Images', 'mir', ans, why);
const EMB = (n, ans, why) => F(n, 'Embedded Figures', 'emb', ans, why, { ext: 'svg' });
const RID = (n, q, opts, ans, why) => ({ n: String(n), sec: 'Riddles', ctx: 'rid', q, opts, ans, why });

const QUESTIONS = [
  // ---- Series and Pattern Completion (27–40) ----
  SER(27, 2, 'Two corners of the star are shaded. Every turn both shaded corners move one step clockwise: top & lower-right → upper-right & bottom → lower-right & lower-left → next: bottom & upper-left.', 'svg'),
  SER(28, 0, 'The + goes in the left lobe, then the right lobe, then the left lobe again. So next it goes in the right lobe.'),
  SER(29, 1, 'The long hand moves 12 → 3 → 6 → 9 and the short hand moves 3 → 6 → 9 → 12. So next: long hand at 9 and short hand at 12.'),
  SER(30, 3, 'The arrow turns a quarter turn clockwise each time: → then ↓ then ← … so next is ↑.', 'svg'),
  SER(31, 2, 'The arrow flips ↗, ↖, ↗ … so next is ↖. The small circle moves clockwise: top, right, bottom … so next it is on the left.', 'svg'),
  SER(32, 3, 'The faces take turns: upright triangle with round ears, upside-down triangle with square ears, upright with round ears … so next is the upside-down triangle with square ears.'),
  SER(33, 0, 'The V-shape turns a quarter turn clockwise each time: ‹ then ∧ then › … so next is ∨ (circles at the top).'),
  SER(34, 1, 'The corner mark moves clockwise (top-left → top-right → bottom-right → next bottom-left) and the circle also moves clockwise (bottom-right → bottom-left → top-left → next top-right).'),
  SER(35, 3, 'The small square moves clockwise round the corners (top-right → bottom-right → bottom-left → next top-left) and the stick-with-circle turns 45° clockwise each time.'),
  SER(36, 2, 'The + moves one corner anticlockwise each time (upper-right → upper-left → next lower-left) and the small circle also moves anticlockwise (lower-left → lower-right → next upper-right).'),
  SER(37, 2, 'The dot jumps 2 triangles clockwise each time and the ″ mark moves 1 triangle anticlockwise each time. So next: dot in the upper-left triangle, ″ in the bottom triangle.'),
  SER(38, 1, 'The four boxes match each other around the centre circle. The missing box needs the small arc in its top-left corner (next to the centre), with the thick double line going "/" and the leaf shape along "\\" — that is (b).'),
  SER(39, 2, 'Each box has a big curved line in its outer corner, and the centre shape continues from box to box. The missing box needs the big curve in the bottom-right corner and a small piece of the centre shape (tiny squares + a slanting line) in its top-left corner.'),
  SER(40, 2, 'The other three outer corners each have a triangle with 2 small circles, so the missing box also has a triangle with 2 small circles in the bottom-right corner. The circle arcs and rectangles of the centre carry on in its top-left.'),

  // ---- Mirror Images (41–50) ----
  MIR(41, 2, 'A mirror swaps left and right. The ">" shape that points right becomes "<" pointing left.'),
  MIR(42, 3, 'Left and right swap: the arrow now points left, the stripes move to the right side and the pointed end of the box is on the left.'),
  MIR(43, 1, 'In a mirror image, left and right swap: the letters turn back-to-front and their order reverses, and the wavy flag flips too.'),
  MIR(44, 1, 'Left and right swap, so "SR" turns back-to-front and the curved side of the box moves to the left.'),
  MIR(45, 2, 'Left and right swap: the dot box moves to the top-left, the double-line box to the top-right, the waves to the bottom-left and the zigzag to the bottom-right.'),
  MIR(46, 0, 'Left and right swap: the zigzag edge moves to the left, the arrow head now points down on the left side and the dark end is on the right.'),
  MIR(47, 0, 'Left and right swap: "GS" turns back-to-front (the letters reverse order and each one flips) and the little tail moves from the top-right to the top-left.'),
  MIR(48, 0, 'Left and right swap: the dark eye is now on the left, the hollow eye on the right and the tooth moves to the left side. The hat stays on top.'),
  MIR(49, 2, 'Left and right swap: the leaf that leaned to the right now leans to the left. Top stays on top.'),
  MIR(50, 0, 'Left and right swap: the cut corner moves from the top-right to the top-left, and the numbers turn back-to-front with their order reversed.'),

  // ---- Embedded Figures (51–60) ----
  EMB(51, 0, 'A square with one diagonal hides a right-angled triangle exactly like the given one (two sides of the square + the diagonal).'),
  EMB(52, 0, 'The top line of the box and the line down its middle together make a "T".'),
  EMB(53, 1, 'Look at the trapezoid made by the two slanting lines, the short top bar and the long bottom line.'),
  EMB(54, 0, 'The line from the top to the middle, the two slanting lines below it and the bottom line make a line standing on a triangle — the given figure.'),
  EMB(55, 1, 'The two sloping lines meet at the top and the curved line at the bottom joins their ends — exactly the given figure.'),
  EMB(56, 3, 'The tops of the four bars make exactly the same staircase.'),
  EMB(57, 3, 'Only (d) has a triangle with a straight line through its middle that carries on down to a dot.'),
  EMB(58, 1, 'The top line, the bottom line and the two crossing slanting lines make the hourglass shape.'),
  EMB(59, 2, 'The left side, the slanting line and the right side together make the letter N.'),
  EMB(60, 2, 'The flat triangle at the bottom (the bottom line plus the lower halves of the two crossing lines) matches the given flat triangle.'),

  // ---- Riddles (61–67) ----
  RID(61, "I start with the letter 'P'.\nAnd end with the letter 'E'.\nI have thousands of LETTERS in me.\nFind me!", ['☀️ Sun', '🏤 Post office', '🪡 Needle', '🍎 Apple'], 1, 'Post Office starts with P and ends with E, and thousands of letters pass through it.'),
  RID(62, "I am a vegetable.\nI am generally available.\nIf you try to take my layers off,\nYou will cry, but I won't.\nWho am I?", ['🪡 Needle', '🧽 Sponge', '🧅 Onion', '🍎 Apple'], 2, 'An onion has many layers — peeling it makes you cry.'),
  RID(63, "I have an eye but cannot see.\nFor sewing the clothes, you use me.\nWho am I?", ['🧅 Onion', '☀️ Sun', '🪡 Needle', '🏤 Post office'], 2, 'A needle has an eye (the hole for the thread) and is used for sewing.'),
  RID(64, "I come from the east and go to the west.\nEvery day I do this without taking rest.\nWhat is my name, can you guess?", ['🍅 Tomato', '☀️ Sun', '🍎 Apple', '🪡 Needle'], 1, 'The Sun rises in the east and sets in the west every day.'),
  RID(65, "I am red, green or yellow in colour,\nI am eaten to keep away the doctor.\nWho am I?", ['🧽 Sponge', '🍅 Tomato', '🏤 Post office', '🍎 Apple'], 3, '"An apple a day keeps the doctor away!" Apples are red, green or yellow.'),
  RID(66, "I have many tiny holes in me.\nYet I can hold water in me.\nWho am I?", ['🧽 Sponge', '🪡 Needle', '🧅 Onion', '☀️ Sun'], 0, 'A sponge is full of tiny holes that soak up and hold water.'),
  RID(67, "I am a fruit but considered a vegetable,\nTo keep your skin healthy, I am able.\nI am round and red in colour,\nI am used in salad and as a flavour.\nWho am I?", ['🍎 Apple', '🧅 Onion', '🍅 Tomato', '🧽 Sponge'], 2, 'A tomato is really a fruit, but we use it like a vegetable — in salads and for flavour.')
];
QUESTIONS.forEach((q, i) => q.id = i);
const SECTIONS = ['Series', 'Mirror Images', 'Embedded Figures', 'Riddles'];
