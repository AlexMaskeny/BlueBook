import React from 'react';
import { Text } from 'react-native';

import globalColors from "../../config/globalColors";
import globalStyles from '../../config/globalStyles';

function Title({color = globalColors.text1, size = 22, style, children, ...otherProps}) {
    return (
        <Text style={[{color: color, fontSize: size, fontWeight: "bold"}, globalStyles.font, style]} {...otherProps}>{children}</Text>
    );
}

export default Title;