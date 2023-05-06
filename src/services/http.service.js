import axios from "axios";
var token = JSON.parse(localStorage.getItem('infouser'));
const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
};
if (token !== null) {
    commonConfig.headers['Authorization'] = 'Bearer ' + token.token;
}
export default (baseURL) => {
    const http = axios.create({
        baseURL,
        ...commonConfig,
    });
    return http;
};