import {baseUrl} from '../../../settings';


const requests = {
    completeMyData: (data) => {
        const requestOptions = {
            method: 'PUT',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        };

        return fetch(baseUrl + '/api/student/update', requestOptions)
            .then(response => {
                if (response.ok) return response.json()
                else throw response.json()
            });
    },
};

export default requests;