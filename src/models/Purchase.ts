import { Schema, model, Document, Types } from 'mongoose'

interface IPurchase extends Document {
  name: string,
  price: number,
  description?: string,
  date: Date,
  category: Types.ObjectId
}

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

export default model<IPurchase>('Purchase', PurchaseSchema)
