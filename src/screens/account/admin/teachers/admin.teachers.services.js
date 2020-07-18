import { baseUrl } from '../../../../settings';

const requests = {
    getTeachers: () => {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };
        return fetch(baseUrl + "/api/teacher/all", requestOptions)
            .then(response => {
                if (response.ok) return response.json()
                else throw response.json()
            })
    },
    createTeacher: (data) => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        };

        return fetch(baseUrl + '/api/teacher/create', requestOptions)
            .then(response => {
                if (response.ok) return response.json()
                else throw response.json()
            })
    },

    updateTeacher: (data) => {
        const requestOptions = {
            method: 'PUT',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")   
            },
            body: JSON.stringify(data),
        };

        return fetch(baseUrl + '/api/teacher/update', requestOptions)
            .then(response => {
                if (response.ok) return response.json()
                else throw response.json()
            })
    },

    deleteTeacher: (id) => {
        const requestOptions = {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        };
        
        return fetch(baseUrl + '/api/teacher/delete/' + id, requestOptions)
            .then(response => {
                if (response.ok) return response.json()
                else throw response.json()
            })
    },
};

export default requests;