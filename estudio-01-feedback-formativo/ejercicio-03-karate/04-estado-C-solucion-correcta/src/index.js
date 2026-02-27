const { addStudent, trainMove, winMatch, getStudents } = require("./karate");

addStudent("Ryu", "black");
addStudent("Ken", "blue");
addStudent("Sakura", "green");

trainMove("Ryu", "Hadouken");
trainMove("Ryu", "Shoryuken");
trainMove("Ken", "Tatsumaki");
trainMove("Sakura", "Spinning Bird Kick");

winMatch("Ryu");
winMatch("Ryu");
winMatch("Ken");

console.log(JSON.stringify(getStudents(), null, 2));

try {
  addStudent("", "white");
} catch (e) {
  console.log(`Validación: ${e.message}`);
}

try {
  addStudent("Akuma", "super-saiyan");
} catch (e) {
  console.log(`Validación: ${e.message}`);
}

try {
  trainMove("Fantasma", "Golpe");
} catch (e) {
  console.log(`Validación: ${e.message}`);
}

try {
  winMatch("Fantasma");
} catch (e) {
  console.log(`Validación: ${e.message}`);
}
