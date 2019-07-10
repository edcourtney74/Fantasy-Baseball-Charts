const db = require("../models");

// Defining methods for the kidsController
module.exports = {
  // Function to find all stats
  findAll: (req, res) => {
    db.stats.findAll({
      order: [
        ['team'],
        ['week']
      ]
    })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  }
};


