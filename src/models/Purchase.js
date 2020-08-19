const mongoose = require('mongoose')

const PurchaseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
})


mongoose.model("Purchase", PurchaseSchema)