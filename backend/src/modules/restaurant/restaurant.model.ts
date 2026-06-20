import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../config/database";
import { IRestaurant } from "./restaurant.types";

interface RestaurantCreationAttributes extends Optional<IRestaurant, "id"> {}

class Restaurant extends Model<IRestaurant, RestaurantCreationAttributes> implements IRestaurant {
    declare id: string;
    declare name: string;
    declare address: string;
    declare contact_number: string;
    declare email?: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Restaurant.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "restaurants",
        underscored: true,
        timestamps: true,
    }
);


export default Restaurant;