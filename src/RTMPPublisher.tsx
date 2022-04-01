import React, { forwardRef, useImperativeHandle } from 'react';
import {
  Animated,
  NativeModules,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  GestureHandlerRootView,
  HandlerStateChangeEvent,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler';
import RTMPView, {
  ConnectionFailedType,
  ConnectionStartedType,
  ConnectionSuccessType,
  DisconnectType,
  NewBitrateReceivedType,
  RefNativeRTMPPublisherProps,
  StreamStateChangedType,
} from './Component';
import type { RTMPPublisherRefProps, StreamState } from './types';

const RTMPModule = NativeModules.RTMPPublisher;
export interface RTMPPublisherProps {
  style?: ViewStyle;
  streamURL: string;
  streamName: string;
  /**
   * Determines if preview is displayed as landscape
   */
  IsLandscape: boolean;
  /**
   * Callback for connection fails on RTMP server
   */
  onConnectionFailed?: (data: string) => void;
  /**
   * Callback for starting connection to RTMP server
   */
  onConnectionStarted?: (data: string) => void;
  /**
   * Callback for connection successfully to RTMP server
   */
  onConnectionSuccess?: (data: null) => void;
  /**
   * Callback for disconnect successfully to RTMP server
   */
  onDisconnect?: (data: null) => void;
  /**
   * Callback for receiving new bitrate value about stream
   */
  onNewBitrateReceived?: (data: number) => void;
  /**
   * Alternatively callback for changing stream state
   * Returns parameter StreamState type
   */
  onStreamStateChanged?: (data: StreamState) => void;
}

const RTMPPublisher = forwardRef<RTMPPublisherRefProps, RTMPPublisherProps>(
  (
    {
      onConnectionFailed,
      onConnectionStarted,
      onConnectionSuccess,
      onDisconnect,
      onNewBitrateReceived,
      onStreamStateChanged,
      ...props
    },
    ref
  ) => {
    const _root = React.useRef<RefNativeRTMPPublisherProps>(null);

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

    const handleOnConnectionFailed = (e: ConnectionFailedType) => {
      onConnectionFailed && onConnectionFailed(e.nativeEvent.data);
    };

    const handleOnConnectionStarted = (e: ConnectionStartedType) => {
      onConnectionStarted && onConnectionStarted(e.nativeEvent.data);
    };

    const handleOnConnectionSuccess = (e: ConnectionSuccessType) => {
      onConnectionSuccess && onConnectionSuccess(e.nativeEvent.data);
    };

    const handleOnDisconnect = (e: DisconnectType) => {
      onDisconnect && onDisconnect(e.nativeEvent.data);
    };

    const handleOnNewBitrateReceived = (e: NewBitrateReceivedType) => {
      onNewBitrateReceived && onNewBitrateReceived(e.nativeEvent.data);
    };

    const handleOnStreamStateChanged = (e: StreamStateChangedType) => {
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
      toggleFlash,
    }));

    const _baseScale = new Animated.Value(1);
    const _pinchScale = new Animated.Value(1);
    var _lastScale = 1;

    const _onPinchHandlerStateChange = (
      event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>
    ) => {
      // console.log('RE');
      // console.log({ _lastScale });
      if (
        event.nativeEvent.oldState === State.ACTIVE &&
        event.nativeEvent.numberOfPointers === 2
      ) {
        _lastScale *= event.nativeEvent.scale;
        _lastScale < 1 && (_lastScale = 1);
        _lastScale > 3 && (_lastScale = 3);
        _baseScale.setValue(_lastScale);
        _pinchScale.setValue(1);
      }
    };

    // const [viewDimension, setViewDimension] = React.useState<LayoutRectangle>({
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

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={[styles.flex, props.style]}>
          {/* <GestureDetector gesture={gestures}> */}

          <PinchGestureHandler
            onGestureEvent={(event) => {
              _root.current?.setNativeProps({
                zoom: `${_lastScale * event.nativeEvent.scale}`,
              });
            }}
            onHandlerStateChange={_onPinchHandlerStateChange}
          >
            <Animated.View
              style={[styles.flex, { backgroundColor: 'red' }]}
              collapsable={false}
            >
              <RTMPView
                ref={_root as any}
                {...props}
                onDisconnect={handleOnDisconnect}
                onConnectionFailed={handleOnConnectionFailed}
                onConnectionStarted={handleOnConnectionStarted}
                onConnectionSuccess={handleOnConnectionSuccess}
                onNewBitrateReceived={handleOnNewBitrateReceived}
                onStreamStateChanged={handleOnStreamStateChanged}
              />
            </Animated.View>
          </PinchGestureHandler>

          {/* </GestureDetector> */}
          {/* <Button
            title="ss"
            onPress={() => {
              _root.current?.setNativeProps({
                zoom: `${scale.value}`,
              });
            }}
          >
            s
          </Button> */}
        </View>
      </GestureHandlerRootView>
    );
  }
);

{
  /* <GestureHandlerRootView
        style={[styles.flex, props.style]}
        onLayout={(event) => {
          setViewDimension(event.nativeEvent.layout);
        }}
      ></GestureHandlerRootView> */
}

const styles = StyleSheet.create({
  absolute: { position: 'absolute' },
  flex: { flex: 1 },
});

export default RTMPPublisher;
