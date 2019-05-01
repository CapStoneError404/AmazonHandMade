import * as admin from 'firebase-admin'

// data: {
//   cgaId: String,
//   artisanId: String,
//   amount: Double,
//   description: String
// }
export async function logPayout(data) { 
  console.log("Logging a payout with the following data:")
  console.log(data)

  const cgaId = data.cgaId
  const artisanId = data.artisanId
  const amount = data.amount
  const description = data.description

  const payout = {
    cgaId: cgaId,
    artisanId: artisanId,
    amount: parseFloat(amount),
    description: description,
    date: (new Date()).valueOf()
  }

  const payoutTask = await admin.database().ref('payouts').push(payout)

  const artisanTask = admin.database().ref('artisans')
    .child(artisanId)
    .child('payouts')
    .child(payoutTask.key)
    .set(true)

  const cgaTask = admin.database().ref('amazonUsers')
    .child(cgaId)
    .child('payouts')
    .child(payoutTask.key)
    .set(true)

  return Promise.all([artisanTask, cgaTask]).then(() => {
    return {
      uid: payoutTask.key,
      ...payout
    }
  })
}