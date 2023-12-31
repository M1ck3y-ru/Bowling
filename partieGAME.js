"use strict";

const ps = require("prompt-sync");
const prompt = ps();

do {
 var playersNumber = parseInt(prompt("Combien y a-t-il de joueurs (6 maximum) ? "));
  
 if (isNaN(playersNumber)) {
  console.log("Veuillez entrer un nombre valide.");
} else if (playersNumber < 1 || playersNumber > 6) {
  console.log("Le nombre de joueurs doit être compris entre 1 et 6 inclus");
}
} while (isNaN(playersNumber) || playersNumber < 1 || playersNumber > 6);

console.log(`D'accord, ${playersNumber} joueur(s). \n`);

const amountOfPlayers = [];     // Tableau qui va stocker les noms des joueurs avec leur index

for (let i = 0; i < playersNumber; i++) { // longueur de la boucle est égal au nombre de joueurs
  const playerName = prompt(`Entrez le nom du joueur ${i + 1}: `); // i + 1 car tableau commence à 0 or le premier joueur sera le joueur 1 et pas le 0
  amountOfPlayers.push(playerName);  // push == append du go donc rajoute élément à fin de tableau
}

console.log("\nLes joueurs sélectionnés sont :"); 
amountOfPlayers.forEach((player, index) => { // player = contenue de la case donc nom du joueur et index est le numéro de la case +1 ressemble au range du go
  console.log(`Joueur ${index + 1}: ${player}`);
  console.log(``)
});

const scores = [];  // tableau qui contient les scores


for (let frame = 1; frame <= 10; frame++) {  // boucle qui représente le nombre de tour
  console.log(`\nTour ${frame}:`);  // frame qui va nous indiquer le tour actuel

  amountOfPlayers.forEach((player, index) => {    //amountOfPlayers tableau avec nom de nos joueurs, for each qui fonctionne comme range
    console.log(`Joueur : ${player}`); // annonce le tour du joueur avec son nom
    const playerScore = [];  // on créer un tableau qui contiendra le score du joueur en question

    let firstThrow;
    let secondThrow;

    do {
      firstThrow = parseInt(prompt("Lancer 1 : "));  // comme au début on fait en sorte que seulement les int puissent être écrit 
      if (isNaN(firstThrow) || firstThrow < 0 || firstThrow > 10) {  // si firstThrow n'est pas int ou est inférieur à 0 ou supérieur à 10
        console.log("Veuillez entrer un entier entre 0 et 10.");  // on demande à entier de entre à 0 et 10 (nombre de quilles tombés)
      }
    } while (isNaN(firstThrow) || firstThrow < 0 || firstThrow > 10);  // le do while se répète tant que l'input n'est pas entier entre 0 et 10

    let frameScore = firstThrow; // frame score sera égal au score du premier lancer puis du 2 qu'on rajoutera
  
    if (firstThrow === 10) { // si le premier lancer est 10 ça veut dire que c'est un strike
      console.log("Strike !");
    } else {
      do {
        secondThrow = parseInt(prompt("Lancer 2 : ")); // 2e lancer du tour
        if (isNaN(secondThrow) || secondThrow < 0 || secondThrow > 10) { // comme premier lancer si input entier ou pas entre 0 et 10 -> condition
          console.log("Veuillez entrer un entier entre 0 et 10.");
        }
      } while (isNaN(secondThrow) || secondThrow < 0 || secondThrow > 10); // do while continue tant que condition n'est pas passé

      frameScore += secondThrow; // on rajoute à framescore le score du 2e lancer

      if (frameScore === 10) {  // si framescore = 10 donc après le 2e lancer alors spare 
     
        console.log("Spare !");
      } 
    }

    playerScore.push({ frame, frameScore,  });  // on fait un push (comme append du go) pour rajouter à playerScore le tour et le score du tour dans tableau
                                                                     // le tour le score du tour et le type de lancer du tour
    if (!scores[index]) { // si y'a pas de score à la case index alors 
      scores[index] = { player, playerScore }; // on remplie la case index avec le joueur et son score (pour le tableau des scores final)
    } else {
      scores[index].playerScore.push(...playerScore); // sinon si case index est remplie on rajoute son score 
    }
  });

}

console.log("\nScores finaux :"); // aperçu des scores
for (let i = 0; i < scores.length; i++) {
  const playerArray = scores[i];
  const player = playerArray.player;
  const playerScore = playerArray.playerScore;
  console.log(`\nJoueur : ${player}`); // aperçu nom du joueur
  console.log("Tour :  Quilles abattues  "); // aperçu du tour et du score
  for (let j = 0; j < playerScore.length; j++) {
    const frameArray = playerScore[j];
    const frame = frameArray.frame;
    const frameScore = frameArray.frameScore;
    console.log(`  ${frame}          ${frameScore}    `);
  }
}

let maxScore = -1;
let winner = "";

for (let i = 0; i < scores.length; i++) {
  const playerArray = scores[i];
  const player = playerArray.player;
  const playerScore = playerArray.playerScore;
  let totalScore = 0;

  for (let j = 0; j < playerScore.length; j++) {
    const frameArray = playerScore[j];
    const frameScore = frameArray.frameScore;
    totalScore += frameScore;
  }

  if (totalScore > maxScore) {
    maxScore = totalScore;
    winner = player;
  }
}

console.log(`\nLe gagnant de la partie est : ${winner} avec un score de ${maxScore} points !`);

//test commit