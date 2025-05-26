export function getCookie(name) {
    const cookie = document.cookie.split(";").find(cookie => cookie.includes(name));
    return cookie ? cookie.split("=")[1].trim() : "false";
}

export async function checkIsLogged(token) {
    return await fetch('http://localhost:8080/api/auth/isLogged', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: token,

    })

}