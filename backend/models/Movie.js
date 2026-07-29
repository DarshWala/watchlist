import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  watched: {
    type: Boolean,
    default: false,
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
  runtime: { type: String }
}, {
  timestamps: true 
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
