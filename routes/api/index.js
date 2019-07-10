const router = require("express").Router();
const statRoutes = require("./stats");

// Routes
router.use("/stats", statRoutes);

module.exports = router;
