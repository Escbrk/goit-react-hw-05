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

const data = async (query) => {
  return await instance.get(`/search/movie${query}`);
};

export default data;
