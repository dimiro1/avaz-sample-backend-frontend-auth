import * as auth from "./auth";

const BASE_URL = "http://localhost:5000";

const anonymous = {
    username: "Anonymous",
    name: "Anonymous",
    isAdmin: false,
    isAnonymous: true
};

export async function profile() {
    try {
        const fetchRes = await fetch(`${BASE_URL}/profile`, {
            method: "GET",
            credentials: "include"
        });

        if (fetchRes.status !== 200) {
            return {
                "message": "empty profile"
            };
        }

        return await fetchRes.json();
    } catch (e) {
        console.error(`error logging out ${e}`);
        return false;
    }
}

export async function logout() {
    try {
        const res = await fetch(`${BASE_URL}/logout`, {
            method: "POST",
            credentials: "include"
        });

        return res.status === 200;
    } catch (e) {
        console.error(`error logging out ${e}`);
        return false;
    }
}

export async function login(username, password) {
    try {
        const fetchResp = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
            }),
            credentials: "include"
        });


        if (fetchResp.status !== 200) {
            return anonymous;
        }

        const user = await fetchResp.json();

        console.log(user);
        auth.setIsAuthenticated();
        auth.setIsAdmin(user.isAdmin);

        return {
            username: user.user,
            name: user.name,
            isAdmin: user.isAdmin,
            isAnonymous: false
        };
    } catch (e) {
        console.debug(e);
        return anonymous;
    }
}
