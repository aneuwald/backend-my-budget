"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');






const UserSchema = new (0, _mongoose.Schema)({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true
})

exports. default = _mongoose.model('User', UserSchema)
