const { addStudent, trainMove, winMatch, getStudents } = require("./karate");

addStudent("Ryu", "black");
addStudent("Ken", "blue");
addStudent("", "super-saiyan");

trainMove("Ryu", "Hadouken");
trainMove("Ryu", "Shoryuken");

winMatch("Ryu");
winMatch("Ryu");
winMatch("Ken");

console.log(getStudents());

const lista = getStudents();
lista.push({ name: "Intruso" });
console.log("Después de agregar intruso:", getStudents());
