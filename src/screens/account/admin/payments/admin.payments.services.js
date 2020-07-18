import { baseUrl } from '../../../../settings';

const requests = {
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
    
    createPayment(data) {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        }
        return fetch(baseUrl + '/payment/pay', requestOptions)
            .then(response => {
                if (response.ok) return response.json();
                else throw response.json();
            })
    },

    // updateLesson: (data) => {
    //     const requestOptions = {
    //         method: 'PUT',
    //         mode: "cors",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem("token")   
    //         },
    //         body: JSON.stringify(data),
    //     };

    //     return fetch(baseUrl + '/api/payment/update', requestOptions)
    //         .then(response => {
    //             if (response.ok) return response.json()
    //             else throw response.json()
    //         })
    // },

    // deleteLesson: (id) => {
    //     const requestOptions = {
    //         method: 'DELETE',
    //         mode: 'cors',
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("token")
    //         },
    //     };
        
    //     return fetch(baseUrl + '/api/payment/delete/' + id, requestOptions)
    //         .then(response => {
    //             if (response.ok) return response.json()
    //             else throw response.json()
    //         })
    // },

    getPaymentFee() {
        const requestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        };
        
        return fetch(baseUrl + "/payment/fee", requestOptions)
            .then(response => {
                if (response.ok) return response.json();
                else throw response.json();
            })
    },

    setPaymentFee(amount) {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(amount),
        };

        return fetch(baseUrl + '/payment/fee', requestOptions)
            .then(response => {
                if (response.ok) return response.json();
                else throw response.json();
            })
    }
};

export default requests;