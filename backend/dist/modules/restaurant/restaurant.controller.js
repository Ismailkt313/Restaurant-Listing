"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantController = void 0;
const restaurant_validation_1 = require("./restaurant.validation");
class RestaurantController {
    restaurantService;
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }
    createRestaurant = async (req, res, next) => {
        try {
            const validatedData = restaurant_validation_1.createRestaurantSchema.parse(req.body);
            const restaurant = await this.restaurantService.createRestaurant(validatedData);
            res.status(201).json({
                status: "success",
                data: restaurant,
            });
        }
        catch (error) {
            next(error);
        }
    };
    getAllRestaurants = async (req, res, next) => {
        try {
            const restaurants = await this.restaurantService.getAllRestaurants();
            res.status(200).json({
                status: "success",
                results: restaurants.length,
                data: restaurants,
            });
        }
        catch (error) {
            next(error);
        }
    };
    getRestaurantById = async (req, res, next) => {
        try {
            const id = req.params.id;
            const restaurant = await this.restaurantService.getRestaurantById(id);
            res.status(200).json({
                status: "success",
                data: restaurant,
            });
        }
        catch (error) {
            next(error);
        }
    };
    updateRestaurant = async (req, res, next) => {
        try {
            const id = req.params.id;
            const validatedData = restaurant_validation_1.updateRestaurantSchema.parse(req.body);
            const restaurant = await this.restaurantService.updateRestaurant(id, validatedData);
            res.status(200).json({
                status: "success",
                data: restaurant,
            });
        }
        catch (error) {
            next(error);
        }
    };
    deleteRestaurant = async (req, res, next) => {
        try {
            const id = req.params.id;
            await this.restaurantService.deleteRestaurant(id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    };
}
exports.RestaurantController = RestaurantController;
//# sourceMappingURL=restaurant.controller.js.map