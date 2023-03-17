import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Movieapi from "../../common/apis/Movieapi";
import { Apikey } from "../../common/apis/Movieapikey";

// fetch move only films
export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const movieText = "Harry";
    const response = await Movieapi.get(
      `?APIkey=${Apikey}&s=${movieText}&type=movie`
    );
    return response.data;
  }
);

// fetch move only series
export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async () => {
    const seriesText = "Friends";
    const response = await Movieapi.get(
      `?APIkey=${Apikey}&s=${seriesText}&type=series`
    );
    return response.data;
  }
);

// fetch movie or show Details
export const fetchAsyncMovieorShowDetails = createAsyncThunk(
  "movies/fetchAsyncMovieorShowDetails",
  async (id) => {
    const response = await Movieapi.get(`?APIkey=${Apikey}&i=${id}&plot=full`);
    return response.data;
  }
);
const initialState = {
  movies: {},
  shows: {},
  selectedmovieorshow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    //   explain to this why payload in brackets
    // addMovies: (state, { payload }) => {
    //   // stste.intialstste = thepayload
    //   state.movies = payload;
    // },
    removeSelectedMovieOrShow: (state) => {
      state.selectedmovieorshow = {};
    },
  },

  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("fetched complete");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("rejected");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("fetched complete");
      return { ...state, shows: payload };
    },
    [fetchAsyncMovieorShowDetails.fulfilled]: (state, { payload }) => {
      console.log("fetched complete");
      return { ...state, selectedmovieorshow: payload };
    },
  },
});
// export const { addMovies } = movieSlice.actions;
export default movieSlice.reducer;
// state.slicename(movies).property(movies)
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectMovieOrShow = (state) => state.movies.selectedmovieorshow;
export const { removeSelectedMovieOrShow } = movieSlice.actions;
