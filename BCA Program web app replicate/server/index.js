require("dotenv").config();

const cors = require("cors");
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
const Inquiry = require("./models/Inquiry");

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json({ limit: "20kb" }));

const faculty = [
  {
    name: "Dr. Thenmozhi",
    designation: "Assistant Professor",
    qualification: "Ph.D. Computer Science",
    research: "Artificial intelligence, machine learning",
    image: "https://bcarvu.netlify.app/assets/faculty/Dr.-Thenmozhi-1.png"
  },
  {
    name: "Dr. Mahadev Kalyanrao Patil",
    designation: "Associate Professor",
    qualification: "Ph.D. Data Science",
    research: "Data analytics, big data",
    image: "https://bcarvu.netlify.app/assets/faculty/Dr.-Mahadev-Kalyanrao-Patil-1.png"
  },
  {
    name: "Prof. Mohammed Danish",
    designation: "Assistant Professor",
    qualification: "MCA",
    research: "Machine learning",
    image: "https://bcarvu.netlify.app/assets/faculty/Prof.-Mohammed-Danish-1.png"
  },
  {
    name: "Prof. Sharath Shetty B. R.",
    designation: "Assistant Professor",
    qualification: "MCA",
    research: "Software engineering",
    image: "https://bcarvu.netlify.app/assets/faculty/Prof.-Sharath-Shetty-B-R.png"
  },
  {
    name: "Prof. Sasikala J.",
    designation: "Assistant Professor",
    qualification: "M.Sc. Mathematics",
    research: "Applied mathematics",
    image: "https://bcarvu.netlify.app/assets/faculty/Prof.-Sasikala-Jeganathan1.png"
  }
];

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "not connected"
  });
});

app.get("/api/faculty", (_request, response) => {
  response.json(faculty);
});

app.post("/api/inquiries", async (request, response) => {
  if (mongoose.connection.readyState !== 1) {
    return response.status(503).json({
      message: "Message storage is not configured yet. Add your MongoDB URI to the .env file and restart the server."
    });
  }

  const { name, email, subject, message } = request.body || {};
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    !subject.trim() ||
    !message.trim() ||
    name.trim().length > 100 ||
    email.trim().length > 254 ||
    subject.trim().length > 160 ||
    message.trim().length > 3000
  ) {
    return response.status(400).json({ message: "Enter your name, a valid email, a subject and a message." });
  }

  try {
    const inquiry = await Inquiry.create({ name, email, subject, message });
    return response.status(201).json({ message: "Your message has been received.", id: inquiry.id });
  } catch (error) {
    console.error("Could not save department inquiry:", error);
    return response.status(500).json({ message: "We couldn't save your message. Please try again later." });
  }
});

const clientBuild = path.join(__dirname, "..", "dist");
if (fs.existsSync(clientBuild)) {
  app.use(express.static(clientBuild));
  app.get("*", (_request, response) => response.sendFile(path.join(clientBuild, "index.html")));
}

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB."))
    .catch((error) => console.error("MongoDB connection failed:", error.message));
} else {
  console.warn("MONGODB_URI is not set. Contact form submissions will not be stored.");
}

app.listen(port, () => {
  console.log(`Department API listening on http://localhost:${port}`);
});
