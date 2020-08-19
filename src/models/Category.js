const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    percentage: { type: Number }
})


mongoose.model("Category", CategorySchema)