
export const logout = () => {
    localStorage.setItem("token", "");
    localStorage.removeItem("user");
    sessionStorage.setItem("user", null);
    sessionStorage.setItem("loggedIn",false);
    window.location.href = "http://localhost:3000/";
}