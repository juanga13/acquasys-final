import { baseUrl } from "../../../settings";

const requests = {
    getLessons() {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };

        return fetch(baseUrl + "/api/teacher/myLessons", requestOptions)
            .then(response => {
                if (response.ok) return response.json();
                else throw response.json();
            })
    },
    
    // TODO no esta hecho en el back
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

    getAttendances(lessonId) {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };

        return fetch(baseUrl + "/api/lesson/attendance/"+ lessonId, requestOptions)
            .then(response => {
                if (response.ok) return response.json();
                else throw response.json();
            })

    },

    setAttendance(data) {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        };

        return fetch(baseUrl + '/api/lesson/attendance', requestOptions)
            .then(response => {
                if (response.ok) return response.json();
                else throw response.json();
            })
    }
};

export default requests;