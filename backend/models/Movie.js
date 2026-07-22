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
  }
}, {
  timestamps: true 
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
