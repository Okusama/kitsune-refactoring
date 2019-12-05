const HEADER = {
    "Content-Type": "application/json"
};
const URL = "http://localhost:8000";

const postDataOptions = (data:{}): {} => {
    return {
        method: "POST",
        body: JSON.stringify(data),
        headers: HEADER
    }
};

const parseRes = (res: Response): Promise<any> => res.json();

export const signup = (data:{}): Promise<any> => {
    return fetch(URL + "/user/signup", postDataOptions(data))
        .then(res => parseRes(res));
};

export const signin = (data:{}): Promise<any> => {
    return fetch(URL + "/user/signin", postDataOptions(data))
        .then(res => parseRes(res));
};

export const authentication = (data:{}): Promise<any> => {
    return fetch(URL + "/user/authentication", postDataOptions(data))
        .then(res => parseRes(res));
};

