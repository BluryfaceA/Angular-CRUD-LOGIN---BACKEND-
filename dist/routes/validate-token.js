"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    //Obtenemos el token del login
    const headerToken = req.headers['authorization'];
    console.log(headerToken);
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        //Tiene Token
        try {
            const bearerToken = headerToken.slice(7);
            //El verify verifica que el token no este expirado
            // Recordamos que cuando nos logeamos creamos un tokken y con ese tendremos acceso a la lista de productos
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'pepito123');
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'token no valido'
            });
        }
    }
    else {
        res.status(401).json({
            msg: " Acceso Denegado"
        });
    }
};
exports.default = validateToken;
