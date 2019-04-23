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
