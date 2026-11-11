const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Full Stack Server is running!"
    });
});

app.get("/api/products", (req, res) => {
    const products = [
        {
            id: 1,
            name: "Laptop",
            price: 65000,
            category: "Electronics"
        },
        {
            id: 2,
            name: "Headphones",
            price: 2500,
            category: "Electronics"
        },
        {
            id: 3,
            name: "Backpack",
            price: 1800,
            category: "Accessories"
        }
    ];

    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});