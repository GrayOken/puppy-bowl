// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2307-fsa-et-web-sf";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    // TODO
    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2307-fsa-et-web-sf/players"
    );
    const data = await response.json();
    return data.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    // TODO
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2307-fsa-et-web-sf/players`
    );
    const data = await response.json();
    const player = data.data.players.filter((elem) => elem.id === playerId)[0];
    console.log(player);
    return player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  // TODO
  fetchAllPlayers().then((response) => {
    document.querySelector("main").innerHTML = "";
    response.forEach((elem) => {
      const html = `
        <div class="card">
          <div class="title">
            <h3 class="name">${elem.name}</h3>
            <h4 class="id">#${elem.id}</h4>
          </div>
          <img class="photo" src="${elem.imageUrl}" alt="${elem.name}"></img>
          <div class=buttons>
            <button type="button" onclick="renderSinglePlayer(${elem.id})" >Details</button>
            <button type="button">Remove</button>
          </div>
        </div>
      `;
      document.querySelector("main").innerHTML += html;
    });
  });
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  // TODO
  fetchSinglePlayer(player).then((response) => {
    document.querySelector("main").innerHTML = `
      <div class="details">
        <h1>${response.name}</h1>
        <h2>#${response.id}</h2>
        <p>${response.breed}</p>
        <button type="button" class="returnBtn" onclick="renderAllPlayers()">Return</button>
        <img
          class="full-img"
          src="${response.imageUrl}"
          alt="${response.breed}"
        ></img>
      </div>
    `;
  });
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    renderAllPlayers,
    renderSinglePlayer,
  };
} else {
  init();
}
