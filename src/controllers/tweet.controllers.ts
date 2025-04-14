import { Request, Response } from 'express';
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export const createTweet = async (req: Request, res: Response) => {
    try {
        if(req.body.content.length > 280) {
            res.status(401).json({
                success: false,
                data: {},
                message: `Tweet must be less than 280 characters`,
                Error: {}
            });
            return;
        }

        if(req.body.content.length === 0) {
            res.status(401).json({
                success: false,
                data: {},
                message: `Tweet must be more than 1 characters`,
                Error: {}
            });
            return;
        }

        const result = await prisma.tweet.create({data: req.body});

        res.status(200).json({
            success: true,
            data: result,
            Error: {}
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            data: {},
            message: `content field must be filled`,
            Error: error
        });
    }
}

export const getTweets = async (req: Request, res: Response) => {
    const allTweet = await prisma.tweet.findMany();

    res.status(200).json({
        success: true,
        data: allTweet,
        Error: {}
    });
    return;
}

export const getTweet = async (req: Request, res: Response) => {
    const { id } = req.params;
    const tweet = await prisma.tweet.findUnique({ where: { id: Number(id) } });

    if(!tweet) {
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
    } catch (error) {
        res.status(500).json({
            success: false,
            data: {},
            Error: error
        });
        return;
    }
}

export const updateTweet = async (req: Request, res: Response) => {
    const { content } = req.body;

    if(content.length > 280) {
        res.status(401).json({
            success: false,
            data: {},
            message: `Tweet must be less than 280 characters`,
            Error: {}
        });
        return;
    }

    if(content.length === 0) {
        res.status(401).json({
            success: false,
            data: {},
            message: `Tweet must be more than 1 characters`,
            Error: {}
        });
        return;
    }

    try {
        const updateTweet = await prisma.tweet.update({
            where: { id: Number(req.params.id) },
            data: { content }
        });

        res.status(200).json({
            success: true,
            data: updateTweet,
            message: `Tweet updated`,
            Error: {}
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            data: {},
            message: `Tweet not found`,
            Error: {}
        });   
    }
}

export const deleteTweet = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deleteTweet = await prisma.tweet.delete({where: { id: Number(id) }});

        res.status(200).json({
            success: true,
            data: deleteTweet,
            message: 'Tweet deleted',
            Error: {}
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            data: {},
            message: `Tweet not found`,
            Error: {}
        });
    }
}