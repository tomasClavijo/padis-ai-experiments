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
  if (!name) {
    throw new Error("El nombre no puede ser vacío.");
  }
  const student = new Student(name, beltLevel, Date.now());
  students.push(student);
};

const trainMove = (name, move) => {
  const student = students.find((s) => s.name === name);
  if (student) {
    student.moves.push({ move: move, date: new Date() });
  }
};

const winMatch = (name) => {
  const student = students.find((s) => s.name === name);
  if (student) {
    student.victories++;
  }
};

const getStudents = () => {
  return students;
};

module.exports = { Student, addStudent, trainMove, winMatch, getStudents };
