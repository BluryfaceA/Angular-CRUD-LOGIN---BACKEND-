import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

 const user = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{
    //Para no generar un Created at y updatedAt
    timestamps: false 
} )


export default user; 
 