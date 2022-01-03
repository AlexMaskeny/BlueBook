import React from 'react';
import { TouchableOpacity } from 'react-native';

import SubTitle from "../text/SubTitle";
import Title from "../text/Title";

function ClickableText({title, onPress, style, type, tStyle, ...otherProps}) {
  return (
        <TouchableOpacity style={style} onPress={onPress}>  
          {type=="subTitle" &&
            <SubTitle style={tStyle} {...otherProps}>{title}</SubTitle>
          }
          {type=="title" &&
            <Title style={tStyle} {...otherProps}>{title}</Title>
          }
        </TouchableOpacity>
  );
}

export default ClickableText;