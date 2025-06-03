export function getCookie(name) {
    const cookie = document.cookie;
    console.log(name);
    console.log(cookie);
    return cookie ? cookie.split("=")[0].trim() : "false";
}

export function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export async function checkIsLogged(token) {
    return await fetch(import.meta.env.VITE_BACKEND_URL + '/api/auth/isLogged', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: token,

    })

}