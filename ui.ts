import { getEpisodesOfShow, searchShowsByTerm } from "./models"

const $showsList = document.querySelector("#showsList") as HTMLElement;
const $episodesList = document.querySelector("#episodesList") as HTMLElement;
const $episodesArea = document.querySelector("#episodesArea") as HTMLElement;
const $searchForm = document.querySelector("#searchForm") as HTMLFormElement;
const $term = document.querySelector("#searchForm-term") as HTMLInputElement;

/** Given list of shows, create markup for each and to DOM */

function populateShows(shows: tShow[]) : void {
  $showsList.innerHTML = "";

  for (const show of shows) {
    const $show = document.createElement("div");
    $show.innerHTML = `
        <div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img src="${show.image}" alt="${show.name}" class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `;

    $showsList.append($show);
  }
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() : Promise<void> {
  const searchTerm = $term.value;
  const shows = await searchShowsByTerm(searchTerm); //TS knows the type of shows bc type is defined in searchShowsByTerm fn

  $episodesArea.classList.add("d-none");
  populateShows(shows);
}

$searchForm.addEventListener("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given list of episodes, create markup for each and to DOM */

function populateEpisodes(episodes: tEpisode[]) : void {
  $episodesList.innerHTML = "";

  for (const episode of episodes) {
    const $item = document.createElement("li");
    $item.innerHTML = `
         ${episode.name}
         (season ${episode.season}, episode ${episode.number})
    `;

    $episodesList.append($item);
  }

  $episodesArea.classList.remove("d-none");
}

/** Handle click on episodes button: get episodes for show and display */

async function getEpisodesAndDisplay(evt: Event) :Promise<void> {
  const $clicked = evt.target as HTMLButtonElement;
  if (!$clicked.matches(".Show-getEpisodes")) return;

  // here's one way to get the ID of the show: search "closest" ancestor
  // with the class of .Show (which is put onto the enclosing div, which
  // has the .data-show-id attribute).
  const $closest = (evt.target as HTMLButtonElement).closest(".Show") as HTMLElement;
  const showId = Number($closest.getAttribute("data-show-id"));
  // const episodes = await getEpisodesOfShow(showId) as tEpisode[];
  const episodes: tEpisode[] = await getEpisodesOfShow(showId);
  populateEpisodes(episodes);
}

$showsList.addEventListener("click", getEpisodesAndDisplay);
