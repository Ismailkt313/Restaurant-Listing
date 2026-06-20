import { Router } from "express";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantService } from "./restaurant.service";
import { RestaurantRepository } from "./restaurant.repository";

const router = Router();
const repository = new RestaurantRepository();
const service = new RestaurantService(repository);
const controller = new RestaurantController(service);

router.route("/")
    .post(controller.createRestaurant)
    .get(controller.getAllRestaurants);

router.route("/:id")
    .get(controller.getRestaurantById)
    .put(controller.updateRestaurant)
    .delete(controller.deleteRestaurant);

export default router;
