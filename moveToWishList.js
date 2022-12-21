// Original code writen by @kyletmiller in a comment on https://gist.github.com/MichaelLawton/ec73c321d62d1b4eaf0f51ca478ccd92#gistcomment-3005931
function moveToWishList() {
	/*
	* Variable to hold all items that can be moved to a wish list
	*/
	var query = document.querySelectorAll("#sc-saved-cart input[value='Add to list']")
	/*
	* The query2 variable needs to be changed.
	* You'll need to view the source of your Shopping Cart page to get the list/registry ID 
	* of your specific list to save them to (should look something like "#cldd-add-item-declarative-XXXXXXXXXXXXX").
	*/
	var query2 = document.querySelectorAll("#cldd-add-item-declarative-XXXXXXXXXXXXX a")

	/*
	* The first variable finds the number of saved items you have
	* The second variable finds how many car items you have.
	* totalItems is the sum of all items from your cart and saved item list.
	* 
	*/
	var savedItems = document.getElementById('sc-saved-cart-list-caption-text').getAttribute('data-saved-item-quantity');
	var cartItems = document.getElementById("nav-cart-count").innerText;
	var totalItems = savedItems + cartItems;
	
	//Loop until finished
	while(totalItems > 0) {
	//Check that our saved items hasn't reached zero index yet
	if (totalItems.length > 0) {
		//Check that there is a wish list option for items
		if(query.length) {
			query[0].click();
		}
		//Check for the proper registry list (MAKE SURE TO CHANGE QUERY2 VARIABLE)
		if (query2.length) {
			query2[0].click();
		}
		//The list isn't zero but no wish list option was found, wait for the page to refresh more saved items
		else if (!query.length) {
		setTimeout(deleteSavedItems, 500);
		}
	}
	//Quickly moves the items that are present
	if (query.length > 1) {
		setTimeout(deleteSavedItems,35);
	}
	savedItems--;
	}	
}
moveToWishList();
