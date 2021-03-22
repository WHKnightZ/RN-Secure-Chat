import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, View, Text, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useDispatch, useSelector } from 'react-redux';
import { hideScanQR } from '../../store';
import { createConversation } from '../../store/conversations/actions';
import { ModalLoading } from '../../components';
import BarcodeMask from './BarcodeMask';

interface Props {}

const ScanQR: React.FC<Props> = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  // const handleBackButton = () => {
  //   dispatch(hideScanQR());
  //   ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
  //   return true;
  // };

  const common = useSelector((state: any) => state.common);
  const navigation = common.navigation;
  const scanQR = common.scanQR;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!scanQR || hasPermission) return;
    if (Platform.OS === 'web') return;

    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [scanQR]);

  if (Platform.OS === 'web') return <View />;

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  //   return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  // }, []);

  const handleBarCodeScanned = async ({ type, data }: any) => {
    dispatch(hideScanQR());
    setLoading(true);
    await createConversation(dispatch, { userId: data });
    setLoading(false);
    navigation.navigate('Conversation', { conversationId: data });
  };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <>
      <Modal transparent={true} animationType="slide" visible={scanQR} onRequestClose={() => dispatch(hideScanQR())}>
        <View style={styles.container}>
          <BarCodeScanner
            barCodeTypes={['qr']}
            onBarCodeScanned={handleBarCodeScanned}
            style={[StyleSheet.absoluteFillObject, styles.camera]}>
            <BarcodeMask />
          </BarCodeScanner>
        </View>
      </Modal>

      <ModalLoading loading={loading} />
    </>
  );
};

export default ScanQR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
