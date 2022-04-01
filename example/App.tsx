import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import RTMPView, { RTMPPublisherRefProps } from 'react-native-rtmp-publisher';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const RefRTMP = React.useRef<RTMPPublisherRefProps>();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="#00000000"
        style="inverted"
      ></StatusBar>
      <RTMPView
        ref={RefRTMP as any}
        style={{ flex: 1, minHeight: 100, minWidth: 100 }}
        streamName="s"
        streamURL="s"
        IsLandscape={false}
      ></RTMPView>
      <View style={{ minHeight: 56, backgroundColor: '#fff' }}>
        <Button
          title="smtr"
          onPress={() => {
            // RefRTMP.current?.isVideoPrepared();
            // RefRTMP.current?.isStreaming()
            //   ? RefRTMP.current?.stopStream()
            //   : RefRTMP.current?.startStream();
          }}
        >
          {RefRTMP.current?.isStreaming() ? 'Stop' : 'Start'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
