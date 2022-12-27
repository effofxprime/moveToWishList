// Original code writen by @kyletmiller in a comment on https://gist.github.com/MichaelLawton/ec73c321d62d1b4eaf0f51ca478ccd92#gistcomment-3005931
/*
Usage:
	1. edit the wishListID variable to the ID of your wishlist that you wish to use (heh, pun).
			+ Can be found by first clicking on "Add to list", then Inspecting (Ctrl + Shift + C for firefox), Ctrl + F search for "cldd-add-item-declarative" then finding the right one which highlights the wishlist you want to use.
			(Search up "Inspect keybind for X browser", replacing X with your browser name if you are not using firefox)
	2. Paste entire script into browser console. (Ctrl + Shift + K on firefox, again, search for this keybind for your browser if not firefox)
	3. Press ENTER key.
	4. Sit back and watch, or get a Coffee, or both ... or neither!

Timing Issues:
	Edit the number in every "setTimeout" command, in miliseconds, to whatever works for you.
		(Note; if possible, in future iterations a variable with the delay timer could be used. For now, each command would need editing.)
		Each timer is in miliseconds, longer page loading will need you to increase this. Default delays *should* be ok.
		
Possible future versions could include:
	* A second timing option (Timer for executing the second action after the first, then another timer for the delay before starting the first action again for the next item.)
	* Delete function with a toggle, in case you want to delete everything after moving all items.
	* Fix retry if wishList hadn't loaded yet.
*/
			
var wishListID = "XXXXXXXXXXXXX"; // Change X's to your wishlist ID, read Usage section on how to find.
// var actionTiming = 5000; // Delay in ms, change to your needs - to be fixed?

// Set X items
function countItems() {
	var savedItems = document.getElementById('sc-saved-cart-list-caption-text').getAttribute('data-saved-item-quantity');
	console.log(savedItems);
	actionOne(savedItems);
}

// Action 1/2 - Click "Add to list", open wishList dropdown.
function actionOne(savedItems, counter) {
	// Setting up a counter so we can tell this script to stop trying.
	if (counter === undefined) {
		var counter = 0;
	}
	// find "Add to list", then click it.
	var addList = document.querySelectorAll("#sc-saved-cart input[value='Add to list']");
	console.log(addList);
	if (savedItems !== 0 && counter != 10) { // If the counter (mentioned below) reaches 10 we will stop attempting.
		addList[0].click();
		console.log('Waiting...');
		setTimeout(actionTwo,500,savedItems, counter); // 500ms delay
		// Add to list variable gets reset, just the way we like it.
	}
// Action 2/2 - Add to wishList
function actionTwo(savedItems, counter) {
	console.log('Returning to next action');
	// find wishlist item in dropdown that I HOPE loaded.
	console.log('Setting wishList var');
	console.log("#cldd-add-item-declarative-" + wishListID + " a");
	wishList = document.querySelectorAll("#cldd-add-item-declarative-" + wishListID + " a");
	/* If we were a little too quick for the wishlist to load, we will try again.
		Though we will add to a counter, as we do not want to keep doing this forever!!
	*/
	if ( wishList === undefined ) {
	/* This SHOULD work, but firefox drops a TypeError and stops the script.
		Hopefully will find a workaround if one is possible in a future iteration of the script.
	*/
		console.log('Retrying!');
		counter++;
		actionMan(savedItems, counter);
	} else {
	// Looks like everything went well for this item, we will now click the wishlist to put the item into.
		console.log(wishList);
		wishList[0].click();
	// Minus 1 from savedItems, so we know when we are done with this one!
		savedItems--;
	// also reset the counter, as we only care about per item basis!
		counter = 0;
	// Run the first action again for the next item in the list.
	setTimeout(actionOne,500,savedItems,counter);
	}
}
if ( savedItems == 0 ){
	console.log('Done!');
}
}
countItems(wishListID);