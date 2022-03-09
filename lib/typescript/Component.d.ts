import { NativeSyntheticEvent, ViewStyle } from 'react-native';
import type { StreamState } from './types';
declare type RTMPData<T> = {
    data: T;
};
export declare type ConnectionFailedType = NativeSyntheticEvent<RTMPData<string>>;
export declare type ConnectionStartedType = NativeSyntheticEvent<RTMPData<string>>;
export declare type ConnectionSuccessType = NativeSyntheticEvent<RTMPData<null>>;
export declare type DisconnectType = NativeSyntheticEvent<RTMPData<null>>;
export declare type NewBitrateReceivedType = NativeSyntheticEvent<RTMPData<number>>;
export declare type StreamStateChangedType = NativeSyntheticEvent<RTMPData<StreamState>>;
export interface NativeRTMPPublisherProps {
    style?: ViewStyle;
    streamURL: string;
    streamName: string;
    onConnectionFailed?: (e: ConnectionFailedType) => void;
    onConnectionStarted?: (e: ConnectionStartedType) => void;
    onConnectionSuccess?: (e: ConnectionSuccessType) => void;
    onDisconnect?: (e: DisconnectType) => void;
    onNewBitrateReceived?: (e: NewBitrateReceivedType) => void;
    onStreamStateChanged?: (e: StreamStateChangedType) => void;
}
declare const _default: import("react-native").HostComponent<NativeRTMPPublisherProps>;
export default _default;
