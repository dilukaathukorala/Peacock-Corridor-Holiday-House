const router = require("express").Router();
let Inventory = require("../models/inventory");
const sendMail = require("../mail"); // Import sendMail

// Add inventory item
router.route("/add").post(async (req, res) => {
    try {
        const itemID = Number(req.body.itemID);
        const itemName = req.body.itemName;
        const description = req.body.description;
        const quantity = req.body.quantity;
        const price = req.body.price;

        const newInventory = new Inventory({
            itemID,
            itemName,
            description,
            quantity,
            price
        });

        await newInventory.save();
        res.status(201).json({ message: "Item Added" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Error adding item", error: err.message });
    }
});

// Get all details of inventory items
router.route("/").get(async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching inventory", error: err.message });
    }
});

// Get details of selected inventory item
router.route("/get/:id").get(async (req, res) => {
    try {
        const ID = req.params.id;
        const inventoryItems = await Inventory.findById(ID);
        if (!inventoryItems) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ status: "Item fetched", inventoryItems });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error fetching item", error: err.message });
    }
});

// Update inventory item
router.route("/update/:id").put(async (req, res) => {
    try {
        const ID = req.params.id;
        const { itemID, itemName, description, quantity, price } = req.body;

        const updateInventory = {
            itemID,
            itemName,
            description,
            quantity,
            price
        };

        const updatedItem = await Inventory.findByIdAndUpdate(ID, updateInventory, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ status: "Item details updated", updatedItem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error updating item", error: err.message });
    }
});

// Delete inventory item
router.route("/delete/:id").delete(async (req, res) => {
    try {
        const ID = req.params.id;
        const deletedItem = await Inventory.findByIdAndDelete(ID);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ status: "Item deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error deleting item", error: err.message });
    }
});

// Route to handle supplier requests
router.route("/supplier/request").post(async (req, res) => {
    const { items, message } = req.body;

    // Prepare email content
    const emailText = `${message}\nItems:\n` + items.map(item => `${item.itemName}: ${item.quantity}`).join('\n');

    try {
        await sendMail('supplier@example.com', 'Stock Request', emailText); // Send email to supplier
        res.status(200).json({ status: "Request sent and email delivered!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ status: "Error sending email", error: error.message });
    }
});

module.exports = router;
