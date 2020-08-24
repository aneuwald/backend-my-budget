import { Types } from 'mongoose'

export const existOrError = (value: string | number | Date, msg: string): void => {
  if (!value) throw msg
  if (typeof value === 'string' && !value.trim()) throw msg
}

export const nullOrError = (value: string | number | null | undefined, msg: string) : void => {
  if (value) throw msg
}

export const biggerThan100 = (number: number, msg: string) : void => {
  if (number > 100) throw msg
}

export const equalsOrError = (valueA: string | number, valueB: string | number, msg: string) : void => {
  if (valueA !== valueB) throw msg
}

export const isNumberOrError = (number: number, msg: string) : void => {
  if (isNaN(number) || !number || number <= 0) throw msg
}

export const isDateOrError = (date: string, msg: string) : void => {
  if (isNaN(Date.parse(date))) throw msg
}

export const isPercentageOrError = (number: number, msg: string) : void => {
  if (isNaN(number) || !number) throw msg
  if (number < 0 || number > 100) throw msg
}

export const isObjectIdOrError = (oid: string | Types.ObjectId, msg: string) : void => {
  if (!Types.ObjectId.isValid(oid)) throw msg
  if (!oid) throw msg
}
