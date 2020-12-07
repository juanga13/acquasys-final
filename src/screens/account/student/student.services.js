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
        return fetch(baseUrl + "/api/payment/payments", requestOptions)
            .then(response => {
                if (response.ok) return response.json()
                else throw response.json()
            })
    },

    // suscribe to a lesson
    suscribe: (studentId, lessonId) => {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };
        return fetch(baseUrl + `/api/lesson/unroll/${studentId}/${lessonId}`, requestOptions)
            .then(response => {
                if (response.ok) return response.json()
                else throw response.json()
            })
    },
    
    // unsuscribe to a lesson
    unsuscribe: (studentId, lessonId) => {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };
        return fetch(baseUrl + `/api/lesson/unroll/${studentId}/${lessonId}`, requestOptions)
            .then(response => {
                if (response.ok) return response.json()
                else throw response.json()
            })
    },
    
    //  GET_MY_ENROLLED 
    getMyEnrolled: () => {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };
        return fetch(baseUrl + `/api/student/enrolled`, requestOptions)
            .then(response => {
                if (response.ok) return response.json()
                else throw response.json()
            })
    },
    
    //  GET_MYSELF_DATA
    getMyselfData: () => {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };
        return fetch(baseUrl + "/api/student/myself", requestOptions)
            .then(response => {
                if (response.ok) return response.json()
                else throw response.json()
            })
    },

    // updateMyDataRequest
    // updateMyData: (newData) => {
        
    // },
};

export default requests;