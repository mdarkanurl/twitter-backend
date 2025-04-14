"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTweet = exports.updateTweet = exports.getTweet = exports.getTweets = exports.createTweet = void 0;
const prisma_1 = require("../../src/generated/prisma");
const prisma = new prisma_1.PrismaClient();
const createTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.content.length > 280) {
            res.status(401).json({
                success: false,
                data: {},
                message: `Tweet must be less than 280 characters`,
                Error: {}
            });
            return;
        }
        if (req.body.content.length === 0) {
            res.status(401).json({
                success: false,
                data: {},
                message: `Tweet must be more than 1 characters`,
                Error: {}
            });
            return;
        }
        const result = yield prisma.tweet.create({ data: req.body });
        res.status(200).json({
            success: true,
            data: result,
            Error: {}
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            data: {},
            message: `content field must be filled`,
            Error: error
        });
    }
});
exports.createTweet = createTweet;
const getTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allTweet = yield prisma.tweet.findMany();
    res.status(200).json({
        success: true,
        data: allTweet,
        Error: {}
    });
    return;
});
exports.getTweets = getTweets;
const getTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tweet = yield prisma.tweet.findUnique({ where: { id: Number(id) } });
    if (!tweet) {
        res.status(404).json({
            success: false,
            data: {},
            message: `Tweet doesn't found`,
            Error: {}
        });
        return;
    }
    try {
        res.status(200).json({
            success: true,
            data: tweet,
            Error: {}
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: {},
            Error: error
        });
        return;
    }
});
exports.getTweet = getTweet;
const updateTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    if (content.length > 280) {
        res.status(401).json({
            success: false,
            data: {},
            message: `Tweet must be less than 280 characters`,
            Error: {}
        });
        return;
    }
    if (content.length === 0) {
        res.status(401).json({
            success: false,
            data: {},
            message: `Tweet must be more than 1 characters`,
            Error: {}
        });
        return;
    }
    try {
        const updateTweet = yield prisma.tweet.update({
            where: { id: Number(req.params.id) },
            data: { content }
        });
        res.status(200).json({
            success: true,
            data: updateTweet,
            message: `Tweet updated`,
            Error: {}
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            data: {},
            message: `Tweet not found`,
            Error: {}
        });
    }
});
exports.updateTweet = updateTweet;
const deleteTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleteTweet = yield prisma.tweet.delete({ where: { id: Number(id) } });
        res.status(200).json({
            success: true,
            data: deleteTweet,
            message: 'Tweet deleted',
            Error: {}
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            data: {},
            message: `Tweet not found`,
            Error: {}
        });
    }
});
exports.deleteTweet = deleteTweet;
