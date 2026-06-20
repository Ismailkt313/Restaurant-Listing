import express from "express"
import cors from "cors"
import restaurantRoutes from "./modules/restaurant/restaurant.routes"
import { errorMiddleware } from "./shared/errors/error.middleware"

const app = express()

app.use(cors())
app.use(express.json())

// Mount modules
app.use("/api/restaurants", restaurantRoutes)

// Mount global error handler
app.use(errorMiddleware)

export default app