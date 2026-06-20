import express from "express"
import cors from "cors"
import restaurantRoutes from "./modules/restaurant/restaurant.routes"
import { errorMiddleware } from "./shared/errors/error.middleware"

const app = express()

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-side calls)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "https://restaurant-listing-nine.vercel.app"
      ];

      // Allow any local origin (e.g. http://localhost:5173 or http://127.0.0.1:5174)
      const isLocal = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

      if (allowedOrigins.includes(origin) || isLocal) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  })
);
app.use(express.json())

// Mount modules
app.use("/api/restaurants", restaurantRoutes)

// Mount global error handler
app.use(errorMiddleware)

export default app
