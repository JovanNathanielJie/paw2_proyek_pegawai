require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect ke MongoDB
connectDB();

// Middleware global
app.use(cors());
app.use(express.json());

// Register routes (DISESUAIKAN DENGAN PENAMAAN KAMU)
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/users", require("./src/routes/user"));
app.use("/api/employees", require("./src/routes/employee"));
app.use("/api/departments", require("./src/routes/department"));
app.use("/api/positions", require("./src/routes/position"));
app.use("/api/attendance", require("./src/routes/attendance"));
app.use("/api/leaves", require("./src/routes/leave"));
app.use("/api/dashboard", require("./src/routes/dashboard"));

// Global error handler (after all routes)
const errorHandler = require("./src/middlewares/errorHandler");
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Kepegawaian API is running...");
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    // Auto-open browser in development for convenience
    try {
        const env = process.env.NODE_ENV || "development";
        const autoOpen = process.env.AUTO_OPEN === "true" || env === "development";

        if (autoOpen) {
            const { exec } = require("child_process");
            const url = `http://localhost:${PORT}`;
            let cmd = null;

            if (process.platform === "win32") cmd = `start ${url}`;
            else if (process.platform === "darwin") cmd = `open ${url}`;
            else cmd = `xdg-open ${url}`;

            exec(cmd, (err) => {
                if (err) console.warn("Could not open browser automatically:", err.message || err);
            });
        }
    } catch (err) {
        console.warn("Auto-open skipped:", err.message || err);
    }
});
