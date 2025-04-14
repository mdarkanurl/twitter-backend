import express from "express";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();
import { createTweet, getTweets, getTweet, updateTweet, deleteTweet } from "../controllers/tweet.controllers";
const router = express.Router();

router.post('/', createTweet);
router.get('/', getTweets);
router.get('/:id', getTweet);
router.put('/:id', updateTweet);
router.delete('/:id', deleteTweet);

export default router;