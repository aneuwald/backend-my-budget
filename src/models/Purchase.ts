import { Schema, model } from 'mongoose'

const PurchaseSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
})

export default model('Purchase', PurchaseSchema)
