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
exports.login = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //Enceiptamos la contraseña:
    const passwordEncriptada = yield bcrypt_1.default.hash(password, 10);
    // Select *  from users where username = username  ---> 
    const verificar = yield user_1.default.findOne({ where: { username: username } }); // lo mismo ^
    if (verificar) {
        res.status(400).json({
            msg: 'Este usuario ya Existe'
        });
    }
    else {
        try {
            yield user_1.default.create({
                username: username,
                password: passwordEncriptada
            });
            return res.json({
                msg: 'Usuario ' + username + ' creado Exitosamente',
            });
        }
        catch (error) {
            return res.status(500).json({
                msg: "Usuario y/o contraseña ya Existente.",
                error
            });
        }
    }
});
exports.newUser = newUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //Enceiptamos la contraseña:
    // Select *  from users where username = username  ---> 
    const verificar = yield user_1.default.findOne({ where: { username: username } }); // lo mismo ^
    // Validamos si el ususario existe en la Base de Datos
    if (!verificar) {
        return res.status(400).json({
            msg: "El usuario: " + username + " no Existe"
        });
    }
    // Validamos la constraseña
    // Devuelve true or false -> 
    const passwordValid = yield bcrypt_1.default.compare(password, verificar.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: "La contraseña del usuario : " + username + " no es valida"
        });
    }
    //Generamos Tokken
    const token = jsonwebtoken_1.default.sign({
        username: username,
        password: password
    }, process.env.SECRET_KEY || 'pepito123');
    res.json(token);
});
exports.login = login;
