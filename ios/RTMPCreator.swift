//
//  RTMPCreator.swift
//  rtmpPackageExample
//
//  Created by Ezran Bayantemur on 15.01.2022.
//
import Foundation
import UIKit
import HaishinKit
import AVFoundation
import VideoToolbox

class RTMPCreator {
  public static let connection: RTMPConnection = RTMPConnection()
  public static let stream: RTMPStream = RTMPStream(connection: connection)
  private static var _streamUrl: String = ""
  private static var _streamName: String = ""
  public static var isStreaming: Bool = false
    
    public static var IsLandscape: Bool = false {
        didSet {
            switch (UIDevice.current.orientation) {
                case .portrait:
                stream.orientation = AVCaptureVideoOrientation.portrait
                    break
                case .portraitUpsideDown:
                stream.orientation = AVCaptureVideoOrientation.portraitUpsideDown
                    break
                case .landscapeLeft:
                stream.orientation = AVCaptureVideoOrientation.landscapeRight
                    break
                    
                case .landscapeRight:
                stream.orientation = AVCaptureVideoOrientation.landscapeLeft
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
            setVideoSettings()
        }
    }
  
  public static func setStreamUrl(url: String){
    _streamUrl = url
  }
  
  public static func setStreamName(name: String){
    _streamName = name
  }

  
  public static func getPublishURL() -> String {
    // TODO: Object formatına dönüştürülebilir
    /**
      {
        streamName: _streamName
        streamUrl: _streamUrl
      }
     */
    return "\(_streamUrl)/\(_streamName)"
  }
  
  public static func startPublish(){
    connection.requireNetworkFramework = true
    connection.connect(_streamUrl)
    stream.publish(_streamName)
    isStreaming = true
    
  }
  
  public static func stopPublish(){
    stream.close()
    connection.close()
    isStreaming = false
  }
    
    public static func setVideoSettings(width: Int = 1080, height: Int = 1920) {
        
            stream.videoSettings = [
                
                .width: self.IsLandscape ? height : width,
                .height: self.IsLandscape ? width : height,
                .bitrate: 7000 * 1024,
                .profileLevel: kVTProfileLevel_H264_Baseline_AutoLevel, //kVTProfileLevel_H264_Baseline_3_1,
                .maxKeyFrameIntervalDuration: 2,
            ]
        }

}
