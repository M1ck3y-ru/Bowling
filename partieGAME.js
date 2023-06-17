"use strict";

const ps = require("prompt-sync");
const prompt = ps();

do {
 var players = parseInt(prompt("Combien y a-t-il de joueurs (6 maximum) ? "));
  
 if (isNaN(players)) {
  console.log("Veuillez entrer un nombre valide.");
} else if (players < 1 || players > 6) {
  console.log("Le nombre de joueurs doit être compris entre 1 et 6 inclus");
}
} while (isNaN(players) || players < 1 || players > 6);

console.log(`D'accord, ${players} joueur(s).`);

