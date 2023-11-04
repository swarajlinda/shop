import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceId:{
        type:String,
        required: true 
    },
    customerName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        trim:true
    },
    phoneNumber:{
        type:String
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
    }
},{
    timestamps:true 
}
)

export const GenerateInvoice = mongoose.model("invoices", invoiceSchema);

