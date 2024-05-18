const HEAD_URL = 'http://192.168.29.214:3000'

export async function _POST(url, reqBody) {
    const request = await fetch(`${HEAD_URL}/${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
    })
    const response = await request.json()
    if (request.status === 200 && response) {
        return response;
    }
    return false;
}


export async function _GET(url, reqBody) {
    const request = await fetch(`${HEAD_URL}/${url}`)
    const response = await request.json()
    if (request.status === 200 && response) {
        return response;
    }
    return false;
}
