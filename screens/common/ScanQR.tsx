import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, BackHandler, ToastAndroid } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

interface Props {
  // navigation: { navigate: (routeName: string) => void };
}

const ScanQR: React.FC<Props> = (props) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  const handleBackButton = () => {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

export default ScanQR;

const styles = StyleSheet.create({
  container: { flex: 1, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 },
});
