export interface IRestaurant {
    id: string; // UUID
    name: string;
    address: string;
    contact_number: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICreateRestaurantDto {
    name: string;
    address: string;
    contact_number: string;
}

export interface IUpdateRestaurantDto {
    name?: string;
    address?: string;
    contact_number?: string;
}

export interface IRestaurantRepository {
    create(data: ICreateRestaurantDto): Promise<IRestaurant>;
    findAll(): Promise<IRestaurant[]>;
    findById(id: string): Promise<IRestaurant | null>;
    update(id: string, data: IUpdateRestaurantDto): Promise<IRestaurant | null>;
    delete(id: string): Promise<boolean>;
}

export interface IRestaurantService {
    createRestaurant(data: ICreateRestaurantDto): Promise<IRestaurant>;
    getAllRestaurants(): Promise<IRestaurant[]>;
    getRestaurantById(id: string): Promise<IRestaurant>;
    updateRestaurant(id: string, data: IUpdateRestaurantDto): Promise<IRestaurant>;
    deleteRestaurant(id: string): Promise<void>;
}
