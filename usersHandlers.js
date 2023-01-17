const database = require("./database");
const getUsers = (req, res) => {
  database
    .query("SELECT * FROM users")
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Erreur interne du serveur" });
    });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("SELECT * FROM users WHERE id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.status(200).json(users[0]);
      } else {
        res.status(404).json({ message: "Non trouvé" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message:
          "Erreur lors de la récupération des données de la base de données",
      });
    });
};

module.exports = {
  getUsers,
  getUsersById,
};
