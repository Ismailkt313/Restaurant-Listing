import dotenv from "dotenv"
import app from "./app"

dotenv.config()

app.listen(6000,() => {
    console.log("its running in backend side")
})