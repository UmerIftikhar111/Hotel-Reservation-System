const InventoryItem = require('../Models/InventoryItem');
const Order = require('../Models/Order');

// Get all inventory items

let getInventory = async (req, res) => {
  try {
    const inventory = await InventoryItem.find();
    res.status(200).json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Couldnt fetch inventory' });
  }
}

// Get a specific inventory item by ID
let getSpecificInventoryItem = async (req, res) => {
  try {
    const { id }= req.query;
    const inventoryItem = await InventoryItem.findById(id);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory Item not found' });
    }
    res.status(200).json(inventoryItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: Couldnt fetch inventory item' });
  }
}

// Search for inventory items by name
let searchInventory =  async (req, res) => {
  const { query } = req.query;
  try {
    const inventory = await InventoryItem.find({
      name: { $regex: query, $options: 'i' },
    });
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error: No such inventory item found' });
  }
};

// Add a new item to the inventory
let addItem =  async (req, res) => {
    const { name, description, quantity, price } = req.body;
  
    try {
      // Create a new inventory item
      const inventoryItem = new InventoryItem({
        name,
        description,
        quantity,
        price,
      });
  
      // Save the inventory item to the database
      await inventoryItem.save();
  
      res.json({ message: 'Item added to inventory successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

// Place an order for an inventory item
let placeOrder =  async (req, res) => {
  const { itemId, quantity } = req.body;

  try {
    const inventoryItem = await InventoryItem.findById(itemId);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory Item not found' });
    }   
    // Calculate the total price
    const totalPrice = inventoryItem.price * quantity;

    // Create a new order
    const order = new Order({
      itemId,
      quantity,
      totalPrice,
    });

    // Save the order
    await order.save();

    // Update the quantity of the inventory item
    inventoryItem.quantity -= quantity;
    await inventoryItem.save();

    res.json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
    placeOrder
    ,getInventory,
    getSpecificInventoryItem,
    searchInventory,
    addItem
}

