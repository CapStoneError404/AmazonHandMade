import * as MwsApi from 'amazon-mws'

const mwsInfo = require('../assets/mws.json')
const amazonMws = new MwsApi()
amazonMws.setApiKey(mwsInfo.aws_access_key, mwsInfo.client_secret)

// data: {
//   lastUpdatedAfter: Date
// }
export async function listOrders(data) {
  console.log("Listing MWS orders with the following data:")
  console.log(data)

  return amazonMws.orders.search({
    'Version': '2013-09-01',
    'Action': 'ListOrders',
    'SellerId': mwsInfo.seller_id,
    'MWSAuthToken': mwsInfo.auth_token,
    'MarketplaceId.Id.1': mwsInfo.marketplace_ids["Amazon.com.mx"],
    'LastUpdatedAfter': data.lastUpdatedAfter
  }).then(response => {
    return response
  })
}