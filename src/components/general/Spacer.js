import React from 'react';
import { View } from 'react-native';

import globalColors from "../../config/globalColors";

function Spacer({ top = 0, bottom = 0, color = globalColors.text4, length = "100%", height = 2, align = "center" }) {
  return (
    <View style={{ marginTop: top, marginBottom: bottom, height: height, width: "100%", alignSelf: align, justifyContent: "center" }}>
      <View style={{ alignSelf: align, width: length, backgroundColor: color, height: height }} />
    </View>
  );
}


export default Spacer;