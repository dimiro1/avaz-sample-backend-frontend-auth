export function frontLogout() {
    localStorage.clear();
}

export function setIsAuthenticated() {
    localStorage.setItem("isAuthenticated", "true");
}

export function setIsAdmin(isAdmin) {
    localStorage.setItem("isAdmin", isAdmin.toString());
}

export function isAuthenticated() {
    return localStorage.getItem("isAuthenticated") === "true";
}

export function isAdmin() {
    return localStorage.getItem("isAdmin") === "true";
}
