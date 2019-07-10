const router = require("express").Router();
const statsController = require("../../controllers/statsController");
// 

// Matches with "/api/stats"
router.route("/")
  .get(statsController.findAll)

module.exports = router;
