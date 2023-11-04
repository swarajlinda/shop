import {app} from "../backend/app.js"
import {connectDB} from "./database/database.js"

//connet db
connectDB();

app.listen(process.env.PORT, ()=>{
    console.log(`server is wprking on port ${process.env.PORT} in ${process.env.NODE_ENV} mode `);  
})