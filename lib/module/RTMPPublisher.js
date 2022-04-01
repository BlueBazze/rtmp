function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, useImperativeHandle } from 'react';
import { Animated, NativeModules, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, PinchGestureHandler, State } from 'react-native-gesture-handler';
import RTMPView from './Component';
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

  const _root = React.useRef(null);

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

  const _baseScale = new Animated.Value(1);

  const _pinchScale = new Animated.Value(1);

  var _lastScale = 1;

  const _onPinchHandlerStateChange = event => {
    // console.log('RE');
    // console.log({ _lastScale });
    if (event.nativeEvent.oldState === State.ACTIVE && event.nativeEvent.numberOfPointers === 2) {
      _lastScale *= event.nativeEvent.scale;
      _lastScale < 1 && (_lastScale = 1);
      _lastScale > 3 && (_lastScale = 3);

      _baseScale.setValue(_lastScale);

      _pinchScale.setValue(1);
    }
  }; // const [viewDimension, setViewDimension] = React.useState<LayoutRectangle>({
  //   width: 0,
  //   height: 0,
  //   x: 0,
  //   y: 0,
  // });
  // const scale = useSharedValue(1);
  // const savedScale = useSharedValue(1);
  // function setZoom(_scale: number) {
  //   _root.current?.setNativeProps({
  //     zoom: `${_scale}`,
  //   });
  // }
  // const pinchGesture = Gesture.Pinch()
  //   .onUpdate((e) => {
  //     scale.value = savedScale.value * e.scale;
  //     console.log({
  //       scale: scale.value,
  //       savedScale: savedScale.value,
  //       root: _root?.current,
  //     });
  //     runOnJS(setZoom)(scale.value)
  //     // _root.current?.setNativeProps({
  //     //   zoom: `${scale.value}`,
  //     // });
  //   })
  //   .onEnd(() => {
  //     console.log('pinched', scale.value, savedScale.value);
  //     savedScale.value = scale.value;
  //   });
  // pinchGesture.config = { runOnJS: true };
  // const tap = Gesture.Tap()
  //   .numberOfTaps(2)
  //   .onEnd(() => {
  //     switchCamera();
  //   });
  // const gestures = Gesture.Exclusive(tap, pinchGesture);
  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [{ scale: scale.value }],
  // }));


  return /*#__PURE__*/React.createElement(GestureHandlerRootView, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.flex, props.style]
  }, /*#__PURE__*/React.createElement(PinchGestureHandler, {
    onGestureEvent: event => {
      var _root$current;

      (_root$current = _root.current) === null || _root$current === void 0 ? void 0 : _root$current.setNativeProps({
        zoom: `${_lastScale * event.nativeEvent.scale}`
      });
    },
    onHandlerStateChange: _onPinchHandlerStateChange
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.flex, {
      backgroundColor: 'red'
    }],
    collapsable: false
  }, /*#__PURE__*/React.createElement(RTMPView, _extends({
    ref: _root
  }, props, {
    onDisconnect: handleOnDisconnect,
    onConnectionFailed: handleOnConnectionFailed,
    onConnectionStarted: handleOnConnectionStarted,
    onConnectionSuccess: handleOnConnectionSuccess,
    onNewBitrateReceived: handleOnNewBitrateReceived,
    onStreamStateChanged: handleOnStreamStateChanged
  }))))));
});
{
  /* <GestureHandlerRootView
        style={[styles.flex, props.style]}
        onLayout={(event) => {
          setViewDimension(event.nativeEvent.layout);
        }}
      ></GestureHandlerRootView> */
}
const styles = StyleSheet.create({
  absolute: {
    position: 'absolute'
  },
  flex: {
    flex: 1
  }
});
export default RTMPPublisher;
//# sourceMappingURL=RTMPPublisher.js.map