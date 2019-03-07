import firebase from 'react-native-firebase'

export function getPaymentOwed(artisanID) {
	console.log("Fetching amount due for" + (artisanID || "everyone"))
  	return (dispatch) => {
    	return new Promise(async (resolve) => {
    		//Fetch products
			let productSnapshot = await firebase.database().ref('products').once('value')
	      	let productObject = productSnapshot.val()

	      	//If artisan is specified, remove unrelated products
	      	if (artisanID){
		      	let artisanProductSnapshot = await firebase.database().ref(`artisans/${artisanID}/products`).once('value')
		      	let productKeys = Object.keys(artisanProductSnapshot.val())
		      	
		      	productObject = Object.keys(productObject)
				  .filter(key => productKeys.includes(key))
				  .reduce((obj, key) => {
				    obj[key] = productObject[key];
				    return obj;
				  }, {})
	      	}

	      	//Fetch transactions
	      	let transSnapshot = await firebase.database().ref('transactions').once('value')
	      	let transactionObject = transSnapshot.val()
	      	let amountOwed = 0

	      	//Loop through transactions and calculate amount owed
	      	for (var transactionID in transactionObject) {
	      		let transactionProd = productObject[transactionObject[transactionID].productID]
	      		//Only add to sum if product is part of products obj
	      		//...This is functional for specifying artisans
	      		if (transactionProd) {
	      			amountOwed += (transactionObject[transactionID].numSold * transactionProd.StandardPrice)	
	      		}
	      	}

	      	//amountOwed = (transactionObject["transactionID"].numSold)

	      	//This is basically getAlreadyPaid() but not sure how to connect as redux actions  	
	      	//**********
			let payoutsSnapshot = await firebase.database().ref('payouts').once('value')
	      	let payoutsObject = payoutsSnapshot.val()
	      	let paidAmount = 0

	      	//Loop through payments and calculate total
	      	for (var payoutsID in payoutsObject) {
	      		if ((artisanID == null) || payoutsObject[payoutsID].artisanID == artisanID) {
	      			paidAmount += payoutsObject[payoutsID].amount	
	      		}
	      	} 
	      	//**********

	      	amountOwed = amountOwed - paidAmount
			amountOwed=Math.round(amountOwed * 100) / 100

	      	resolve()
	      	dispatch({ type: 'GET_AMOUNT_OWED', amountOwed: amountOwed })
    	})
	}
}

export function getAlreadyPaid(artisanID) {
	console.log("Fetching amount already paid for" + (artisanID || "everyone"))
  	return (dispatch) => {
    	return new Promise(async (resolve) => {
    		//Fetch payouts
			let payoutsSnapshot = await firebase.database().ref('payouts').once('value')
	      	let payoutsObject = payoutsSnapshot.val()
	      	let paidAmount = 0
	      	
	      	//Loop through payments and calculate total
	      	for (var payoutsID in payoutsObject) {
	      		if ((artisanID == null) || payoutsObject[payoutsID].artisanID == artisanID) {
	      			paidAmount += payoutsObject[payoutsID].amount	
	      		}
	      	} 

	      	paidAmount=Math.round(paidAmount * 100) / 100

	      	resolve()
	      	dispatch({ type: 'GET_AMOUNT_PAID', paidAmount: paidAmount })
    	})
	}
}