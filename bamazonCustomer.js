var mysql = require('mysql');
var inquirer = require('inquirer'); 

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'Olivia13!',
  database: 'Bamazon'
});

connection.connect(function(err){
	if(err) throw err;
  	startShopping();
});

function startShopping(){
	inquirer.prompt ({
		name: "user",
		type: "input",
		message: "Do you want to shop or work?"
		}).then(function(anwser){
      		if (anwser.user.toLowerCase() === "shop") {
        		itemsForSale();
      		} 
      		else if (anwser.user.toLowerCase() === "work") {
        		console.log("If you would like to work please run node bamazonManager.js. Thank you!");
      		} 
      		else {
      			console.log('Enter either shop or work');
      			startShopping();
      		}
		});
}

// Display all items available for sale : id, name, price
function itemsForSale(){
	// gets all the items in the products table from the database
	connection.query("SELECT * FROM products", function(err, result){
		// loops through the results from the mySQL database
		for (var i = 0; i < result.length; i++){
			// logs the item_id, product_name & price
			console.log("Item ID: " + result[i].item_id + 
				"\n Item: " + result[i].product_name + 
				"\n Price: " + result[i].price + 
				"\n Stock Qty: " + result[i].stock_quantity +
				"\n -------------------------------");
		}
	// allows the buyer prompt to start after the items are listed
	buyer();
	});
}; 

// prompt user 
// two options: 
	// 1. ID of the product they would like to buy?
	// 2. How many units would you like to buy? 
function buyer(){
	inquirer.prompt([
	{
		type: 'input',
		name: 'id',
		message: 'What is the Item ID of the product you would like to buy?'
	},
	{
		type: 'input',
		name: 'units',
		message: 'How many units would you like to buy?'
	}
	]).then(function(buyerAnwser){
		var buyerID = buyerAnwser.id; 
		var buyerUnits = parseInt(buyerAnwser.units);

		connection.query("SELECT * FROM products WHERE item_id=?", [buyerID], function (err, result){
			for (var i = 0; i < result.length; i ++){
				var itemUnits = parseInt(result[i].stock_quantity);
				var firstPrice = (result[i].price).toFixed(2);
				var price = parseInt(firstPrice);
				var newStock = itemUnits - buyerUnits; 

			}
		// get the item_id entered and check it with the item_id in the database
				connection.query("UPDATE products SET ? WHERE ?", 
					[{
						stock_quantity: newStock
					},
					{
						item_id: buyerID
					}], function(err, result){
						console.log("You spent a total of: " + (buyerUnits * price) + "! Thank you for Shopping on Bamazon!");
					});
		});
});
}