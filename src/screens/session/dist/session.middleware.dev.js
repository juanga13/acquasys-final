"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _session = _interopRequireWildcard(require("./session.actions"));

var _session2 = _interopRequireDefault(require("./session.services"));

var _connectedReactRouter = require("connected-react-router");

var _consts = require("../../utils/consts");

var _admin = _interopRequireDefault(require("../account/admin/admin.actions"));

var _student = _interopRequireDefault(require("../account/student/student.actions"));

var _teacher = _interopRequireDefault(require("../account/teacher/teacher.actions"));

var _time = require("../../utils/time");

var _common = _interopRequireDefault(require("../common/common.actions"));

var _reactReduxI18n = require("react-redux-i18n");

var _Toaster = _interopRequireDefault(require("../common/components/Toaster"));

var _unverified = _interopRequireDefault(require("../account/unverified/unverified.actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var sessionMiddleware = function sessionMiddleware(_ref) {
  var dispatch = _ref.dispatch,
      getState = _ref.getState;
  return function (next) {
    return function (action) {
      next(action);

      switch (action.type) {
        case _session.GET_ROLE_DATA:
          dispatch(_session["default"].getProfile());
          dispatch(_common["default"].getMessages());
          var role = localStorage.getItem('role');

          switch (role) {
            case _consts.ROLES.ADMIN:
              dispatch(_admin["default"].getAllData());
              break;

            case _consts.ROLES.STUDENT:
              dispatch(_student["default"].getMyEnrolled());
              dispatch(_student["default"].getMyselfData());
              dispatch(_student["default"].getCalendar((0, _time.tenDaysBeforeNow)().getTime(), new Date().getTime()));
              dispatch(_student["default"].getLessons());
              break;

            case _consts.ROLES.TEACHER:
              dispatch(_teacher["default"].getMyselfData());
              dispatch(_teacher["default"].getLessons());
              break;

            case _consts.ROLES.UNVERIFIED_STUDENT:
              dispatch(_unverified["default"].getMyselfData());
              break;

            default:
              break;
          }

          break;

        case _session.LOGIN:
          var loginEmail = getState().session.forms.login.email.value;
          var loginPassword = getState().session.forms.login.password.value;

          _session2["default"].login(loginEmail, loginPassword).then(function (data) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            dispatch(_session["default"].loginSuccess());
            dispatch(_session["default"].getRoleData());
            (0, _connectedReactRouter.push)('/profile');
          })["catch"](function (error) {
            dispatch(_session["default"].loginError(error));
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('session.error.login.title'), _reactReduxI18n.I18n.t('session.error.login.description'), 'error', 'warning');
          });

          break;

        case _session.REGISTER:
          var registerEmail = getState().session.forms.register.email.value;
          var registerPassword = getState().session.forms.register.password.value;

          _session2["default"].register(registerEmail, registerPassword).then(function (response) {
            dispatch(_session["default"].registerSuccess(response));
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('session.success.register.title'), _reactReduxI18n.I18n.t('session.success.register.description'), 'success', 'check');
            (0, _connectedReactRouter.push)('/login');
          })["catch"](function (error) {
            dispatch(_session["default"].registerError(error));
            (0, _Toaster["default"])(_reactReduxI18n.I18n.t('session.error.register.title'), _reactReduxI18n.I18n.t('session.error.register.description'), 'error', 'warning');
          });

          break;

        case _session.REFRESH_TOKEN:
          _session2["default"].checkToken().then(function (data) {
            dispatch(_session["default"].refreshTokenSuccess(data));
            dispatch(_session["default"].getRoleData());
          })["catch"](function (error) {
            return dispatch(_session["default"].refreshTokenError(error));
          });

          break;

        case _session.GET_PROFILE:
          _session2["default"].getProfile().then(function (data) {
            dispatch(_session["default"].getProfileSuccess(data));
          })["catch"](function (error) {
            delete localStorage['token'];
            delete localStorage['role'];
            dispatch(_session["default"].getProfileError(error));
            (0, _connectedReactRouter.push)('/login');
          });

          break;

        case _session.LOGOUT:
          delete localStorage['token'];
          delete localStorage['role'];
          (0, _connectedReactRouter.push)('/');
          break;

        default:
          break;
      }
    };
  };
};

var _default = sessionMiddleware;
exports["default"] = _default;