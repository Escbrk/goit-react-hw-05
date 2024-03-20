import axios from "axios";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGYwMGUzOTcwZjEwMjg3NjNhMTM4ODUwMmQwZjQxMiIsInN1YiI6IjY1NzYyMDc1ZTkzZTk1MjE4ZWFhNWY4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dQNYuDUFdKQHxhdg0WTQHg2z6K4uj3Nhm978ck0sMB8";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const getTrending = async () => {
  const response = await instance.get(`/trending/movie/day`);
  return response.data.results;
};

export const getMovieById = async (id) => {
  const response = await instance.get(`/movie/${id}`);
  return response.data;
};

export const getMovie = async (query) => {
  const response = await instance.get(`/search/movie?query=${query}`);
  return response.data.results;
};

export const getCreditsById = async (id) => {
  const response = await instance.get(`/movie/${id}/credits`);
  return response.data.cast;
};

export const getReviewsById = async (id) => {
  const response = await instance.get(`/movie/${id}/reviews`);
  return response.data.results;
};
