"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controllers_1 = require("../controllers/user.controllers");
const router = express_1.default.Router();
router.post('/', user_controllers_1.createUser);
router.get('/', user_controllers_1.getUsers);
router.get('/:id', user_controllers_1.getUser);
router.put('/:id', user_controllers_1.updateUser);
router.delete('/:id', user_controllers_1.deleteUser);
exports.default = router;
