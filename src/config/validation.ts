import mongoose from 'mongoose'

export const existOrError = (value, msg) => {
  if (!value) throw msg
  if (typeof value === 'string' && !value.trim()) throw msg
}

export const nullOrError = (value, msg) => {
  if (value) throw msg
}

export const biggerThan100 = (number, msg) => {
  if (number > 100) throw msg
}

export const equalsOrError = (valueA, valueB, msg) => {
  if (valueA != valueB) throw msg
}

export const isNumberOrError = (number, msg) => {
  if (isNaN(number) || !number || number <= 0) throw msg
}

export const isDateOrError = (date, msg) => {
  if (isNaN(Date.parse(date))) throw msg
}

export const isPercentageOrError = (number, msg) => {
  if (isNaN(number) || !number) throw msg
  if (number < 0 || number > 100) throw msg
}

export const isObjectIdOrError = (oid, msg) => {
  if (!mongoose.Types.ObjectId.isValid(oid)) throw msg
  if (!oid) throw msg
}
