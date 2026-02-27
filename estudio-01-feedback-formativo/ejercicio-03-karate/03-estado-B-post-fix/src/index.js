const { addStudent, trainMove, winMatch, getStudents } = require("./karate");

addStudent("Ryu", "black");
addStudent("Ken", "blue");
addStudent("Sakura", "green");

trainMove("Ryu", "Hadouken");
trainMove("Ryu", "Shoryuken");
trainMove("Ken", "Tatsumaki");

winMatch("Ryu");
winMatch("Ryu");
winMatch("Ken");

trainMove("Fantasma", "Golpe invisible");
winMatch("Fantasma");

console.log(JSON.stringify(getStudents(), null, 2));
