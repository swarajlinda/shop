import express  from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { allIKhataInvoice, allInvoiceFromKhata, newKhataInvoice } from "../controller/CustomerKhataController.js";

const router = express.Router()




//routes for add the item
router.post("/:id", isAuthenticated, newKhataInvoice)

//routes for update the item
// router.put("/:id", isAuthenticated, itemUpdate)

//delete the item 
// router.delete("/:id", isAuthenticated, deleteItem)

// get all khata invoices 
router.get("/all", isAuthenticated, allInvoiceFromKhata)

//get all the khata of specific user
router.get("/:id", isAuthenticated, allIKhataInvoice)


export default router