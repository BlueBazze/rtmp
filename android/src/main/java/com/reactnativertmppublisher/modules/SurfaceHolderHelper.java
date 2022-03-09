package com.reactnativertmppublisher.modules;


import android.view.SurfaceHolder;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.ThemedReactContext;
import com.pedro.rtplibrary.rtmp.RtmpCamera2;

public class SurfaceHolderHelper implements SurfaceHolder.Callback {
  private final RtmpCamera2 _rtmpCamera2;

  public SurfaceHolderHelper(ThemedReactContext reactContext, RtmpCamera2 rtmpCamera2, int surfaceId) {
    _rtmpCamera2 = rtmpCamera2;
  }

  @Override
  public void surfaceCreated(@NonNull SurfaceHolder surfaceHolder) {

  }

  @Override
  public void surfaceChanged(@NonNull SurfaceHolder surfaceHolder, int i, int i1, int i2) {
    _rtmpCamera2.startPreview();
    //if(_rtmpCamera2 != null) {
    //  _rtmpCamera2.stopPreview();
    //  _rtmpCamera2.startPreview(1920, 1080);
    //}
  }

  @Override
  public void surfaceDestroyed(@NonNull SurfaceHolder surfaceHolder) {
    _rtmpCamera2.stopPreview();
  }

}
