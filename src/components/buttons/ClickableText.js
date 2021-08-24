import React from 'react';
import { TouchableOpacity } from 'react-native';

import SubTitle from "../text/SubTitle";
import Title from "../text/Title";

function ClickableText({title, onPress, style, type, ...otherProps}) {
  return (
        <TouchableOpacity style={style} onPress={onPress}>  
          {type=="subTitle" &&
            <SubTitle {...otherProps}>{title}</SubTitle>
          }
          {type=="title" &&
            <Title {...otherProps}>{title}</Title>
          }
        </TouchableOpacity>
  );
}

export default ClickableText;