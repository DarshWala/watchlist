import express from "express";
import Movie from "../models/Movie.js";
import dotenv from "dotenv";

dotenv.config();

const OMDB_API = process.env.OMDB_API_KEY;

const router = express.Router();

// GET all movies in watchlist
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
    console.log("request ok");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/search", async (req, res) => {
  const title = req.query.name;

  if (!title?.trim()) {
    return res.status(400).json({ message: "Movie name is required" });
  }

  try {
    const omdbRes = await fetch(
      `https://www.omdbapi.com/?apikey=${OMDB_API}&s=${encodeURIComponent(title)}`,
    );

    if (!omdbRes.ok) {
      return res.status(502).json({ message: "Could not reach OMDb" });
    }

    const omdbData = await omdbRes.json();

    if (omdbData.Response === "False") {
      return res.status(404).json({
        message: omdbData.Error || "No movies found",
      });
    }

    if (omdbData.Response === "False") {
      return res.status(404).json({ message: omdbData.Error });
    }

    return res.status(200).json(omdbData.Search.slice(0, 6));
  } catch (error) {
    return res.status(500).json({ message: "Movie search failed" });
  }
});

// GET single movie by ID
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { imdbId } = req.body;

  if (!imdbId) {
    return res.status(400).json({
      message: "IMDb ID is required",
    });
  }

  try {
    const existingMovie = await Movie.findOne({ imdbId });

    if (existingMovie) {
      return res.status(409).json({
        message: "This movie is already in your watchlist",
      });
    }

    const omdbRes = await fetch(
      `https://www.omdbapi.com/?apikey=${OMDB_API}&i=${encodeURIComponent(imdbId)}&plot=short`,
    );

    if (!omdbRes.ok) {
      return res.status(502).json({ message: "Could not reach OMDb" });
    }

    const omdbMovie = await omdbRes.json();

    if (omdbMovie.Response === "False") {
      return res.status(404).json({ message: omdbMovie.Error });
    }

    const savedMovie = await Movie.create({
      imdbId: omdbMovie.imdbID,
      name: omdbMovie.Title,
      image: omdbMovie.Poster,
      year: omdbMovie.Year,
      type: omdbMovie.Type,
      imdbRating: omdbMovie.imdbRating,
      plot: omdbMovie.Plot,
      genres: omdbMovie.Genre,
      runtime: omdbMovie.Runtime,
    });

    return res.status(201).json(savedMovie);
  } catch (error) {
    return res.status(500).json({
      message: "Could not save movie",
    });
  }
});

// PATCH toggle watched status
router.patch("/:id/watched", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    movie.watched = !movie.watched;
    movie.watchedAt = movie.watched ? new Date() : null;
    await movie.save();

    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.patch("/:id/rating", async (req, res) => {
  const { userRating } = req.body;

  if (
    userRating !== null &&
    (!Number.isInteger(userRating) || userRating < 1 || userRating > 10)
  ) {
    return res.status(400).json({
      message: "Rating must be a whole number between 1 and 10",
    });
  }

  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { userRating },
      { new: true, runValidators: true },
    );

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/", async (req, res) => {
  const id = req.body.id;

  try {
    if (!id) {
      res.status(400).json({ msg: "please provide id" });
    } else {
      const movieToBeDeleted = await Movie.findByIdAndDelete(id);
      // await Movie.findByIdAndDelete(id);
      res.json(movieToBeDeleted);
    }
  } catch (error) {
    console.log(`error occured ${error} `);
  }
});

export default router;
