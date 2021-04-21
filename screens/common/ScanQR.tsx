import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, View, Platform, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useDispatch, useSelector } from 'react-redux';
import { hideScanQR } from '../../store';
import { Text } from '../../components';
import { colors } from '../../constants';

const ScanQR: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // const handleBackButton = () => {
  //   dispatch(hideScanQR());
  //   ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
  //   return true;
  // };

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  //   return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  // }, []);

  const common = useSelector((state: any) => state.common);
  const { show, callback } = common.scanQR;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!show || hasPermission || Platform.OS === 'web') return;

    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [show]);

  if (Platform.OS === 'web') return <View />;

  const handleBarCodeScanned = async ({ type, data }: any) => {
    dispatch(hideScanQR());
    if (data.length !== 36) {
      Alert.alert('Mã không đúng!');
      return;
    }
    callback?.(data);
  };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <Modal transparent={true} animationType="slide" visible={show} onRequestClose={() => dispatch(hideScanQR())}>
      <View style={styles.container}>
        {hasPermission && (
          <BarCodeScanner
            barCodeTypes={['qr']}
            onBarCodeScanned={handleBarCodeScanned}
            style={[StyleSheet.absoluteFillObject, styles.camera]}></BarCodeScanner>
        )}
        <Image
          source={require('./BarcodeMask.png')}
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
          }}
        />
        <View style={styles.footer}>
          <Text style={{ textAlign: 'center', fontSize: 24, color: colors.white }}>
            Di chuyển camera đến vùng chứa mã QR để quét
          </Text>
          <TouchableOpacity activeOpacity={0.9} onPress={() => dispatch(hideScanQR())} style={styles.back}>
            <Text style={{ color: colors.white, fontSize: 18, paddingBottom: 8 }}>Quay Lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    zIndex: 10,
    elevation: 10,
  },
  back: {
    backgroundColor: colors.primary,
    width: 140,
    height: 50,
    borderRadius: 25,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
