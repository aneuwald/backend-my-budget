"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');









const PurchaseSchema = new (0, _mongoose.Schema)({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  category: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
})

exports. default = _mongoose.model('Purchase', PurchaseSchema)
