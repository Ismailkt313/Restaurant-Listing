"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantRepository = void 0;
const restaurant_model_1 = __importDefault(require("./restaurant.model"));
class RestaurantRepository {
    async create(data) {
        return await restaurant_model_1.default.create(data);
    }
    async findAll() {
        return await restaurant_model_1.default.findAll({
            order: [["createdAt", "DESC"]],
        });
    }
    async findById(id) {
        return await restaurant_model_1.default.findByPk(id);
    }
    async update(id, data) {
        const restaurant = await restaurant_model_1.default.findByPk(id);
        if (!restaurant) {
            return null;
        }
        return await restaurant.update(data);
    }
    async delete(id) {
        const deletedCount = await restaurant_model_1.default.destroy({ where: { id } });
        return deletedCount > 0;
    }
}
exports.RestaurantRepository = RestaurantRepository;
//# sourceMappingURL=restaurant.repository.js.map