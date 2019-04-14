export default function Payouts(state = [], action) {

  switch (action.type) {
  case 'LOG_PAYOUT':
    return state.concat([action.payout])
  case 'GET_PAYOUTS':
    return action.payouts
  default:
    return state
  }
}