import * as firebase from 'react-native-firebase'

export function fetchPayouts(cgaID) {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      let snapshot = await firebase.database().ref(`amazonUsers/${cgaID}/payouts`).once('value')
      let payoutIds = snapshot.val() ? Object.keys(snapshot.val()) : []
      let payouts = (await firebase.database().ref('payouts').once('value')).val()

      payoutsArray = []

      for (var uid in payouts) {
        if (payoutIds.includes(uid)) {
          payoutsArray.push({
            ...payouts[uid],
            uid: uid
          })
        }
      }

      resolve()
      dispatch({ type: 'GET_PAYOUTS', payouts: payoutsArray })
    })
  }
}

export function logPayout({cgaId, artisanId, amount, description}) {
  console.log("Logging a payout with the following info:")
  console.log({
    cgaId: cgaId,
    artisanId: artisanId,
    amount: amount,
    description: description
  })
  return (dispatch) => {
    return new Promise(async (resolve) => {
      let logPayout = firebase.functions().httpsCallable('logPayout')

      let response = await logPayout({
        cgaId: cgaId,
        artisanId: artisanId,
        amount: amount,
        description: description
      })

      let payout = {
        uid: response.data.uid,
        cgaId: response.data.cgaId,
        artisanId: response.data.artisanId,
        amount: response.data.amount,
        description: response.data.description,
        date: response.data.date
      }

      resolve()
      dispatch({ type: 'LOG_PAYOUT', payout: payout })
    })
  }
}

export function getPaymentOwed(artisanId) {
  console.log("Fetching amount due for" + (artisanId || "everyone"))
  	return (dispatch) => {
    	return new Promise(async (resolve) => {
    		//Fetch products
      let productSnapshot = await firebase.database().ref('products').once('value')
	      	let productObject = productSnapshot.val()

	      	//If artisan is specified, remove unrelated products
	      	if (artisanId){
		      	let artisanProductSnapshot = await firebase.database().ref(`artisans/${artisanId}/products`).once('value')
		      	let productKeys = Object.keys(artisanProductSnapshot.val())
		      	
		      	productObject = Object.keys(productObject)
				  .filter(key => productKeys.includes(key))
				  .reduce((obj, key) => {
				    obj[key] = productObject[key]
				    return obj
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
          
      console.log(amountOwed)

	      	//amountOwed = (transactionObject["transactionID"].numSold)

	      	//This is basically getAlreadyPaid() but not sure how to connect as redux actions  	
	      	//**********
      let payoutsSnapshot = await firebase.database().ref('payouts').once('value')
	      	let payoutsObject = payoutsSnapshot.val()
	      	let paidAmount = 0

	      	//Loop through payments and calculate total
	      	for (var payoutsID in payoutsObject) {
        console.log(payoutsID)
	      		if ((artisanId == null) || payoutsObject[payoutsID].artisanId == artisanId) {
          console.log(payoutsObject[payoutsID].amount)
	      			paidAmount += payoutsObject[payoutsID].amount	
	      		}
	      	} 
	      	//**********

      console.log(paidAmount)
	      	amountOwed = amountOwed - paidAmount
      amountOwed=Math.round(amountOwed * 100) / 100

	      	resolve()
	      	dispatch({ type: 'GET_AMOUNT_OWED', amountOwed: amountOwed })
    	})
  }
}

export function getAlreadyPaid(artisanId) {
  console.log("Fetching amount already paid for" + (artisanId || "everyone"))
  	return (dispatch) => {
    	return new Promise(async (resolve) => {
    		//Fetch payouts
      let payoutsSnapshot = await firebase.database().ref('payouts').once('value')
	      	let payoutsObject = payoutsSnapshot.val()
	      	let paidAmount = 0
	      	
	      	//Loop through payments and calculate total
	      	for (var payoutsID in payoutsObject) {
	      		if ((artisanId == null) || payoutsObject[payoutsID].artisanId == artisanId) {
	      			paidAmount += payoutsObject[payoutsID].amount	
	      		}
	      	} 

	      	paidAmount=Math.round(paidAmount * 100) / 100

	      	resolve()
	      	dispatch({ type: 'GET_AMOUNT_PAID', paidAmount: paidAmount })
    	})
  }
}
