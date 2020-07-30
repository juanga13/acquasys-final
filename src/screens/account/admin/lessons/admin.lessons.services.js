import { baseUrl } from "../../../../settings";

const requests = {
    getLessons: () => {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };
        return fetch(baseUrl + "/api/lesson/all", requestOptions)
            .then(response => {
                if (response.ok) return response.json();
                else throw response.json();
            })
    },

    createLesson: (data) => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        };

        return fetch(baseUrl + '/api/lesson/add', requestOptions)
            .then(response => {
                if (response.ok) return response.json()
                else throw response.json()
            })
    },

    updateLesson: (data) => {
        const requestOptions = {
            method: 'PUT',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")   
            },
            body: JSON.stringify(data),
        };

        return fetch(baseUrl + '/api/lesson/', requestOptions)
            .then(response => {
                if (response.ok) return response.json()
                else throw response.json()
            })
    },

    deleteLesson: (id) => {
        const requestOptions = {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        };
        
        return fetch(baseUrl + '/api/lesson/delete/' + id, requestOptions)
            .then(response => {
                if (response.ok) return response.json()
                else throw response.json()
            })
    },
};

export default requests;