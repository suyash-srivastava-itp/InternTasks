const BASE_URL: string = "https://api.imdbapi.dev";


let MOVIE_ARRAY : [{}];

async function populateMovieArray() {
  let res = await fetch(`${BASE_URL}/titles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await res.json();
  MOVIE_ARRAY = data.titles;
}

export async function getTitle(title: string) {
  let res = await fetch(`${BASE_URL}/search/titles?query=${title}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return data.titles[0];
}

export async function getTitleList(start: number = 0, end: number = 10) {
  await populateMovieArray();


  return MOVIE_ARRAY.slice(start,end);
}
