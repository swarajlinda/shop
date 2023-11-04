import { Stock } from "../model/stock.js";

//create new stock
export const newStock = async (req, res) => {
  try {
    //extract data from body
    const {
      productName,
      productUnit,
      productUnitType,
      kharidAmount,
      productQnty,
      productCategory,
      wholesaleAmount,
      retailAmount,
      distributerName,
    } = req.body;

    console.log("working")
    console.log(req.body)
    //check the element
    if (
      !productName ||
      !productUnit ||
      !productUnitType ||
      !kharidAmount ||
      !productQnty ||
      !wholesaleAmount ||
      !retailAmount ||
      !productCategory||
      !distributerName
    ) {
      return res.status(400).json({
        success: false,
        message: "all field are required!",
      });
    }

    console.log("working 1")
    //assign productId
    const min = 1000000; // Minimum 7-digit number
    const max = 9999999; // Maximum 7-digit number
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const nextInvoiceId = `DSSTOCK${randomNumber}`;
    const stockId = nextInvoiceId;

    //calculate wholesale amount
    const totalAmount = productQnty * kharidAmount;

    //create entry on db
    const stock = await Stock.create({
      stockId,
      productName,
      productUnit,
      productUnitType,
      kharidAmount,
      productQnty,
      productCategory,
      totalAmount,
      wholesaleAmount,
      retailAmount,
      distributerName,
      submittedBy: req.user
    });

    return res.status(200).json({
      success: true,
      stock,
      message: "stock created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update existing stock
export const updateStock = async (req, res) => {
  //extract id
  const { id } = req.params;

  const {
    productName,
    productUnit,
    productUnitType,
    kharidAmount,
    productQnty,
    productCategory,
    wholesaleAmount,
    retailAmount,
    distributerName,
  } = req.body;

  try {
    console.log("working")
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }
    
    console.log("working2")

    // Find the stock and update
    const foundStock = await Stock.findById(id);

    console.log("working 3")

    if (!foundStock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    console.log("working 4")
   

    // Update only if the fields exist in the request body
    if (productName) foundStock.productName = productName;
    if (productUnit) foundStock.productUnit = productUnit;
    if (productUnitType) foundStock.productUnitType = productUnitType;
    if (productQnty) foundStock.productQnty = productQnty;
    if (wholesaleAmount) foundStock.wholesaleAmount = wholesaleAmount;
    if (kharidAmount) foundStock.kharidAmount = kharidAmount;
    if (retailAmount) foundStock.retailAmount = retailAmount;
    if (productCategory) foundStock.productCategory = productCategory;
    if (distributerName) foundStock.distributerName = distributerName;

    const tAmount = kharidAmount * productQnty
    foundStock.totalAmount = tAmount;
    foundStock.submittedBy = req.user

   // foundStock.totalAmount = totalAmount

    // Save changes to the database
    const updateStockDetails = await foundStock.save();

    // Return success response
    return res.status(200).json({
      success: true,
      updateStockDetails,
      message: "Updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete the stock
export const deleteStock = async (req, res) => {
  // extract id from params
  const { id } = req.params;

  try {
    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }

    //find all the task in db
    const stock = await Stock.findById(id);

    //delete the stock
    await stock.deleteOne();

    return res.status(200).json({
      success: true,
      message: " task deleted successfully!",
      stock,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//handle for all stock
export const getAllStock = async (req, res) => {
  try {
  
    //find all the task in db
    const stocks = await Stock.find({  });

    res.status(200).json({
      success: true,
      message: "all stocks fetched successfully!",
      stocks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



