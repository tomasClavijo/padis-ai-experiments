const VALID_BELT_LEVELS = [
  "white",
  "yellow",
  "orange",
  "green",
  "blue",
  "brown",
  "black",
];

class Student {
  constructor(name, beltLevel, joinedTimestamp = Date.now()) {
    this.name = name;
    this.beltLevel = beltLevel;
    this.moves = [];
    this.victories = 0;
    this.joinedDate = new Date(joinedTimestamp);
  }
}

let students = [];

const addStudent = (name, beltLevel) => {
  if (!name || name.trim() === "") {
    throw new Error("El nombre no puede ser vacío.");
  }
  if (!VALID_BELT_LEVELS.includes(beltLevel)) {
    throw new Error(
      `Nivel de cinturón inválido: "${beltLevel}". Debe ser uno de: ${VALID_BELT_LEVELS.join(", ")}.`
    );
  }
  const student = new Student(name.trim(), beltLevel, Date.now());
  students.push(student);
};

const trainMove = (name, move) => {
  if (!move || move.trim() === "") {
    throw new Error("El movimiento no puede ser vacío.");
  }
  const student = students.find((s) => s.name === name);
  if (!student) {
    throw new Error(`Estudiante "${name}" no encontrado.`);
  }
  student.moves.push({ move: move.trim(), date: new Date() });
};

const winMatch = (name) => {
  const student = students.find((s) => s.name === name);
  if (!student) {
    throw new Error(`Estudiante "${name}" no encontrado.`);
  }
  student.victories++;
};

const getStudents = () => {
  return [...students];
};

module.exports = { Student, addStudent, trainMove, winMatch, getStudents };
