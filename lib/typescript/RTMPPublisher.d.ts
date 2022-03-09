import React from 'react';
import { ViewStyle } from 'react-native';
import type { RTMPPublisherRefProps, StreamState } from './types';
export interface RTMPPublisherProps {
    style?: ViewStyle;
    streamURL: string;
    streamName: string;
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
declare const RTMPPublisher: React.ForwardRefExoticComponent<RTMPPublisherProps & React.RefAttributes<RTMPPublisherRefProps>>;
export default RTMPPublisher;
