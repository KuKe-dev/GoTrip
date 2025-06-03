export function getCookie(name) {
    window.onload = () => {
        const cookies = document.cookie.split("; ");
        
        for (let cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === name) {
                return value;
            }
        }
    return null;
    }
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