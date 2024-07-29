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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/UserService.ts
const User_1 = __importDefault(require("../models/User"));
class UserService {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.find().exec();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findById(id).exec();
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new User_1.default(user);
            console.log('asdsad');
            console.log(newUser);
            return newUser.save();
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findByIdAndUpdate(id, user, { new: true }).exec();
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findByIdAndDelete(id).exec();
        });
    }
}
exports.default = new UserService();
