// utils/auth.js

// This function checks if there is an "accessToken" in localStorage and returns true or false accordingly.
const isAuthenticated = () => {
    return Boolean(localStorage.getItem("accessToken"));
};

// Export the function so it can be imported elsewhere in your application
export { isAuthenticated };
