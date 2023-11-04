import mongoose from "mongoose";

const khataSchema = new mongoose.Schema({
    invoiceId:{
        type:String,
        required: true 
    },
    paidAmount:{
        type:Number
    },
    dueAmount:{
        type:Number
    },
    isPaymentDone:{
        type:Boolean,
        default:false
    },
    paymentMode:{
        type:String
    },
    items:[
        {type:String}
    ],
    prices:[
        {type:String}
    ],
    quantities:[
        {type:String}
    ],
    totalAmount:{
        type:Number,
    },
    buyerDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"buyerdetails"
    }
},{
    timestamps:true 
}
)

export const KhataInvoices = mongoose.model("regularcustomerinvoices", khataSchema);

