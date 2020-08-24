import { Schema, model, Document } from 'mongoose'

interface ICategory extends Document {
  name: string,
  percentage: number
}

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  percentage: { type: Number, required: true }
})

export default model<ICategory>('Category', CategorySchema)
