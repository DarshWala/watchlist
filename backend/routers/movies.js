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
  } catch (error) {
    res.status(500).json({ message: error.message });
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

// POST add a movie to watchlist (fetches poster from OMDb if image not provided)
router.post("/", async (req, res) => {

    try {
        const title = req.body.name;
        if(!title){
            res.status(400).json({ msg : "movie name is required" })
        }
        
        const omdbRes = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API}&s=${encodeURIComponent(title)}`)

        if(omdbRes.ok){
            const omdbData = await omdbRes.json();

            const usefulData = omdbData.Search[0]
            // console.log(usefuxlData);   
            res.json(usefulData);

            const movie = {
                name : usefulData.Title,
                watched : false,
                image : usefulData.Poster,
            }
            
            console.log(movie);
            
            await Movie.create(movie);
            
        }
        if(!omdbRes.ok){
            console.log('Error Occured');            
        }
        
    } catch (error) {
        throw new Error(error);
    }
});

export default router;
