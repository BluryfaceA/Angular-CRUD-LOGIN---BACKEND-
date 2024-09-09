import  Producto from '../models/producto'
import {Request, Response} from 'express'
import  bcrypt from 'bcrypt'
import user from '../models/user';
import { json } from 'sequelize';
import jwt from 'jsonwebtoken'

export const newUser = async (req: Request, res: Response) =>{


    const {username, password} =req.body;
    //Enceiptamos la contraseña:
    const passwordEncriptada = await bcrypt.hash(password, 10);
    // Select *  from users where username = username  ---> 
    const verificar  = await user.findOne({where: {username:username}})   // lo mismo ^
    
    if (verificar){ 

        res.status(400).json({
                msg: 'Este usuario ya Existe'
        })

    }else{

        try {

            await user.create({
        
                username: username,
                password: passwordEncriptada
            });
        
                return res.json({
                    msg: 'Usuario ' + username +   ' creado Exitosamente',
                    
                })
                
             } catch (error) {
        
                return res.status(500).json(  {
                    msg:  "Usuario y/o contraseña ya Existente.",
                    error
                })
             }


    }
   
    
 
    

}


export const login = async (req: Request, res: Response) =>{


     const {username, password} =req.body;
    //Enceiptamos la contraseña:
    
    // Select *  from users where username = username  ---> 
    const verificar: any  = await user.findOne({where: {username:username}})   // lo mismo ^
    // Validamos si el ususario existe en la Base de Datos
    if(!verificar){
        return res.status(400).json({
            msg: "El usuario: " + username +" no Existe"
        })
    }

    // Validamos la constraseña


    // Devuelve true or false -> 
    const passwordValid = await bcrypt.compare(password,verificar.password)
    if(!passwordValid){
        return res.status(400).json({
            msg: "La contraseña del usuario : " + username +" no es valida"
        })
    }



    //Generamos Tokken
   const token =  jwt.sign({
      username: username,
      password: password  
    },process.env.SECRET_KEY || 'pepito123');



    res.json(token)
    

}