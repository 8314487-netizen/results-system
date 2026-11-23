class Student {
  #name;
  #grade1;
  #grade2;
  #grade3;
  #attendance;

  constructor(name, grade1, grade2, grade3, attendance) {
    this.name = name;
    this.grade1 = grade1;
    this.grade2 = grade2;
    this.grade3 = grade3;
    this.attendance = attendance;
  }

  static #validate(value, label) {
    if (value === "" || value === null || value === undefined || isNaN(value)) {
      throw new Error(`${label} cannot be empty`);
    }
    const number = Number(value);
    if (number < 0 || number > 100) {
      throw new Error(`${label} must be between 0 and 100`);
    }
    return number;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (!value || value.trim() === "") {
      throw new Error("Student name is required");
    }
    this.#name = value.trim();
  }

  get grade1() {
    return this.#grade1;
  }

  set grade1(value) {
    this.#grade1 = Student.#validate(value, "Subject 1 grade");
  }

  get grade2() {
    return this.#grade2;
  }

  set grade2(value) {
    this.#grade2 = Student.#validate(value, "Subject 2 grade");
  }

  get grade3() {
    return this.#grade3;
  }

  set grade3(value) {
    this.#grade3 = Student.#validate(value, "Subject 3 grade");
  }

  get attendance() {
    return this.#attendance;
  }

  set attendance(value) {
    this.#attendance = Student.#validate(value, "Attendance");
  }

  get average() {
    return (this.#grade1 + this.#grade2 + this.#grade3) / 3;
  }
}

const studentsList = [];

const nameInput = document.getElementById("studentName");
const grade1Input = document.getElementById("grade1");
const grade2Input = document.getElementById("grade2");
const grade3Input = document.getElementById("grade3");
const attendanceInput = document.getElementById("attendance");
const addBtn = document.getElementById("addBtn");
const mercyBtn = document.getElementById("mercyBtn");
const errorBox = document.getElementById("errorBox");
const studentsBox = document.getElementById("studentsBox");
const reportBox = document.getElementById("reportBox");

addBtn.onclick = function () {
  errorBox.innerHTML = "";

  try {
    const student = new Student(
      nameInput.value,
      grade1Input.value,
      grade2Input.value,
      grade3Input.value,
      attendanceInput.value
    );

    studentsList.push(student);
    studentsBox.innerHTML += `<p class="mb-1">${student.name}</p>`;

    nameInput.value = "";
    grade1Input.value = "";
    grade2Input.value = "";
    grade3Input.value = "";
    attendanceInput.value = "";
  } catch (error) {
    errorBox.innerHTML = error.message;
  }
};
mercyBtn.onclick = function () {
  const struggling = studentsList.filter(
    (student) => student.average >= 40 && student.average <= 49
  );

  const afterMercy = struggling.map((student) => ({
    name: student.name,
    newAverage: student.average + 5,
  }));

  let overallAverage = 0;

  if (afterMercy.length > 0) {
    const total = afterMercy.reduce((sum, student) => sum + student.newAverage, 0);
    overallAverage = total / afterMercy.length;
  }

  if (afterMercy.length === 0) {
    reportBox.innerHTML = `<div class="alert alert-info">No struggling students found</div>`;
    return;
  }

  reportBox.innerHTML = `
    <div class="alert alert-success">
      <h4>Mercy Committee Final Report</h4>
      <p>Number of struggling students: ${afterMercy.length}</p>
      <p>Names: ${afterMercy.map((student) => student.name).join(", ")}</p>
      <p>Overall average after mercy: ${overallAverage.toFixed(2)}</p>
    </div>
  `;
};









