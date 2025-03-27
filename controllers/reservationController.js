const reservation = require("../models/reservationSchema"); 
const user = require("../models/userSchema");

module.exports.getAllreservation = async (req, res) => {
  try {
    const reservationList = await reservation.find();

    if (!reservationList || reservationList.length === 0) {
      throw new Error("Aucune réservation trouvée");
    }

    res.status(200).json(reservationList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getReservationById = async (req, res) => {
  try {
    const id = req.params.id;
    const reservationData = await reservation.findById(id).populate("owner");

    if (!reservationData) {
      throw new Error("Réservation introuvable");
    }

    res.status(200).json(reservationData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteReservationById = async (req, res) => {
  try {
    const id = req.params.id;

    const reservationById = await reservation.findById(id);

    if (!reservationById) {
      throw new Error("Réservation introuvable");
    }

    await user.updateMany({}, {
      $pull: { reservations: id },
    });

    await reservation.findByIdAndDelete(id);

    res.status(200).json("Réservation supprimée avec succès");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.addReservation = async (req, res) => {
  try {
    const { statut, prix, dateReservation } = req.body;

    if (!statut || !prix || !dateReservation) {
      throw new Error("Données invalides");
    }

    const newReservation = await reservation.create({
      statut,
      prix,
      dateReservation,
    });

    res.status(201).json({ reservation: newReservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateReservation = async (req, res) => {
  try {
    const id = req.params.id;
    const { statut, prix, dateReservation } = req.body;

    const reservationById = await reservation.findById(id);

    if (!reservationById) {
      throw new Error("Réservation introuvable");
    }

    if (!statut && !prix && !dateReservation) {
      throw new Error("Données invalides");
    }

    await reservation.findByIdAndUpdate(id, {
      $set: { statut, prix, dateReservation },
    });

    const updated = await reservation.findById(id);

    res.status(200).json({ updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.affect = async (req, res) => {
  try {
    const { userId, reservationId } = req.body;

    const reservationById = await reservation.findById(reservationId);

    if (!reservationById) {
      throw new Error("Réservation introuvable");
    }

    const checkIfUserExists = await user.findById(userId);
    if (!checkIfUserExists) {
      throw new Error("Utilisateur introuvable");
    }

    await reservation.findByIdAndUpdate(reservationId, {
      $set: { owner: userId },
    });

    await user.findByIdAndUpdate(userId, {
      $push: { reservations: reservationId },
    });

    res.status(200).json("Affectation réussie");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.desaffect = async (req, res) => {
  try {
    const { userId, reservationId } = req.body;

    const reservationById = await reservation.findById(reservationId);

    if (!reservationById) {
      throw new Error("Réservation introuvable");
    }

    const checkIfUserExists = await user.findById(userId);
    if (!checkIfUserExists) {
      throw new Error("Utilisateur introuvable");
    }

    await reservation.findByIdAndUpdate(reservationId, {
      $unset: { owner: 1 },
    });

    await user.findByIdAndUpdate(userId, {
      $pull: { reservations: reservationId },
    });

    res.status(200).json("Désaffectation réussie");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};