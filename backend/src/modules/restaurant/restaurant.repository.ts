import Restaurant from "./restaurant.model";
import { ICreateRestaurantDto, IUpdateRestaurantDto, IRestaurantRepository } from "./restaurant.types";

export class RestaurantRepository implements IRestaurantRepository {
    async create(data: ICreateRestaurantDto): Promise<Restaurant> {
        return await Restaurant.create(data);
    }

    async findAll(): Promise<Restaurant[]> {
        return await Restaurant.findAll({
            order: [["createdAt", "DESC"]],
        });
    }

    async findById(id: string): Promise<Restaurant | null> {
        return await Restaurant.findByPk(id);
    }

    async update(id: string, data: IUpdateRestaurantDto): Promise<Restaurant | null> {
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            return null;
        }
        return await restaurant.update(data);
    }

    async delete(id: string): Promise<boolean> {
        const deletedCount = await Restaurant.destroy({ where: { id } });
        return deletedCount > 0;
    }
}
