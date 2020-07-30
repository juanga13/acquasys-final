import { baseUrl } from '../../../settings';

const requests = {
    getCalendar: (startDate, endDate) => {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };
        return fetch(baseUrl + "/api/student/calendar/" + startDate + "/" + endDate, requestOptions)
            .then(response => {
                if (response.ok) return response.json()
                else throw response.json()
            })
    },
    
    // getCalendar: (startDate, endDate) => {
    //     const requestOptions = {
    //         method: "GET",
    //         mode: "cors",
    //         credentials: "same-origin",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem("token")
    //         }
    //     };
    //     return fetch(baseUrl + "/api/lesson/calendar/" + startDate + "/" + endDate, requestOptions)
    //         .then(response => {
    //             if (response.ok) return response.json()
    //             else throw response.json()
    //         })
    // },
    
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
                if (response.ok) return response.json()
                else throw response.json()
            })
    },
    
    getPayments: () => {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };
        return fetch(baseUrl + "/payment/payments", requestOptions)
            .then(response => {
                if (response.ok) return response.json()
                else throw response.json()
            })
    },

    // unsuscribe to a lesson


    // unsuscribe to a lesson
};

export default requests;