import * as admin from 'firebase-admin'
import serviceAccount from '../admin.js'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export const handler = async (event, context) => {
  const { email } = event.queryStringParameters

  try {
    const user = await admin.auth().getUserByEmail(email)
    if (user.admin !== true) {
      return {
        statusCode: 501,
        body: 'only admins can add other admins, sucker',
      }
    } else {
      await admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      })

      return {
        statusCode: 200,
        body: JSON.stringify({ message: `Success! ${email} has been made an admin` }),
      }
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    }
  }
}
