import { ICreateRestaurantDto, IUpdateRestaurantDto, IRestaurant, IRestaurantRepository, IRestaurantService } from "./restaurant.types";
import { AppError } from "../../shared/errors/AppError";

export class RestaurantService implements IRestaurantService {
    private restaurantRepository: IRestaurantRepository;

    constructor(restaurantRepository: IRestaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    async createRestaurant(data: ICreateRestaurantDto): Promise<IRestaurant> {
        return await this.restaurantRepository.create(data);
    }

    async getAllRestaurants(): Promise<IRestaurant[]> {
        return await this.restaurantRepository.findAll();
    }

    async getRestaurantById(id: string): Promise<IRestaurant> {
        const restaurant = await this.restaurantRepository.findById(id);
        if (!restaurant) {
            throw new AppError("Restaurant not found", 404);
        }
        return restaurant;
    }

    async updateRestaurant(id: string, data: IUpdateRestaurantDto): Promise<IRestaurant> {
        // Ensure the restaurant exists first
        await this.getRestaurantById(id);
        const updated = await this.restaurantRepository.update(id, data);
        if (!updated) {
            throw new AppError("Restaurant not found", 404);
        }
        return updated;
    }

    async deleteRestaurant(id: string): Promise<void> {
        // Ensure the restaurant exists first
        await this.getRestaurantById(id);
        const deleted = await this.restaurantRepository.delete(id);
        if (!deleted) {
            throw new AppError("Failed to delete restaurant", 500);
        }
    }
}
