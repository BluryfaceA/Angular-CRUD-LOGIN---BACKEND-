import { Request,Response,NextFunction } from "express";
import jsw from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction)=>{
 
    //Obtenemos el token del login
    const headerToken = req.headers['authorization'];
    console.log(headerToken);
    if(headerToken != undefined && headerToken.startsWith('Bearer ')){
        //Tiene Token
        try {
          
            const bearerToken = headerToken.slice(7);
            //El verify verifica que el token no este expirado
            // Recordamos que cuando nos logeamos creamos un tokken y con ese tendremos acceso a la lista de productos
            jsw.verify(bearerToken,process.env.SECRET_KEY || 'pepito123')
            next()
            
        } catch (error) {

            res.status(401).json({
                msg: 'token no valido'
            }) 
        }

    }else{
        res.status(401).json({
            msg: " Acceso Denegado"
        })
    }
 
}

export default validateToken