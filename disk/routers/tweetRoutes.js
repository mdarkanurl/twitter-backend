"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../../src/generated/prisma");
const prisma = new prisma_1.PrismaClient();
const tweet_controllers_1 = require("../controllers/tweet.controllers");
const router = express_1.default.Router();
router.post('/', tweet_controllers_1.createTweet);
router.get('/', tweet_controllers_1.getTweets);
router.get('/:id', tweet_controllers_1.getTweet);
router.put('/:id', tweet_controllers_1.updateTweet);
router.delete('/:id', tweet_controllers_1.deleteTweet);
exports.default = router;
