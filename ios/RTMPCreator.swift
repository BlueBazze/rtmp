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
    
    private var currentZoomFactor: CGFloat = 1.0
    private var lastScale: CGFloat = 0.0
    
    

    
    public static func setZoom(scale: CGFloat) {
        stream.setZoomFactor(scale)
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
    
    
    
    public static func setVideoSettings(width: Int = 1080, height: Int = 1920, isLandscape: Bool = false) {
        
            stream.videoSettings = [
                
                .width: isLandscape ? height : width,
                .height: isLandscape ? width : height,
                .bitrate: 10000 * 1024,
                .profileLevel: kVTProfileLevel_H264_Baseline_AutoLevel, // -> Works with (2000 * 1000) bitrate -> kVTProfileLevel_H264_Baseline_5_2,
                //.profileLevel: kVTProfileLevel_H264_Baseline_AutoLevel, kVTProfileLevel_H264_Baseline_4_1 //kVTProfileLevel_H264_Baseline_3_1, kVTProfileLevel_H264_Baseline_AutoLevel
                .maxKeyFrameIntervalDuration: 2,
                .scalingMode: VideoCodec.defaultScalingMode
            ]
        stream.recorderSettings = [
            AVMediaType.audio: [
                            AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
                            AVSampleRateKey: 0,
                            AVNumberOfChannelsKey: 0,
                            //AVEncoderBitRateKey: 128000
                        ],
                        AVMediaType.video: [
                            AVVideoCodecKey: AVVideoCodecH264,
                            AVVideoHeightKey: 0,
                            AVVideoWidthKey: 0,
                            //        AVVideoCompressionPropertiesKey: [
                            //          AVVideoMaxKeyFrameIntervalKey: 2,
                            //          AVVideoProfileLevelKey: AVVideoProfileLevelH264Baseline30,
                            //          AVVideoAverageBitRateKey: 512000,
                            //        ]
                        ]
        ]
        }
    
    

}
