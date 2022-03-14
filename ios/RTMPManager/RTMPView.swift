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
    //TODO set video resolution from react native
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
    
    
    @objc var IsLandscape: Bool = false {
        didSet {
            switch (UIDevice.current.orientation) {
                case .portrait:
                RTMPCreator.stream.orientation = AVCaptureVideoOrientation.portrait
                    break
                case .portraitUpsideDown:
                RTMPCreator.stream.orientation = AVCaptureVideoOrientation.portraitUpsideDown
                    break
                case .landscapeLeft:
                RTMPCreator.stream.orientation = AVCaptureVideoOrientation.landscapeRight
                    break
                    
                case .landscapeRight:
                RTMPCreator.stream.orientation = AVCaptureVideoOrientation.landscapeLeft
                    break
                case .faceUp:
                    break
                case .faceDown:
                    break
                case .unknown:
                    break
                @unknown default:
                    break
            }
            RTMPCreator.setVideoSettings(isLandscape: IsLandscape)
        }
    }
  
  override init(frame: CGRect) {
    super.init(frame: frame)

        hkView = MTHKView(frame: UIScreen.main.bounds)
        RTMPCreator.stream.captureSettings = [
            .fps: 30,
            .sessionPreset: AVCaptureSession.Preset.high,
            .continuousAutofocus: true,
            .continuousExposure: true
        ]
    
        RTMPCreator.stream.videoSettings = [
            .width: 1080,
            .height: 1920
        ]
        
        RTMPCreator.stream.attachAudio(AVCaptureDevice.default(for: .audio))
        RTMPCreator.stream.attachCamera(DeviceUtil.device(withPosition: AVCaptureDevice.Position.back))

        RTMPCreator.connection.addEventListener(.rtmpStatus, selector: #selector(statusHandler), observer: self)
    
        
      
      hkView.isUserInteractionEnabled = true
      hkView.autoresizingMask = [UIView.AutoresizingMask.flexibleHeight,
                                 UIView.AutoresizingMask.flexibleWidth]
      
      hkView.frame = self.bounds
      hkView.videoGravity = AVLayerVideoGravity.resizeAspectFill
      
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

}
