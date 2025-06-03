export function getCookie(name) {
    const cookie = document.cookie.split(";").find(cookie => cookie.includes(name));
    return cookie ? cookie.split("=")[1].trim() : "false";
    
}

export function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export async function checkIsLogged() {
    return await fetch(import.meta.env.VITE_BACKEND_URL + '/api/auth/isLogged', {
        method: 'POST',
        credentials: 'include', // Importante para enviar cookies HttpOnly
        headers: {
            'Content-Type': 'application/json',
        },
    });
}