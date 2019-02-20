const admin = require('firebase-admin')

exports.loginWithAmazon = (data, context) => {
  console.log(data)
  const email = data.userInfo.email
  const name = data.userInfo.name
  const amazonId = data.userInfo.user_id
  const accessToken = data.accessToken

  // Firebase ids cant have dots in them, replaceing with -
  const uid = (`amazon:${amazonId}`).replace(/\./g, "-")

  // Add cga tp amazonUsers root
  const databaseTask = admin.database().ref(`/amazonUsers/${uid}`).set({
    name: name,
    email: email,
    amazonId: amazonId,
    accessToken: accessToken
  })

  // Create an actual auth user or update an existing one
  const userCreationTask = admin.auth().updateUser(uid, {
    displayName: name,
    email: email,
    emailVerified: true
  }).catch((error) => {
    if(error.code === 'auth/user-not-found') {
      return admin.auth().createUser({
        uid: uid,
        displayName: name,
        email: email,
        emailVerified: true
      })
    }

    throw error
  })

  return Promise.all([userCreationTask, databaseTask]).then(() => {
    return admin.auth().createCustomToken(uid)
  }).then((token) => {
    console.log(`Created custom token for UID "${uid}", Token: ${token}`)
    return {
      token: token
    }
  })
}

