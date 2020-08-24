"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');

 const existOrError = (value, msg) => {
  if (!value) throw msg
  if (typeof value === 'string' && !value.trim()) throw msg
}; exports.existOrError = existOrError

 const nullOrError = (value, msg) => {
  if (value) throw msg
}; exports.nullOrError = nullOrError

 const biggerThan100 = (number, msg) => {
  if (number > 100) throw msg
}; exports.biggerThan100 = biggerThan100

 const equalsOrError = (valueA, valueB, msg) => {
  if (valueA !== valueB) throw msg
}; exports.equalsOrError = equalsOrError

 const isNumberOrError = (number, msg) => {
  if (isNaN(number) || !number || number <= 0) throw msg
}; exports.isNumberOrError = isNumberOrError

 const isDateOrError = (date, msg) => {
  if (isNaN(Date.parse(date))) throw msg
}; exports.isDateOrError = isDateOrError

 const isPercentageOrError = (number, msg) => {
  if (isNaN(number) || !number) throw msg
  if (number < 0 || number > 100) throw msg
}; exports.isPercentageOrError = isPercentageOrError

 const isObjectIdOrError = (oid, msg) => {
  if (!_mongoose.Types.ObjectId.isValid(oid)) throw msg
  if (!oid) throw msg
}; exports.isObjectIdOrError = isObjectIdOrError
