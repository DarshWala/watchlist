import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  imdbId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  watched: {
    type: Boolean,
    default: false,
  },

  watchedAt:{
    type : Date,
    default : null
  },

  image: {
    type: String,
    trim: true,
  },
  year: { type: String },
  type: { type: String },
  imdbRating: { type: String },
  plot: { type: String },
  genres: { type: String },
  runtime: { type: String },
  userRating: {
    type: Number,
    min: 1,
    max: 10,
    default: null,
  },
}, {
  timestamps: true 
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
