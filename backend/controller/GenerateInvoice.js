import { GenerateInvoice } from "../model/invoice.js";

export const newInvoice = async (req, res) => {
  console.log(req.body);

  try {
    const {
      invoiceId,
      customerName,
      address,
      phoneNumber,
      paidAmount,
      paymentMode,
      items,
      quantities,
      prices,
      totalAmount,
    } = req.body;

    // Check all the fields and if items, quantities, prices are arrays
    if (!invoiceId || !customerName || !totalAmount) {
      return res.status(400).json({
        success: false,
        message:
          "All fields required and items, quantities, prices must be arrays!",
      });
    }

    //check payment is less than eqaul to total amount
    let dueAmt = 0;
    if (paidAmount <= totalAmount) {
      dueAmt = totalAmount - paidAmount;
    }
    console.log("working");
    console.log(dueAmt);

    // // Create entry in the database
    const invoice = await GenerateInvoice.create({
      invoiceId,
      customerName,
      address,
      phoneNumber,
      paidAmount,
      dueAmount: dueAmt,
      paymentMode,
      items,
      quantities,
      prices,
      totalAmount,
    });

    //find invoice
    const foundInvoice = await GenerateInvoice.findOne({
      invoiceId: invoiceId,
    });

    if (foundInvoice) {
      console.log("working1");
      console.log(foundInvoice.paidAmount);
      console.log(foundInvoice.totalAmount);

      // Check if paidAmount is equal to totalAmount
      if (foundInvoice.paidAmount == foundInvoice.totalAmount) {
        // Update the isPaymentDone
        foundInvoice.isPaymentDone = true;

        console.log("working2");
        console.log(foundInvoice.isPaymentDone);
        // Save the changes
        await foundInvoice.save();

        return res.status(200).json({
          success: true,
          foundInvoice,
          message: "Invoice updated successfully. No due amount.",
        });
      } else {
        return res.status(200).json({
          success: true,
          invoice,
          message: "Invoice added successfully!",
        });
      }
    } else {
      return res.status(200).json({
        success: true,
        invoice,
        message: "Invoice added successfully! but Invoice not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const allInvoice = async (req, res) => {
  try {
    //find all the task in db
    const stocks = await GenerateInvoice.find({});

    return res.status(200).json({
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
