"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_controller_1 = require("./restaurant.controller");
const restaurant_service_1 = require("./restaurant.service");
const restaurant_repository_1 = require("./restaurant.repository");
const router = (0, express_1.Router)();
const repository = new restaurant_repository_1.RestaurantRepository();
const service = new restaurant_service_1.RestaurantService(repository);
const controller = new restaurant_controller_1.RestaurantController(service);
router.route("/")
    .post(controller.createRestaurant)
    .get(controller.getAllRestaurants);
router.route("/:id")
    .get(controller.getRestaurantById)
    .put(controller.updateRestaurant)
    .delete(controller.deleteRestaurant);
exports.default = router;
//# sourceMappingURL=restaurant.routes.js.map