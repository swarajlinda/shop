import express  from "express";
import { allInvoice, newInvoice } from "../controller/GenerateInvoice.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router()




//routes for add the item
router.post("/new", isAuthenticated, newInvoice)

//routes for update the item
// router.put("/:id", isAuthenticated, itemUpdate)

//delete the item 
// router.delete("/:id", isAuthenticated, deleteItem)

//get all the khata of specific user
router.get("/all", isAuthenticated, allInvoice)


export default router