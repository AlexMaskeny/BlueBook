import React, {useRef} from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import Screen from '../../components/general/Screen';
import WebView from 'react-native-webview';
import globalStyles from '../../config/globalStyles';
import TopBar from './TopBarWeb';

function WebModal({enabled, setEnabled, source}) {
    const webRef = useRef();
  return (
    <Modal visible={enabled}>
        <Screen>
            <TopBar setEnabled={setEnabled} title={source} webRef={webRef}/>
            <WebView source={{uri: source}} ref={webRef} />
        </Screen>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
      
  }
});

export default WebModal;