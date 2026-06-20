import dotenv from "dotenv"
import sequelize from "./config/database"
import app from "./app"

dotenv.config()
const port = process.env.PORT || 6000

const startServer = async () => {
    try {
        await sequelize.authenticate()
        console.log("Database connected successfully.")
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.error(`Error occurred while starting server: ${error}`)
    }
}

startServer()