const jwt = require('jsonwebtoken')
require('dotenv').config()
const {verifyuserloggedin,checkAdmin} = require('../authenticate')
const {placeOrder ,getInventory, getSpecificInventoryItem,searchInventory,addItem} = require('../Controller/InventoryController')

const InventoryRouter = require("express").Router()

InventoryRouter.post( "/add-item" , addItem )
InventoryRouter.post( "/place-order" , placeOrder )
InventoryRouter.get( "/get-inventory" , getInventory )
InventoryRouter.get( "/get-specific-item", getSpecificInventoryItem )
InventoryRouter.get('/search-inventory', searchInventory)

module.exports = InventoryRouter