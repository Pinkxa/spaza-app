module.exports = function(){
		
		this.getImage = function(product){
			     console.log("Product "+product)
				switch(product){
					case 'Imasi':
						return "amasi.png";
						break;
					case 'Milk 1l':
						return "milk.jpg";
						break;
					case 'Bread':
						return "bread.jpg";
						break;
					case 'Coke 500ml':
						return "coca.jpg";
						break;
					case 'Cream Soda 500ml':
						return "cremesoda.jpg";
						break;
					case 'Iwisa Pap 5kg':
						return "iwisa.jpg";
						break;
					case 'Top Class Soy Mince':
						return "top_class_soya_mince.jpg";
						break;
					case 'Fanta 500ml':
						return "fanta.png";
						break;
					case 'Chakalaka Can':
						return "chakalaka.jpg";
						break;
					case 'Gold Dish Vegetable Curry Can':
						return "gold_dish.JPG";
						break;
					case 'Shampoo 1 litre':
						return "shampoo.jpg";
						break;
					case 'Soap Bar':
						return "soap_bar.jpg";
						break;
					case 'Bananas - loose':
						return "bananas.jpg";
						break;
					case 'Apples - loose':
						return "bananas.jpg";
						break;
					case 'Mixed Sweets 5s':
						return "mixed_sweets.jpg";
						break;
					case 'Rose (plastic)':
						return "bananas.jpg";
						break;
					case 'Heart Chocolates':
						return "bananas.jpg";
						break;
					case 'Valentine Cards':
						return "bananas.jpg";
						break;
					case 'Dairy Products':
						return "dairy.jpg";
						break;
					case 'Bakery':
						return "bakery.jpg";
						break;
					case 'Canned Food':
						return "canned-foods.jpg";
						break;
					case 'Cold Beverages':
						return "beverages.jpg";
						break;
					case 'Bulk':
						return "bananas.jpg";
						break;
					case 'Soup':
						return "bananas.jpg";
						break;
					case 'Cosmetics':
						return "Cosmetics.jpg.jpg";
						break;
					case 'Fruit':
						return "fruit.jpg";
						break;
					case 'Confectionery':
						return "Confectionery.jpg";
						break;
					case 'Valentine Goodies':
						return "valentines.jpg";
						break;
					default:
						return 'default.jpg'}
		}
}