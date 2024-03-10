import { jwtDecode } from "jwt-decode";

export function decodeToken(): any {
    const token = localStorage.getItem("token");
    if (!token || typeof token !== 'string') {
        console.error('Token not found or not a string');
        return null;
    }

    console.log(token);

    try {
        const decodedToken = jwtDecode(token);
        return decodedToken;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}
