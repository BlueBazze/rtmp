//
//  RTMPView.swift
//  rtmpPackageExample
//
//  Created by Ezran Bayantemur on 15.01.2022.
//

import UIKit
import HaishinKit
import AVFoundation

class RTMPView: UIView {
  private var hkView: MTHKView!
  @objc var onDisconnect: RCTDirectEventBlock?
  @objc var onConnectionFailed: RCTDirectEventBlock?
  @objc var onConnectionStarted: RCTDirectEventBlock?
  @objc var onConnectionSuccess: RCTDirectEventBlock?
  @objc var onNewBitrateReceived: RCTDirectEventBlock?
  @objc var onStreamStateChanged: RCTDirectEventBlock?
  
  @objc var streamURL: NSString = "" {
    didSet {
      RTMPCreator.setStreamUrl(url: streamURL as String)
    }
  }
  
  @objc var streamName: NSString = "" {
    didSet {
      RTMPCreator.setStreamName(name: streamName as String)
    }
  }
  
  override init(frame: CGRect) {
    super.init(frame: frame)

        hkView = MTHKView(frame: UIScreen.main.bounds)
        RTMPCreator.stream.captureSettings = [
            .fps: 60,
            .sessionPreset: AVCaptureSession.Preset.high,
            .continuousAutofocus: true,
            .continuousExposure: true
        ]
    
        RTMPCreator.stream.videoSettings = [
            .width: 720,
            .height: 1280
        ]
        
        RTMPCreator.stream.attachAudio(AVCaptureDevice.default(for: .audio))
        RTMPCreator.stream.attachCamera(DeviceUtil.device(withPosition: AVCaptureDevice.Position.back))

        RTMPCreator.connection.addEventListener(.rtmpStatus, selector: #selector(statusHandler), observer: self)
    
        hkView.attachStream(RTMPCreator.stream)
        
        self.addSubview(hkView)
    }
    
    required init?(coder aDecoder: NSCoder) {
       fatalError("init(coder:) has not been implemented")
     }
  
    @objc
    private func statusHandler(_ notification: Notification){
      let e = Event.from(notification)
       guard let data: ASObject = e.data as? ASObject, let code: String = data["code"] as? String else {
           return
       }
    
       switch code {
       case RTMPConnection.Code.connectSuccess.rawValue:
         if onConnectionSuccess != nil {
              onConnectionSuccess!(nil)
            }
           changeStreamState(status: "CONNECTING")
           break
       
       case RTMPConnection.Code.connectFailed.rawValue:
         if onConnectionFailed != nil {
              onConnectionFailed!(nil)
            }
           changeStreamState(status: "FAILED")
           break
         
       case RTMPConnection.Code.connectClosed.rawValue:
         if onDisconnect != nil {
              onDisconnect!(nil)
            }
           break
         
       case RTMPStream.Code.publishStart.rawValue:
         if onConnectionStarted != nil {
              onConnectionStarted!(nil)
            }
           changeStreamState(status: "CONNECTED")
           break
         
       default:
           break
       }
    }
  
  

    public func changeStreamState(status: String){
      if onStreamStateChanged != nil {
        onStreamStateChanged!(["data": status])
       }
    }

    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
          super.viewWillTransition(to: size, with: coordinator)
    if UIDevice.current.orientation.isLandscape {
              print("Landscape")
            //rtmpConnection.removeEventListener(.rtmpStatus, selector: #selector(rtmpStatusHandler), observer: self)
            //rtmpStream.close()
            rtmpStream.orientation = AVCaptureVideoOrientation.landscapeRight
            rtmpStream.videoSettings = [
              
              .width:  1280,
              .height: 720,
              .bitrate: 7000 * 1024,
              .profileLevel: kVTProfileLevel_H264_Baseline_3_1,
              .maxKeyFrameIntervalDuration: 2,
            ]
            //rtmpConnection.addEventListener(.rtmpStatus, selector: #selector(rtmpStatusHandler), observer: self)
            //rtmpStream.publish(BroadcastURL.replacingOccurrences(of: "rtmp://rtmp.seetv.dk/show/", with: ""))
          } else {
              print("Portrait")
            //rtmpConnection.removeEventListener(.rtmpStatus, selector: #selector(rtmpStatusHandler), observer: self)
            //rtmpStream.close()
            rtmpStream.orientation = AVCaptureVideoOrientation.portrait
            rtmpStream.videoSettings = [
              
              .width:  720,
              .height: 1280 ,
              .bitrate: 7000 * 1024,
              .profileLevel: kVTProfileLevel_H264_Baseline_3_1,
              .maxKeyFrameIntervalDuration: 2,
            ]
            //rtmpConnection.addEventListener(.rtmpStatus, selector: #selector(rtmpStatusHandler), observer: self)
            //rtmpStream.publish(BroadcastURL.replacingOccurrences(of: "rtmp://rtmp.seetv.dk/show/", with: ""))
          }
      }
}
