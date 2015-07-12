//
//  OGXmlJsonParser.m
//  ReactListView
//
//  Created by Onur Güngören on 12.07.15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
#import "XMLDictionary.h"

@interface OGXmlJsonParser : NSObject <RCTBridgeModule>
@end

@implementation OGXmlJsonParser

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(transformXml:(NSString *)xmlString callback:(RCTResponseSenderBlock)callback) {
  // parse XML string to NSDictionary
  NSDictionary *dictionary = [[XMLDictionaryParser sharedInstance] dictionaryWithString:xmlString];
  
  // convert NSDictionary to NSData
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dictionary options:NSJSONWritingPrettyPrinted error:nil];
  
  // Return NSData as NSString
  NSString *jsonString =  [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  callback(@[jsonString]);
}


@end