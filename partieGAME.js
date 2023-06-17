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

const selectedPlayers = [];

for (let i = 0; i < players; i++) {
  const playerName = prompt(`Entrez le nom du joueur ${i + 1}: `);
  selectedPlayers.push(playerName);
}

console.log("Les joueurs sélectionnés sont :");
selectedPlayers.forEach((player, index) => {
  console.log(`Joueur ${index + 1}: ${player}`);
});

function jouerPartie(player) {
  const scores = {};
  player.forEach((player) => {
    scores[player] = [];
  });

  for (let frame = 1; frame <= 10; frame++) {
    console.log(`Frame ${frame}`);
    for (let i = 0; i < joueurs.length; i++) {
      console.log(`Joueur: ${joueurs[i]}`);
      const lancer1 = demanderNombreQuilles(joueurs[i], 1);
      scores[joueurs[i]].push(lancer1);
      if (lancer1 === 10) {
        console.log("Strike !");
        continue;
      }
      const lancer2 = demanderNombreQuilles(joueurs[i], 2);
      scores[joueurs[i]].push(lancer2);
      if (lancer1 + lancer2 === 10) {
        console.log("Spare !");
      }
    }
  }

  return scores;
}

function demanderNombreQuilles(joueur, lancer) {
  let nombreQuilles;
  do {
    nombreQuilles = parseInt(prompt(`Joueur ${joueur}, Entrez le nombre de quilles renversées lors du lancer ${lancer}: `));
    if (isNaN(nombreQuilles) || nombreQuilles < 0 || nombreQuilles > 10) {
      console.log("Veuillez entrer un nombre valide entre 0 et 10.");
    }
  } while (isNaN(nombreQuilles) || nombreQuilles < 0 || nombreQuilles > 10);

  return nombreQuilles;
}

// Test du déroulement de la partie
const joueurs = [players, players];
const scores = jouerPartie(joueurs);

console.log("Scores :");
for (const joueur in scores) {
  console.log(`${joueur} : ${scores[joueur].join(", ")}`);
}
