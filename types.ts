// type to represent a show
type tShow = {
  id: number,
  name: string,
  summary: string,
  image: string | null
}

// type to represent an episode
type tEpisode = {
  id: number,
  name: string,
  season: number,
  number: number
}

// type to represent HTTP Methods
type tHttpMethods = "get" | "post" | "patch" | "delete"

// type to represent show result data
type tShowResult = {
  show: {
    id: number,
    name: string,
    summary: string,
    image: {medium: string} | null //image either has the key of medium or it will be null
  }
}

// type to represent episode result data
type tEpisodeResult = {
  id: number,
  name: string,
  season: number,
  number: number
}