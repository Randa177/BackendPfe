const Reservation = require("../models/reservationSchema"); 
const User = require("../models/userSchema");

module.exports.updateReservation = async (req, res) => {
  try {
    const id = req.params.id;
    const { statut, prix, dateReservation } = req.body;

    const reservationById = await Reservation.findById(id);

    if (!reservationById) {
      throw new Error("Réservation introuvable");
    }

    if (!statut && !prix && !dateReservation) {
      throw new Error("Données invalides");
    }

    await Reservation.findByIdAndUpdate(id, {
      $set: { statut, prix, dateReservation },
    });

    const updated = await Reservation.findById(id);

    res.status(200).json({ updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.affect = async (req, res) => {
  try {
    const { userId, reservationId } = req.body;

    const reservationById = await Reservation.findById(reservationId);
    if (!reservationById) {
      throw new Error("Réservation introuvable");
    }

    const checkIfUserExists = await User.findById(userId);
    if (!checkIfUserExists) {
      throw new Error("Utilisateur introuvable");
    }

    await Reservation.findByIdAndUpdate(reservationId, {
      $set: { owner: userId },
    });

    await User.findByIdAndUpdate(userId, {
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

    const reservationById = await Reservation.findById(reservationId);
    if (!reservationById) {
      throw new Error("Réservation introuvable");
    }

    const checkIfUserExists = await User.findById(userId);
    if (!checkIfUserExists) {
      throw new Error("Utilisateur introuvable");
    }

    await Reservation.findByIdAndUpdate(reservationId, {
      $unset: { owner: 1 }, // Suppression de l'attribut owner
    });

    await User.findByIdAndUpdate(userId, {
      $pull: { reservations: reservationId },
    });

    res.status(200).json("Désaffectation réussie");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};