class Student {
  constructor(name, beltLevel) {
    this.name = name;
    this.beltLevel = beltLevel;
    this.moves = [];
  }
}

var students = [];

const addStudent = (name, beltLevel) => {
  students.push({ name: name, beltLevel: beltLevel, moves: [] });
};

const trainMove = (name, move) => {
  const student = students.find((s) => s.name === name);
  student.moves.push(move);
};

const winMatch = (name) => {
  const student = students.find((s) => s.name === name);
  student.victories++;
};

const getStudents = () => {
  return students;
};

module.exports = { addStudent, trainMove, winMatch, getStudents };
