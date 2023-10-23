const mongoose = require("mongoose");
const userPreference = mongoose.Schema({
  userID: {
    unique: true,
    type: String,
    required: true,
  },
  MovieList: {
    type: Array,
    required: false,
  },
  SeriesList: {
    type: Array,
    required: false,
  },
  WatchList: {
    type: Array,
    required: false,
  },
  CurrentlyWatching: {
    type: Array,
    required: false,
  },
  AllMediaWatched: {
    type: Number,
    required: false,
  },
  DurationOfMediaWatched: {
    type: Array,
    required: false,
  },
});

module.exports =
  mongoose.models.userPreference ||
  mongoose.model("userPreference", userPreference);
