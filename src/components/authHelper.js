const baseURL = "127.0.0.1:1337"
const authHelper = {
    register: async function (user) {
        console.log("user");
        console.log(user);
    
        const response = await fetch(`http://localhost:1337/user/register`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        return result;
    },
    login: async function (user) {

        const response = await fetch(`http://localhost:1337/user/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
        });
        const result = await response.json();
        console.log(result);
        return result;
    }
}

export default authHelper;
export const register = authHelper.register;
export const login = authHelper.login;
