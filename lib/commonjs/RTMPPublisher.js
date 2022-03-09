"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Component = _interopRequireDefault(require("./Component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const RTMPModule = _reactNative.NativeModules.RTMPPublisher;
const RTMPPublisher = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
  let {
    onConnectionFailed,
    onConnectionStarted,
    onConnectionSuccess,
    onDisconnect,
    onNewBitrateReceived,
    onStreamStateChanged,
    ...props
  } = _ref;

  const startStream = async () => await RTMPModule.startStream();

  const stopStream = async () => await RTMPModule.stopStream();

  const isStreaming = async () => RTMPModule.isStreaming();

  const isCameraOnPreview = async () => RTMPModule.isCameraOnPreview();

  const getPublishURL = async () => RTMPModule.getPublishURL();

  const hasCongestion = async () => RTMPModule.hasCongestion();

  const isAudioPrepared = async () => RTMPModule.isAudioPrepared();

  const isVideoPrepared = async () => RTMPModule.isVideoPrepared();

  const isMuted = async () => RTMPModule.isMuted();

  const mute = () => RTMPModule.mute();

  const unmute = () => RTMPModule.unmute();

  const switchCamera = () => RTMPModule.switchCamera();

  const toggleFlash = () => RTMPModule.toggleFlash();

  const handleOnConnectionFailed = e => {
    onConnectionFailed && onConnectionFailed(e.nativeEvent.data);
  };

  const handleOnConnectionStarted = e => {
    onConnectionStarted && onConnectionStarted(e.nativeEvent.data);
  };

  const handleOnConnectionSuccess = e => {
    onConnectionSuccess && onConnectionSuccess(e.nativeEvent.data);
  };

  const handleOnDisconnect = e => {
    onDisconnect && onDisconnect(e.nativeEvent.data);
  };

  const handleOnNewBitrateReceived = e => {
    onNewBitrateReceived && onNewBitrateReceived(e.nativeEvent.data);
  };

  const handleOnStreamStateChanged = e => {
    onStreamStateChanged && onStreamStateChanged(e.nativeEvent.data);
  };

  (0, _react.useImperativeHandle)(ref, () => ({
    startStream,
    stopStream,
    isStreaming,
    isCameraOnPreview,
    getPublishURL,
    hasCongestion,
    isAudioPrepared,
    isVideoPrepared,
    isMuted,
    mute,
    unmute,
    switchCamera,
    toggleFlash
  }));
  return /*#__PURE__*/_react.default.createElement(_Component.default, _extends({}, props, {
    onDisconnect: handleOnDisconnect,
    onConnectionFailed: handleOnConnectionFailed,
    onConnectionStarted: handleOnConnectionStarted,
    onConnectionSuccess: handleOnConnectionSuccess,
    onNewBitrateReceived: handleOnNewBitrateReceived,
    onStreamStateChanged: handleOnStreamStateChanged
  }));
});
var _default = RTMPPublisher;
exports.default = _default;
//# sourceMappingURL=RTMPPublisher.js.map