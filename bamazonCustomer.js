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
        		manager();
      		} 
      		else {
      			console.log('Enter either shop or work');
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
	]).then(function(anwser){
		// get the item_id entered and check it with the item_id in the database
		connection.query("SELECT * FROM products WHERE item_id=?", [anwser.id], function(err, result){
			for (var i = 0; i < result.length; i++){
				console.log("Item ID: " + result[i].item_id + " | Department: " + result[i].department_name + " | Product: " + result[i].product_name + " | Price: " + result[i].price);
				// Check to see if we have enough of the product for them to buy
					// 1. if not return Insufficient quantity!
					// Prevent order from going through
				if (anwser.units > result[i].stock_quantity){
					console.log('Insufficient quantity! ' + 'Here is the quantity available for purchase: ' + result[i].stock_quantity);
				}
				// 2. Have enough complete order 
					// Update mySQL Database
					// Show total cost of purchase 
				else {
					// connection.query("SELECT * FROM products WHERE item_id=?", [anwser.id], function(err, result){
					// for (var i = 0; i < result.length; i++){
					// 	console.log(result[i]);

					// 	console.log("Totat Cost: " + (result[i].price * anwser.units));
					// }



				connection.query("UPDATE products SET units =?", [(result[i].units - answer.units)] + "WHERE item_id=?", [answer.id], function(err, result){
						// var newUnits = (result[i].units - anwser.units);
						console.log("Totat Cost: " + (result[i].price * anwser.units));
					});
					};
				
			
		};
	
});
});
}
