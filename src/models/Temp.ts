import { Schema, model, Document } from 'mongoose'

interface ITemp extends Document {
  temp: number,
  umid: number,
}

const TempSchema = new Schema({
  temp: { type: Number },
  umid: { type: Number }
}, {
  timestamps: true
})

export default model<ITemp>('Temp', TempSchema)
