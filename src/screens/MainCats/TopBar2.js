import React, { useEffect, useRef, useState } from 'react';
import {View, Image, TouchableWithoutFeedback, TouchableOpacity, TextInput} from 'react-native';

import globalStyles from '../../config/globalStyles';
import globalColors from '../../config/globalColors';
import styles from './styles';
import functions from './functions';
import SubTitle from '../../components/text/SubTitle';
import IconButton from '../../components/buttons/IconButton';
import { Formik } from 'formik';
import FormField from '../../components/form/FormField'
import NetInfo from '@react-native-community/netinfo';
import API from '@aws-amplify/api';
import { listCategoriess, listLists } from '../../graphql/queries';
import AppTextInput from '../../components/form/AppTextInput';
import Title from '../../components/text/Title';

function topBar({setActive, setListings, setCategories, loading, setLoading}) {
  const inputRef = useRef();
  const lastInput = useRef("");
  const currentInput = useRef("");
  useEffect(()=>{
    inputRef.current.focus();
  })
  return (
    <View style={styles.topBar1}>
        <TouchableOpacity onPress={()=>setActive(false)}>
          <Image source={require('../../../assets/logo.png')} style={{width: 50, height: 50,}} resizeMode="contain"/>
        </TouchableOpacity>
        <View style={{width: 10}} />
            <View style={styles.searchButton}>
                <AppTextInput
                  onChangeText={(text) => functions.getData(text, lastInput, currentInput, setListings, setCategories, loading, setLoading)}
                  autoCapitalize="none"
                  placeholder="What are you looking for?"
                  reference={inputRef}
                />
                <IconButton Material={true} color={globalColors.text2} size={28} icon='cancel' onPress={()=>setActive(false)}/>
            </View>
    </View>
  );
}


export default topBar;