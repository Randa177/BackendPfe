const ProgrammeDeVoyageModel = require("../models/ProgrammeDeVoyageSchema");
const userModel = require("../models/userSchema");

const getAllProgrammeDeVoyages = async (req, res) => {
  try {
    const ProgrammeDeVoyageList = await ProgrammeDeVoyageModel.find();
    if (!ProgrammeDeVoyageList || ProgrammeDeVoyageList.length === 0) {
      throw new Error("Aucun programme de voyage trouvé");
    }
    res.status(200).json(ProgrammeDeVoyageList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProgrammeDeVoyageById = async (req, res) => {
  try {
    const id = req.params.id;
    const ProgrammeDeVoyage = await ProgrammeDeVoyageModel.findById(id).populate("owner");
    if (!ProgrammeDeVoyage) {
      throw new Error("Programme de voyage introuvable");
    }
    res.status(200).json(ProgrammeDeVoyage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProgrammeDeVoyageById = async (req, res) => {
  try {
    const id = req.params.id;
    const ProgrammeDeVoyageById = await ProgrammeDeVoyageModel.findById(id);
    if (!ProgrammeDeVoyageById) {
      throw new Error("Programme de voyage introuvable");
    }
    await userModel.updateMany({}, { $pull: { ProgrammeDeVoyages: id } });
    await ProgrammeDeVoyageModel.findByIdAndDelete(id);
    res.status(200).json("Deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProgrammeDeVoyage = async (req, res) => {
  try {
    const { destination, prix, dateDebut, dateRetour } = req.body;
    if (!destination || !prix || !dateDebut || !dateRetour) {
      throw new Error("Erreur dans les données");
    }
    const newProgramme = await ProgrammeDeVoyageModel.create({
      destination, prix, dateDebut, dateRetour
    });
    res.status(200).json({ newProgramme });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProgrammeDeVoyage = async (req, res) => {
  try {
    const id = req.params.id;
    const { destination, prix, dateDebut, dateRetour } = req.body;
    const ProgrammeDeVoyageById = await ProgrammeDeVoyageModel.findById(id);
    if (!ProgrammeDeVoyageById) {
      throw new Error("Programme de voyage introuvable");
    }
    if (!destination || !prix || !dateDebut || !dateRetour) {
      throw new Error("Erreur dans les données");
    }
    await ProgrammeDeVoyageModel.findByIdAndUpdate(id, {
      $set: { destination, prix, dateDebut, dateRetour },
    });
    const updatedProgramme = await ProgrammeDeVoyageModel.findById(id);
    res.status(200).json({ updatedProgramme });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const affect = async (req, res) => {
  try {
    const { userId, ProgrammeDeVoyageId } = req.body;
    const ProgrammeDeVoyageById = await ProgrammeDeVoyageModel.findById(ProgrammeDeVoyageId);
    if (!ProgrammeDeVoyageById) {
      throw new Error("Programme de voyage introuvable");
    }
    const checkIfUserExists = await userModel.findById(userId);
    if (!checkIfUserExists) {
      throw new Error("Utilisateur non trouvé");
    }
    await ProgrammeDeVoyageModel.findByIdAndUpdate(ProgrammeDeVoyageId, {
      $set: { owner: userId },
    });
    await userModel.findByIdAndUpdate(userId, {
      $push: { ProgrammeDeVoyages: ProgrammeDeVoyageId },
    });
    res.status(200).json('Affecté');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const desaffect = async (req, res) => {
  try {
    const { userId, ProgrammeDeVoyageId } = req.body;
    const ProgrammeDeVoyageById = await ProgrammeDeVoyageModel.findById(ProgrammeDeVoyageId);
    if (!ProgrammeDeVoyageById) {
      throw new Error("Programme de voyage introuvable");
    }
    const checkIfUserExists = await userModel.findById(userId);
    if (!checkIfUserExists) {
      throw new Error("Utilisateur non trouvé");
    }
    await ProgrammeDeVoyageModel.findByIdAndUpdate(ProgrammeDeVoyageId, {
      $unset: { owner: 1 },
    });
    await userModel.findByIdAndUpdate(userId, {
      $pull: { ProgrammeDeVoyages: ProgrammeDeVoyageId },
    });
    res.status(200).json('Désaffecté');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProgrammeDeVoyages,
  getProgrammeDeVoyageById,
  deleteProgrammeDeVoyageById,
  addProgrammeDeVoyage,
  updateProgrammeDeVoyage,
  affect,
  desaffect,
};
