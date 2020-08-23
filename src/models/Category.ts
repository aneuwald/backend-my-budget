import { Schema, model } from 'mongoose'

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  percentage: { type: Number }
})

export default model('Category', CategorySchema)
