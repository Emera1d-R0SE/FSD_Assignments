const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

let nextId = 4;
const students = [
  { id: 1, name: "Aarav Sharma", age: 20, course: "Computer Science" },
  { id: 2, name: "Maya Patel", age: 21, course: "Mathematics" },
  { id: 3, name: "Noah Wilson", age: 19, course: "Physics" },
];

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

function parseStudentId(value) {
  if (!/^[1-9]\d*$/.test(value)) {
    return null;
  }
  const id = Number(value);
  return Number.isSafeInteger(id) ? id : null;
}

function validateStudent(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "Request body must be a JSON object.";
  }
  if (typeof body.name !== "string" || body.name.trim() === "") {
    return "Name is required and must be a non-empty string.";
  }
  if (!Number.isInteger(body.age) || body.age < 1) {
    return "Age is required and must be a positive integer.";
  }
  if (typeof body.course !== "string" || body.course.trim() === "") {
    return "Course is required and must be a non-empty string.";
  }
  return null;
}

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management REST API",
    endpoints: [
      "GET /api/students",
      "GET /api/students/:id",
      "POST /api/students",
      "PUT /api/students/:id",
      "DELETE /api/students/:id",
    ],
  });
});

app.get("/api/students", (req, res) => {
  res.status(200).json({ success: true, data: students });
});

app.get("/api/students/:id", (req, res) => {
  const id = parseStudentId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, error: "Student ID must be a positive integer." });
  }

  const student = students.find((item) => item.id === id);
  if (!student) {
    return res.status(404).json({ success: false, error: "Student not found." });
  }
  return res.status(200).json({ success: true, data: student });
});

app.post("/api/students", (req, res) => {
  const validationError = validateStudent(req.body);
  if (validationError) {
    return res.status(400).json({ success: false, error: validationError });
  }

  const student = {
    id: nextId++,
    name: req.body.name.trim(),
    age: req.body.age,
    course: req.body.course.trim(),
  };
  students.push(student);
  return res.status(201).json({ success: true, data: student });
});

app.put("/api/students/:id", (req, res) => {
  const id = parseStudentId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, error: "Student ID must be a positive integer." });
  }

  const student = students.find((item) => item.id === id);
  if (!student) {
    return res.status(404).json({ success: false, error: "Student not found." });
  }

  const validationError = validateStudent(req.body);
  if (validationError) {
    return res.status(400).json({ success: false, error: validationError });
  }

  student.name = req.body.name.trim();
  student.age = req.body.age;
  student.course = req.body.course.trim();
  return res.status(200).json({ success: true, data: student });
});

app.delete("/api/students/:id", (req, res) => {
  const id = parseStudentId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, error: "Student ID must be a positive integer." });
  }

  const studentIndex = students.findIndex((item) => item.id === id);
  if (studentIndex === -1) {
    return res.status(404).json({ success: false, error: "Student not found." });
  }

  const [deletedStudent] = students.splice(studentIndex, 1);
  return res.status(200).json({ success: true, data: deletedStudent });
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found." });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ success: false, error: "Request body contains invalid JSON." });
  }
  console.error(err);
  return res.status(500).json({ success: false, error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Student Management API is running at http://localhost:${PORT}`);
});
