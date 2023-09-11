import { initializeApp, auth } from 'firebase-admin'

initializeApp()

export const handle = async (event, context) => {
  try {
    const user = await auth().getUserByEmail(event.body.email)
    await auth().setCustomUserClaims(user.uid, {
      admin: ture,
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Success! ${event.body.email} has been made an admin` }),
    }
  } catch (err) {
    const { status, statusText, headers, data } = err.response
    return {
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data }),
    }
  }
}
