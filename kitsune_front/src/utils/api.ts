const HEADER = {
    "Content-Type": "application/json"
};
const URL = "http://localhost:8000";

let postDataOptions = (data:{}): {} => {
    return {
        method: "POST",
        body: JSON.stringify(data),
        headers: HEADER
    }
};

let parseRes = (res: Response): Promise<any> => res.json();

export let signup = (data:{}): Promise<any> => {
    return fetch(URL + "/user/signup", postDataOptions(data))
        .then(res => parseRes(res));
};

export let signin = (data:{}): Promise<any> => {
    return fetch(URL + "/user/signin", postDataOptions(data))
        .then(res => parseRes(res));
};
