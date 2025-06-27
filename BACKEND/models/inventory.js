const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    itemID: {
        type: Number,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
