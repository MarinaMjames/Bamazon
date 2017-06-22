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
  	manager();
});

function manager(){
inquirer.prompt([
	{
		type: 'list',
		name: 'ManagerOptions',
		message: 'Hello Manager! What would you like to do?',
		choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
	}
	]).then(function(anwser){
		// console.log(anwser.ManagerOptions);
		var managerChoice = anwser.ManagerOptions;

		if ( managerChoice === 'View Products for Sale'){
			itemsForSale();
		}
		if (managerChoice === 'View Low Inventory'){
			lowInventory();
		}
		if (managerChoice === 'Add to Inventory'){
			addInventory();
		}
		if (managerChoice === 'Add New Product'){
			newProduct();
		}

	});
}

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
	});
};

function lowInventory(){
connection.query("SELECT * FROM products WHERE stock_quantity<=5", function(err, result){
		// loops through the results from the mySQL database
		for (var i = 0; i < result.length; i++){

			// logs the item_id, product_name & price
			console.log("Item ID: " + result[i].item_id + 
				"\n Item: " + result[i].product_name + 
				"\n Price: " + result[i].price + 
				"\n -------------------------------");
		}
	}); 
}

function addInventory(){
inquirer.prompt([
	{
		type: 'input',
		name: 'item_id',
		message: 'What item id would you like to update the stock for?'
	},
	{
		type: 'input',
		name: 'stock_quantity',
		message: 'How many would you like to stock?'
	}
	]).then(function(anwser){
		// console.log(anwser.stock_quantity);
		connection.query("UPDATE products SET stock_quantity=?", [result[i].stock_quantity + anwser.stock_quantity], "WHERE item_id=?", [anwser.item_id], function(err, result){
		// loops through the results from the mySQL database
		for (var i = 0; i < result.length; i++){

			// logs the item_id, product_name & price
			console.log("Item ID: " + result[i].item_id + 
				"\n Item: " + result[i].product_name + 
				"\n Price: " + result[i].price + 
				"\n -------------------------------");
		}
	});
});
}

function newProduct(){
	inquirer.prompt([
	{
		type: 'input',
		name: 'product_name',
		message: 'What item would you like to add?'
	}, 
	{
		type: 'input',
		name: 'department_name',
		message: 'What department is this item in?'
	},
	{
		type: 'input',
		name: 'price',
		message: 'How much does this item cost?'
	},
	{
		type: 'input',
		name: 'stock_quantity',
		message: 'How many would you like to stock?'
	}
	]).then(function(anwser){
		connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ()", function(err, result){
		// loops through the results from the mySQL database
		for (var i = 0; i < result.length; i++){

			// logs the item_id, product_name & price
			console.log("Item ID: " + result[i].item_id + 
				"\n Item: " + result[i].product_name + 
				"\n Price: " + result[i].price + 
				"\n -------------------------------");
		}
	});
});
}