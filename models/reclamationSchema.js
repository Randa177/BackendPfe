const VoyageDestination = require("./reclamationSchema");
const userDestination = require("./userSchema");

module.exports.getAllVoyages = async (req, res) => {
  try {
    const VoyageList = await VoyageDestination.find();

    if (!VoyageList || VoyageList.length === 0) {
      throw new Error("Aucun voyage trouvé");
    }

    res.status(200).json(VoyageList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getVoyageById = async (req, res) => {
  try {
    const id = req.params.id;
    const Voyage = await VoyageDestination.findById(id).populate("owner");

    if (!Voyage) {
      throw new Error("Voyage introuvable");
    }

    res.status(200).json(Voyage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteVoyageById = async (req, res) => {
  try {
    const id = req.params.id;

    const VoyageById = await VoyageDestination.findById(id);

    if (!VoyageById) {
      throw new Error("Voyage introuvable");
    }

    // Suppression du voyage des utilisateurs associés
    await userDestination.updateMany({}, { $pull: { Voyages: id } });

    // Suppression du voyage
    await VoyageDestination.findByIdAndDelete(id);

    res.status(200).json("Voyage supprimé avec succès");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addVoyage = async (req, res) => {
  try {
    const { destination, dateDepart, dateRetour } = req.body;

    if (!destination || !dateDepart || !dateRetour) {
      throw new Error("Données invalides");
    }

    const Voyage = await VoyageDestination.create({
      destination,
      dateDepart,
      dateRetour,
    });

    res.status(201).json({ Voyage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateVoyage = async (req, res) => {
  try {
    const id = req.params.id;
    const { destination, dateDepart, dateRetour } = req.body;

    const VoyageById = await VoyageDestination.findById(id);

    if (!VoyageById) {
      throw new Error("Voyage introuvable");
    }

    if (!destination && !dateDepart && !dateRetour) {
      throw new Error("Données invalides");
    }

    await VoyageDestination.findByIdAndUpdate(id, {
      $set: { destination, dateDepart, dateRetour },
    });

    const updated = await VoyageDestination.findById(id);

    res.status(200).json({ updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.affect = async (req, res) => {
  try {
    const { userId, VoyageId } = req.body;

    const VoyageById = await VoyageDestination.findById(VoyageId);
    if (!VoyageById) {
      throw new Error("Voyage introuvable");
    }

    const checkIfUserExists = await userDestination.findById(userId);
    if (!checkIfUserExists) {
      throw new Error("Utilisateur introuvable");
    }

    await VoyageDestination.findByIdAndUpdate(VoyageId, {
      $set: { owner: userId },
    });

    await userDestination.findByIdAndUpdate(userId, {
      $push: { Voyages: VoyageId },
    });

    res.status(200).json("Affectation réussie");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.desaffect = async (req, res) => {
  try {
    const { userId, VoyageId } = req.body;

    const VoyageById = await VoyageDestination.findById(VoyageId);
    if (!VoyageById) {
      throw new Error("Voyage introuvable");
    }

    const checkIfUserExists = await userDestination.findById(userId);
    if (!checkIfUserExists) {
      throw new Error("Utilisateur introuvable");
    }

    await VoyageDestination.findByIdAndUpdate(VoyageId, {
      $unset: { owner: 1 }, // Suppression de l'attribut owner
    });

    await userDestination.findByIdAndUpdate(userId, {
      $pull: { Voyages: VoyageId },
    });

    res.status(200).json("Désaffectation réussie");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
