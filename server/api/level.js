import express, { Router } from "express";
import { getLevels, createLevel, getLevelById } from "#db/queries/levels";
import db from "#db/client";

const router = express(Router());

//GET ALL LEVELS
router
    .route("/")
    .get(async (req, res) => {
    const levels = await getLevels()
    res.status(200).json(levels)
})

//GET SINGLE LEVEL BY ID
router
    .route("/:id")
    .get(async (req, res) => {
        const level = await getLevelById(req.params.id)
        if(!level) return res.status(404).send("Level not found")
        res.status(200).json(level)
    })

//Full thoughts on obtaining levels
//GET /levels (fetches levels)
//GET /levels:id (fetches specific level by id)

