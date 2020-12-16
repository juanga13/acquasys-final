"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _settings = require("../../../settings");

var _requests;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var requests = (_requests = {
  getCalendar: function getCalendar(startDate, endDate) {
    var requestOptions = {
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    };
    return fetch(_settings.baseUrl + "/api/student/calendar/" + startDate + "/" + endDate, requestOptions).then(function (response) {
      if (response.ok) return response.json();else throw response.json();
    });
  }
}, _defineProperty(_requests, "getCalendar", function getCalendar(startDate, endDate) {
  var requestOptions = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  };
  return fetch(_settings.baseUrl + "/api/student/calendar/" + startDate + "/" + endDate, requestOptions).then(function (response) {
    if (response.ok) return response.json();else throw response.json();
  });
}), _defineProperty(_requests, "getLessons", function getLessons() {
  var requestOptions = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  };
  return fetch(_settings.baseUrl + "/api/lesson/all", requestOptions).then(function (response) {
    if (response.ok) return response.json();else throw response.json();
  });
}), _defineProperty(_requests, "suscribe", function suscribe(studentId, lessonId) {
  var requestOptions = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  };
  return fetch(_settings.baseUrl + "/api/lesson/enroll/".concat(studentId, "/").concat(lessonId), requestOptions).then(function (response) {
    console.log(response);
    if (response.ok) return response.json();else throw response.json();
  });
}), _defineProperty(_requests, "unsuscribe", function unsuscribe(studentId, lessonId) {
  var requestOptions = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  };
  return fetch(_settings.baseUrl + "/api/lesson/unroll/".concat(studentId, "/").concat(lessonId), requestOptions).then(function (response) {
    if (response.ok) return response.json();else throw response.json();
  });
}), _defineProperty(_requests, "getMyEnrolled", function getMyEnrolled() {
  var requestOptions = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  };
  return fetch(_settings.baseUrl + "/api/student/enrolled", requestOptions).then(function (response) {
    if (response.ok) return response.json();else throw response.json();
  });
}), _defineProperty(_requests, "getMyselfData", function getMyselfData() {
  var requestOptions = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  };
  return fetch(_settings.baseUrl + "/api/student/myself", requestOptions).then(function (response) {
    if (response.ok) return response.json();else throw response.json();
  });
}), _defineProperty(_requests, "getAttendance", function getAttendance(id) {
  var requestOptions = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  };
  return fetch(_settings.baseUrl + "/api/lesson/attendance/".concat(id), requestOptions).then(function (response) {
    if (response.ok) return response.json();else throw response.json();
  });
}), _requests);
var _default = requests;
exports["default"] = _default;