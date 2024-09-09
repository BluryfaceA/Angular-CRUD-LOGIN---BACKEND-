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
//Instacia del servidor
0; ///Express es un marco de aplicación web para Node.js que simplifica el desarrollo de aplicaciones web y APIs. 
//Proporciona una capa delgada sobre Node.js, facilitando la creación de servidores web y la gestión de rutas, middleware, solicitudes y respuestas. 
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//Importamos , para poder usar los metodos a la BD
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const producto_1 = __importDefault(require("./producto"));
const user_2 = __importDefault(require("./user"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3001";
        this.listen();
        //Colacar antes de los routes-->  "Siempre", para obtener los body.
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        //Que funcione la Api
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API Working'
            });
        });
        //Evalua la url
        this.app.use('/api/products', product_1.default);
        this.app.use('/api/user', user_1.default);
    }
    midlewares() {
        //Para poder obtener los datos del body de PRODUCTOS (O CUALQUIER INSTANCIA DE BODY)
        this.app.use(express_1.default.json());
        //Cors PARA QUE EL FRONT PUEDA ACCEDER AL BACKEND
        this.app.use((0, cors_1.default)());
    }
    //Conectar a la BD
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield producto_1.default.sync();
                yield user_2.default.sync();
                console.log("Base de Datos Conectada");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Server;
