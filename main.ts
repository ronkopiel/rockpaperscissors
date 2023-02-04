const choicePhase = document.querySelector(".choice-phase") as HTMLDivElement;
const resaultPhase = document.querySelector(".resualt-phase") as HTMLDivElement;
const resualt = document.querySelector(".resault-div") as HTMLDivElement;
const scoreBoard = document.querySelector(".score-value") as HTMLDivElement;
const resetButton = document.querySelector("#reset") as HTMLButtonElement;
const houseDiv = document.querySelector(".house-div") as HTMLDivElement;
const playerDiv = document.querySelector(".player-div") as HTMLDivElement;
const resaultText = document.querySelector(".resault") as HTMLDivElement;
let scoreMem =
  typeof localStorage.getItem("score") == "string"
    ? JSON.parse(localStorage.getItem("score")!)
    : "";
let score: number = typeof scoreMem == "string" ? parseInt(scoreMem) : 0;
scoreBoard.textContent = score.toString();

// get the players pick and then call the randomizePick function to simulate a pick from the computer and then check to see who wins and call the apropriate function accordingly
const checkWin = async (pick: HTMLDivElement): Promise<void> => {
  const computerPick = await randomizePick();
  await delay(2000);
  switch (pick.id) {
    case "0":
      if (
        computerPick.classList.contains("rock") ||
        computerPick.classList.contains("spock")
      ) {
        loss();
        animateWinner(computerPick);
      } else if (
        computerPick.classList.contains("paper") ||
        computerPick.classList.contains("lizzard")
      ) {
        win();
        animateWinner(pick);
      } else {
        draw();
      }
      break;
    case "1":
      if (
        computerPick.classList.contains("rock") ||
        computerPick.classList.contains("spock")
      ) {
        loss();
        animateWinner(computerPick);
      } else if (
        computerPick.classList.contains("lizzard") ||
        computerPick.classList.contains("scissors")
      ) {
        win();
        animateWinner(pick);
      } else {
        draw();
      }
      break;
    case "2":
      if (
        computerPick.classList.contains("paper") ||
        computerPick.classList.contains("spock")
      ) {
        loss();
        animateWinner(computerPick);
      } else if (
        computerPick.classList.contains("lizzard") ||
        computerPick.classList.contains("scissors")
      ) {
        win();
        animateWinner(pick);
      } else {
        draw();
      }
      break;
    case "3":
      if (
        computerPick.classList.contains("rock") ||
        computerPick.classList.contains("scissors")
      ) {
        loss();
        animateWinner(computerPick);
      } else if (
        computerPick.classList.contains("paper") ||
        computerPick.classList.contains("spock")
      ) {
        win();
        animateWinner(pick);
      } else {
        draw();
      }
      break;
    case "4":
      if (
        computerPick.classList.contains("paper") ||
        computerPick.classList.contains("lizzard")
      ) {
        loss();
        animateWinner(computerPick);
      } else if (
        computerPick.classList.contains("rock") ||
        computerPick.classList.contains("scissors")
      ) {
        win();
        animateWinner(pick);
      } else {
        draw();
      }
      break;
  }
};
// simulating a pick from the computer, calling the render function and returning a copy of the pick
const randomizePick = async () => {
  const tempDiv = document.createElement("div") as HTMLDivElement;
  tempDiv.classList.add("loading");
  houseDiv.append(tempDiv);
  await delay(2000);
  houseDiv.removeChild(houseDiv.lastChild!);
  const pcPick = document
    .getElementById(`${Math.round(4 * Math.random()).toString()}`)
    ?.cloneNode(true) as HTMLDivElement;
  renderChoice(pcPick, houseDiv);
  return pcPick;
};
// taking a copy of the players choice, scaling it up and apending it to the apropriate player's side
const renderChoice = (choice: HTMLDivElement, player: HTMLDivElement) => {
  choice.classList.add("scale-up");
  player.append(choice);
};
//reseting the game to the original state except for the scoreboard
const resetGame = () => {
  while (playerDiv.children.length > 1) {
    playerDiv.removeChild(playerDiv.lastChild!);
  }
  while (houseDiv.children.length > 1) {
    houseDiv.removeChild(houseDiv.lastChild!);
  }
  choicePhase.classList.remove("hidden");
  resaultPhase.classList.add("hidden");
  resualt.classList.add("hidden");
};
//reading the current score, adding to it updating the scoreboard and then seting the updated score back in local storage. also showing the resualts of the game and showing the reset button
const win = () => {
  score = typeof scoreMem == "string" ? parseInt(scoreMem) : 0;
  score++;
  scoreMem = score.toString();
  scoreBoard.textContent = score.toString();
  localStorage.setItem("score", JSON.stringify(scoreMem));
  resualt.classList.remove("hidden");
  resaultText.textContent = "YOU WIN";
};
//display the resault of the game and show the reset button
const loss = () => {
  resualt.classList.remove("hidden");
  resaultText.textContent = "YOU LOSE";
};
//display the resault of the game and show the reset button
const draw = () => {
  resualt.classList.remove("hidden");
  resaultText.textContent = "ITS A DRAW";
};
//add custom delay
const delay = async (ms: number) => {
  return new Promise((r) => setTimeout(r, ms));
};
//get the winner and then nest it in a second div to add more css to represent the win
const animateWinner = (winner: HTMLDivElement) => {
  const winnerDiv = document.createElement("div");
  winnerDiv.classList.add("winner");
  const winnerOGParent = winner.parentElement!;
  winnerDiv.appendChild(winner);
  winnerOGParent.appendChild(winnerDiv);
};
// get the users pick
window.onclick = (e) => {
  const target = e.target as HTMLDivElement;
  const userPick: HTMLDivElement = target.cloneNode(true) as HTMLDivElement;
  if (
    userPick.hasAttribute("id") &&
    !choicePhase.classList.contains("hidden") &&
    userPick.id != "reset"
  ) {
    choicePhase.classList.add("hidden");
    resaultPhase.classList.toggle("hidden");
    renderChoice(userPick, playerDiv);
    checkWin(userPick);
  }
};
resetButton.addEventListener("click", resetGame);
