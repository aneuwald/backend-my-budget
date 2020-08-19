const mongoose = require('mongoose')

module.exports = {
    existOrError: (value, msg) => {
        if (!value) throw msg
        if (typeof value == 'string' && !value.trim()) throw msg
    },

    nullOrError: (value, msg) => {
        if (value) throw msg
    },

    biggerThan100(number, msg) {
        if(number > 100) throw msg
    },

    equalsOrError(valueA, valueB, msg) {
        if(valueA != valueB) throw msg
    },

    isNumberOrError(number, msg) {
        if (isNaN(number) || !number || number <= 0) throw msg
    },

    isNumberOrError(date, msg) {
        if (isNaN(Date.parse(date))) throw msg
    },  

    isPercentageOrError(number, msg) {
        if (isNaN(number) || !number) throw msg
        if (number < 0 || number > 100) throw msg
    },  

    isObjectIdOrError(oid, msg) {
        if(!mongoose.Types.ObjectId.isValid(oid)) throw msg
        if(!oid) throw msg
    }
}