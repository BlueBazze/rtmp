package com.reactnativertmppublisher.modules;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.view.SurfaceView;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.pedro.rtplibrary.rtmp.RtmpCamera2;
import com.pedro.rtplibrary.view.OpenGlView;
import com.reactnativertmppublisher.enums.StreamState;
import com.reactnativertmppublisher.interfaces.ConnectionListener;
import com.reactnativertmppublisher.utils.ObjectCaster;

import java.io.File;
import java.io.IOException;
import java.util.Date;

public class Publisher {
  private final OpenGlView _openGLView;
  private final RtmpCamera2 _rtmpCamera;
  private final ThemedReactContext _reactContext;
  ConnectionChecker connectionChecker = new ConnectionChecker();
  private String _streamUrl;
  private String _streamName;
  // private File folder;

  public Publisher(ThemedReactContext reactContext, OpenGlView openGlView) {
    _reactContext = reactContext;
    _openGLView = openGlView;
    _rtmpCamera = new RtmpCamera2(openGlView, connectionChecker);

    connectionChecker.addListener(createConnectionListener());

    // folder = getRecordPath();
  }

  // public static File getRecordPath() {
  //   File storageDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM);
  //   return new File(storageDir.getAbsolutePath() + "/ZomeTV");
  // }

  // public static void updateGallery(Context context, String path) {
  //   context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.fromFile(new File(path))));
  // }

  public RtmpCamera2 getRtmpCamera() {
    return _rtmpCamera;
  }

  public ConnectionListener createConnectionListener() {
    return new ConnectionListener() {
      @Override
      public void onChange(String type, Object data) {
        eventEffect(type);
        WritableMap eventData = ObjectCaster.caster(data);

          _reactContext
            .getJSModule(RCTEventEmitter.class)
            .receiveEvent(_openGLView.getId(), type, eventData);
      }
    };
  }

  private void eventEffect(@NonNull String eventType) {
    switch (eventType) {
      case "onConnectionStarted": {
        WritableMap event = Arguments.createMap();
        event.putString("data", String.valueOf(StreamState.CONNECTING));

        _reactContext
          .getJSModule(RCTEventEmitter.class)
          .receiveEvent(_openGLView.getId(), "onStreamStateChanged", event);
        break;
      }

      case "onConnectionSuccess": {
        WritableMap event = Arguments.createMap();
        event.putString("data", String.valueOf(StreamState.CONNECTED));

        _reactContext
          .getJSModule(RCTEventEmitter.class)
          .receiveEvent(_openGLView.getId(), "onStreamStateChanged", event);
        break;
      }

      case "onDisconnect": {
        WritableMap event = Arguments.createMap();
        event.putString("data", String.valueOf(StreamState.DISCONNECTED));

        _reactContext
          .getJSModule(RCTEventEmitter.class)
          .receiveEvent(_openGLView.getId(), "onStreamStateChanged", event);
        break;
      }

      case "onConnectionFailed": {
        WritableMap event = Arguments.createMap();
        event.putString("data", String.valueOf(StreamState.FAILED));

        _reactContext
          .getJSModule(RCTEventEmitter.class)
          .receiveEvent(_openGLView.getId(), "onStreamStateChanged", event);
        break;
      }
    }
  }


  //region COMPONENT METHODS
  public String getPublishURL() {
    //if(_streamUrl == null || _streamName == null) return null;
    return _streamUrl + "/" + _streamName;
  }

  public void setStreamUrl(String _streamUrl) {
    this._streamUrl = _streamUrl;
  }

  public void setStreamName(String _streamName) {
    this._streamName = _streamName;
  }

  public boolean isStreaming() {
    return _rtmpCamera.isStreaming();
  }

  public boolean isOnPreview() {
    return _rtmpCamera.isOnPreview();
  }

  public boolean isAudioPrepared() {
    return _rtmpCamera.prepareAudio();
  }

  public boolean isVideoPrepared() {
    return _rtmpCamera.prepareVideo();
  }

  public boolean hasCongestion() {
    return _rtmpCamera.hasCongestion();
  }

  public boolean isAudioMuted() {
    return _rtmpCamera.isAudioMuted();
  }

  public void disableAudio() {
    _rtmpCamera.disableAudio();
  }

  public void enableAudio() {
    _rtmpCamera.enableAudio();
  }

  public void switchCamera() {
    _rtmpCamera.switchCamera();
  }

  public void toggleFlash() {
    try {
      if(_rtmpCamera.isLanternEnabled()){
        _rtmpCamera.disableLantern();
        return;
      }

      _rtmpCamera.enableLantern();
    }
    catch (Exception e){
      e.printStackTrace();
    }
  }

  public void startStream() {
    // if(!folder.exists()) {
    //   folder.mkdir();
    // }
    if(!_rtmpCamera.isStreaming() && getPublishURL().startsWith("rtmp://"))
    {
      if(_rtmpCamera.prepareAudio() && _rtmpCamera.prepareVideo(1920, 1080, 10000 * 1024)) {
        _rtmpCamera.startStream(getPublishURL());
        // try {
        //   _rtmpCamera.startStreamAndRecord(getPublishURL(), folder.getAbsolutePath() + "/reee.mp4");
        //   // _rtmpCamera.startRecord(folder.getAbsolutePath() + "/reeee.mp4");

        // } catch (IOException e) {
        //   e.printStackTrace();
        // }
      }
    }
    //Updated from rtmpcamera1 tp rtmpcamera2


    //For some reason the preview stops when using the code below.
    //Ive played around with it a bit, and i cant see why it would stop.


    // try {
    //   boolean isAudioPrepared = _rtmpCamera.prepareAudio();
    //   boolean isVideoPrepared = _rtmpCamera.prepareVideo(1920, 1080, 10000 * 1024);

    //   if (!isAudioPrepared || !isVideoPrepared || _streamName == null || _streamUrl == null) {
    //     return;
    //   }

    //   String url = _streamUrl + "/" + _streamName;
    //   _rtmpCamera.startStream(url);
    // } catch (Exception e) {
    //   e.printStackTrace();
    // }
  }

  public void stopStream() {
    try {
      boolean isStreaming = _rtmpCamera.isStreaming();

      if (!isStreaming) {
        return;
      }


      _rtmpCamera.stopStream();
      // if(_rtmpCamera.isRecording()) {
      //   _rtmpCamera.stopRecord();
      //   updateGallery(this._reactContext, folder.getAbsolutePath() + "/reee.mp4");
      // }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
  //endregion

}
