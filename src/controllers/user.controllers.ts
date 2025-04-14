import { Request, Response } from 'express';
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
    const allUser = await prisma.user.findMany();

    res.status(200).json({
        success: true,
        data: allUser,
        Error: {}
    });
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if(!user) {
        res.status(404).json({
            success: false,
            data: {},
            message: 'User not found',
            Error: {}
        });

        return;
    }

    res.status(200).json({
        success: true,
        data: user,
        Error: {}
    });
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const result = await prisma.user.create({data: req.body});

        res.status(200).json({
            success: true,
            data: result,
            Error: {}
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            data: {},
            message: `${req.body.username} is not available`,
            Error: error
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, bio, image, username } = req.body;

    try {
        const result = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, bio, image, username }
        });

        res.status(200).json({
            success: true,
            data: result,
            Error: {}
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            data: {},
            message: `${req.body.username} is not available`,
            Error: error
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleteUser = await prisma.user.delete({ where: {id: Number(id)} });

    if(!deleteUser) {
        res.status(400).json({
            success: false,
            data: {},
            message: 'User is not deleted',
            Error: {}
        });
        return;
    }

    try {
        res.status(200).json({
            success: true,
            data: {},
            message: 'User deleted',
            Error: {}
        });
        return;
    } catch (error) {
        res.status(500).json({
            success: true,
            data: {},
            message: 'Server error',
            Error: {}
        });
        return;
    }
}