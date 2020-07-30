import { baseUrl } from '../../settings';

const requests = {
    getMessages: () => {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }
        return fetch(baseUrl + "/api/message/all", requestOptions)
            .then(response => {
                if (response.ok) return response.json();
                else throw response.json();
            })
    },

    sendMessage: (message) => {
        const requestOptions = {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(message),
        }
        return fetch(baseUrl + "/api/message/send", requestOptions)
            .then(response => {
                if (response.ok) return response.json();
                else throw response.json();
            })
    },

    setMessageRead: (id) => {
        const requestOptions = {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }
        return fetch(baseUrl + "/api/message/setRead/" + id, requestOptions)
            .then(response => {
                if (response.ok) return response.json();
                else throw response.json();
            })
    }
};

export default requests;