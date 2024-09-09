import AsyncQueue from 'sequelize/types/dialects/mssql/async-queue';
import Producto from '../models/producto'
import {Request, Response} from 'express'

 // Para Obtener Productos
 
 export const getProducts = async (req: Request, res: Response)=> {
   //El await espera a recibir algo
    const listProductos =  await Producto.findAll();
    res.json(listProductos);

 }

 //Obtener un solo Producto
 export const getProduct = async (req: Request, res: Response)=> {
   const {id} = req.params;
   const producto =  await Producto.findByPk(id);

   if(producto){
      res.json(producto);
   }else{


      res.status(404).json({
         msg: `No existe un Producto con el ID: ${id}`
      })
   }

    

 }

//Eliminar Productos
 export const deleteProduct = async (req: Request, res: Response)=> {

   const {id} = req.params;
   const producto =  await Producto.findByPk(id);

   if(!producto){
      res.status(404).json({
         msg: `No existe un Producto con el ID: ${id}`
      })
   }else{
      //Eliminamos la promesa "El prducto"
      await producto.destroy();
      res.json({
         msg: 'Producto Eliminado Correctamente'
      })
   }

 }

 //Añadir un Producto

 export const postProduct = async (req: Request, res: Response)=> {
    //--> Es como pasarle un  producto con todas sus variables 
    const {body} =req;
try {
   await Producto.create(body);
   return res.json({
       msg: 'Producto Agregado Exitosamente',
       
   })
   
} catch (error) {
   return res.status(500).json(error)
}
   




 }



 //Actualizar un Producto

 export const updateProduct = async (req: Request, res: Response)=> {
    //--> Es como pasarle un  producto con todas sus variables 
    const {body} =req;
    const {id} = req.params;

    const producto =  await Producto.findByPk(id);

    
   if(producto){
      try {
      await producto.update(body);
      res.json({
         msg: 'Producto Actualizado con Éxito',
         
      })

      } catch (error) {
         console.log(error);
      }
      
   }else{

      res.status(404).json({
         msg: `No existe un Producto con el ID: ${id}`
      })

   }

    //

    
}

