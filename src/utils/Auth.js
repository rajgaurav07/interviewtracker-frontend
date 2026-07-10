export const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const isLoggedIn = () => {
    return localStorage.getItem("user") !== null;
};

export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

export const setToken = (token) => {
    localStorage.setItem("token", token);
};

export const getToken = () => {
    return localStorage.getItem("token");
};

// -------- Admin --------

export const isAdmin = () => {
    const user = getUser();

    return user && user.role === "ADMIN";
};