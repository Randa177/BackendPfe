const express = require("express");
const router = express.Router();
const ProgrammeDeVoyageController = require("../controllers/ProgrammeDeVoyageController");

// Route pour obtenir tous les programmes de voyage
router.get("/", ProgrammeDeVoyageController.getAllProgrammeDeVoyages);

// Route pour obtenir un programme de voyage par son ID
router.get("/:id", ProgrammeDeVoyageController.getProgrammeDeVoyageById);

// Autres routes pour ajouter, mettre à jour, supprimer des programmes
router.post("/", ProgrammeDeVoyageController.addProgrammeDeVoyage);
router.put("/:id", ProgrammeDeVoyageController.updateProgrammeDeVoyage);
router.delete("/:id", ProgrammeDeVoyageController.deleteProgrammeDeVoyageById);

// Affecter/désaffecter un programme
router.post("/affect", ProgrammeDeVoyageController.affect);
router.post("/desaffect", ProgrammeDeVoyageController.desaffect);

module.exports = router;