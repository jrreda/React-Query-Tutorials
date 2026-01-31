import axios from 'axios'

const client = axios.create({ baseURL: 'http://localhost:4000' })

export const request = ({ ...options }) => {
  // add default headers to all requests
  client.defaults.headers.common.Authorization = `Bearer 123`

  const onSuccess = (response) => {
    // log success to analytics service
    console.log("response", response)
    return response
  }

  const onError = (error) => {
    // log error to analytics service
    console.log("error", error)
    return error
  }

  return client(options).then(onSuccess).catch(onError)
}