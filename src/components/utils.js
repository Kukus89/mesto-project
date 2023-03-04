export function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

export function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(res.status)
}


