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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const prisma_1 = require("../../src/generated/prisma");
const prisma = new prisma_1.PrismaClient();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield prisma.user.findMany();
    res.status(200).json({
        success: true,
        data: allUser,
        Error: {}
    });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
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
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.user.create({ data: req.body });
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
            message: `${req.body.username} is not available`,
            Error: error
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, bio, image, username } = req.body;
    try {
        const result = yield prisma.user.update({
            where: { id: Number(id) },
            data: { name, bio, image, username }
        });
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
            message: `${req.body.username} is not available`,
            Error: error
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deleteUser = yield prisma.user.delete({ where: { id: Number(id) } });
    if (!deleteUser) {
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
    }
    catch (error) {
        res.status(500).json({
            success: true,
            data: {},
            message: 'Server error',
            Error: {}
        });
        return;
    }
});
exports.deleteUser = deleteUser;
