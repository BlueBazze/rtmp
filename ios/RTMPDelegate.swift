//
//  RTMPDelegate.swift
//  RtmpPublish
//
//  Created by Sámuel Tausen Garðalíð on 08/04/2022.
//  Copyright © 2022 Facebook. All rights reserved.
//

import Foundation
import HaishinKit

class RTMPDelegate: RTMPStreamDelegate {
    
    private var lastBwChange = 0
    
    func rtmpStreamDidClear(_ stream: RTMPStream) {
        
    }
    
    func rtmpStream(_ stream: RTMPStream, didPublishInsufficientBW connection: RTMPConnection) {
            
            
            // If we last changed bandwidth over 10 seconds ago
            if (Int(NSDate().timeIntervalSince1970) - lastBwChange) > 5 {
                
                
                // Reduce bitrate by 30% every 10 seconds
                let b = Double(stream.videoSettings[.bitrate] as! UInt32) * Double(0.7)
                
                stream.videoSettings[.bitrate] = b
                lastBwChange = Int(NSDate().timeIntervalSince1970)
                
                
                
            } else {
                //print("ABR: Still giving grace time for last bandwidth change")
            }
        }
    func rtmpStream(_ stream: RTMPStream, didPublishSufficientBW connection: RTMPConnection) {
        // If we last changed bandwidth over 10 seconds ago
        if (Int(NSDate().timeIntervalSince1970) - lastBwChange) > 5 {
            
            
            // Reduce bitrate by 30% every 10 seconds
            let b = Double(stream.videoSettings[.bitrate] as! UInt32) * Double(1.05)
            
            stream.videoSettings[.bitrate] = b
            lastBwChange = Int(NSDate().timeIntervalSince1970)
            
            
            
        } else {
            //print("ABR: Still giving grace time for last bandwidth change")
        }
        }
    
    
    
}
