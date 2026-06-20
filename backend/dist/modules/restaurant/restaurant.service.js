"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantService = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class RestaurantService {
    restaurantRepository;
    constructor(restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }
    async createRestaurant(data) {
        return await this.restaurantRepository.create(data);
    }
    async getAllRestaurants() {
        return await this.restaurantRepository.findAll();
    }
    async getRestaurantById(id) {
        const restaurant = await this.restaurantRepository.findById(id);
        if (!restaurant) {
            throw new AppError_1.AppError("Restaurant not found", 404);
        }
        return restaurant;
    }
    async updateRestaurant(id, data) {
        // Ensure the restaurant exists first
        await this.getRestaurantById(id);
        const updated = await this.restaurantRepository.update(id, data);
        if (!updated) {
            throw new AppError_1.AppError("Restaurant not found", 404);
        }
        return updated;
    }
    async deleteRestaurant(id) {
        // Ensure the restaurant exists first
        await this.getRestaurantById(id);
        const deleted = await this.restaurantRepository.delete(id);
        if (!deleted) {
            throw new AppError_1.AppError("Failed to delete restaurant", 500);
        }
    }
}
exports.RestaurantService = RestaurantService;
//# sourceMappingURL=restaurant.service.js.map