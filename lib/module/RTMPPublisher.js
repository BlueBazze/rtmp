function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, useImperativeHandle } from 'react';
import { NativeModules } from 'react-native';
import PublisherComponent from './Component';
const RTMPModule = NativeModules.RTMPPublisher;
const RTMPPublisher = /*#__PURE__*/forwardRef((_ref, ref) => {
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

  useImperativeHandle(ref, () => ({
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
  return /*#__PURE__*/React.createElement(PublisherComponent, _extends({}, props, {
    onDisconnect: handleOnDisconnect,
    onConnectionFailed: handleOnConnectionFailed,
    onConnectionStarted: handleOnConnectionStarted,
    onConnectionSuccess: handleOnConnectionSuccess,
    onNewBitrateReceived: handleOnNewBitrateReceived,
    onStreamStateChanged: handleOnStreamStateChanged
  }));
});
export default RTMPPublisher;
//# sourceMappingURL=RTMPPublisher.js.map