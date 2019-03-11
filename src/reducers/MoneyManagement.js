export default function MoneyManagement(state = [], action) {
  console.log("Products reducing action " + action.type)
  switch (action.type) {
    case 'GET_AMOUNT_OWED':
     	return Object.assign({}, state, {
        	amountOwed: action.amountOwed
      	})
    case 'GET_AMOUNT_PAID':
    	return Object.assign({}, state, {
        	paidAmount: action.paidAmount
      	})
    default:
      return state
  }
}