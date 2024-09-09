//Instacia del servidor
0///Express es un marco de aplicación web para Node.js que simplifica el desarrollo de aplicaciones web y APIs. 
//Proporciona una capa delgada sobre Node.js, facilitando la creación de servidores web y la gestión de rutas, middleware, solicitudes y respuestas. 
import express  ,{Application,Request,Response}from 'express';
import cors from 'cors'

//Importamos , para poder usar los metodos a la BD
import  routesproducto from '../routes/product'
import  routesUsers from '../routes/user'


//Importamos la conexion a la base de datos
import  db from '../db/connection'
import Product from './producto';
import user from './user';


class Server{

private app: express.Application;
private port: string;

constructor(){
    
    this.app = express();
    this.port = process.env.PORT || "3001";
    this.listen();
    //Colacar antes de los routes-->  "Siempre", para obtener los body.
    this.midlewares();
       
    this.routes();
    this.dbConnect();
   
}
    
listen() {
    this.app.listen(this.port, () => {
        console.log(`Aplicacion corriendo en el puerto ${this.port}`)
    })
}

routes(){
    //Que funcione la Api
    this.app.get('/',(req: Request,res: Response)=>{
        
        res.json({
            msg: 'API Working'
        })
    })
    
    //Evalua la url
    this.app.use('/api/products', routesproducto)
    this.app.use('/api/user', routesUsers)
}


midlewares(){
         
    //Para poder obtener los datos del body de PRODUCTOS (O CUALQUIER INSTANCIA DE BODY)
    this.app.use(express.json());

    //Cors PARA QUE EL FRONT PUEDA ACCEDER AL BACKEND
    this.app.use(cors());

}


  //Conectar a la BD
  async dbConnect(){

    try {
    await Product.sync()
    await user.sync()
    console.log("Base de Datos Conectada")
    } catch (error) {
        console.log(error)
        
        
    }
    
}



}

export default  Server;