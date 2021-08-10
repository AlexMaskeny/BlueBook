import React from 'react';
import { TouchableOpacity } from 'react-native';

import SubTitle from "../Text/SubTitle";
import Title from "../Text/Title";

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