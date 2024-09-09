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
exports.updateProduct = exports.postProduct = exports.deleteProduct = exports.getProduct = exports.getProducts = void 0;
const producto_1 = __importDefault(require("../models/producto"));
// Para Obtener Productos
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //El await espera a recibir algo
    const listProductos = yield producto_1.default.findAll();
    res.json(listProductos);
});
exports.getProducts = getProducts;
//Obtener un solo Producto
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield producto_1.default.findByPk(id);
    if (producto) {
        res.json(producto);
    }
    else {
        res.status(404).json({
            msg: `No existe un Producto con el ID: ${id}`
        });
    }
});
exports.getProduct = getProduct;
//Eliminar Productos
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield producto_1.default.findByPk(id);
    if (!producto) {
        res.status(404).json({
            msg: `No existe un Producto con el ID: ${id}`
        });
    }
    else {
        //Eliminamos la promesa "El prducto"
        yield producto.destroy();
        res.json({
            msg: 'Producto Eliminado Correctamente'
        });
    }
});
exports.deleteProduct = deleteProduct;
//Añadir un Producto
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //--> Es como pasarle un  producto con todas sus variables 
    const { body } = req;
    try {
        yield producto_1.default.create(body);
        return res.json({
            msg: 'Producto Agregado Exitosamente',
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.postProduct = postProduct;
//Actualizar un Producto
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //--> Es como pasarle un  producto con todas sus variables 
    const { body } = req;
    const { id } = req.params;
    const producto = yield producto_1.default.findByPk(id);
    if (producto) {
        try {
            yield producto.update(body);
            res.json({
                msg: 'Producto Actualizado con Éxito',
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        res.status(404).json({
            msg: `No existe un Producto con el ID: ${id}`
        });
    }
    //
});
exports.updateProduct = updateProduct;
