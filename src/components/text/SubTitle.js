import React from 'react';
import { Text } from 'react-native';

import globalColors from '../../config/globalColors';
import globalStyles from '../../config/globalStyles';

function SubTitle({color = globalColors.text2, size = 18, children, style, ...otherProps}) {
    return (
        <Text style={[{color: color, fontSize: size, fontWeight: "400"}, globalStyles.font, style]} {...otherProps}>{children}</Text>
    );
}

export default SubTitle;