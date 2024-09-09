import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

 const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
},{
    //Para no generar un Created at y updatedAt
    timestamps: false 
} )


export default Product; 
