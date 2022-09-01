import * as api from "../utils/api";

export async function googleLogin(value) {
  try {
    const res = await api.post(`${process.env.REACT_APP_API_PREFIX}/googlelogin`, value)
    return res;
  }
  catch (err) {
    console.log('google API error',err)
  }

}

export async function twitterLoginn() {
  try {
    const res = await api.post(`api/v1/auth/twitter`)
    return res;
  }
  catch (err) {
    console.log('twitter API error',err)
  }

}


















