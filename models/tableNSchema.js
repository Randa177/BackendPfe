const mongoose = require("mongoose");

const ProgrammeDeVoyageSchema= new mongoose.Schema(
  {
    destination: { type: String, required: true },
    prix: { type: Float, required: true },
    dateDebut: { type: Date, required: true },
    dateRetour: { type: Date, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Many-to-One relation avec User
  },
  { timestamps: true }
);

const voyage= mongoose.model("ProgrammeDeVoyageVoyage", ProgrammeDeVoyageSchema);
module.exports = ProgrammeDeVoyage;