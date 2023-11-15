const baseUrl = 'http://localhost:3030/api/v1/'

export async function get(path) {
    const response = await fetch(baseUrl + path, {credentials: 'include'})
    return response
}

export async function req_file(path, body, method) {
    const options = {
        method: method || 'POST',
        credentials: 'include',
        body: body,
    }

    const response = await fetch(baseUrl + path, options);
    return response.json()
}

export async function req(path, body, method) {
    const options = {
        method: method || 'POST',
        credentials: 'include',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(baseUrl + path, options);
    return response.json()
}