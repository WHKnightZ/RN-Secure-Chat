import React, { useState } from 'react';
import { View, StyleSheet, Alert, TextInput } from 'react-native';
import { Text, HeaderBar, PaddingView, Button, TouchableOpacity } from '../../components';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../constants';
import { rsa, getKey } from '../../utils';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
  navigation: { push: any; navigate: any; goBack: any };
}

const DemoRSA: React.FC<Props> = (props) => {
  const { navigation } = props;

  const [decrypted, setDecrypted] = useState('');
  const [encrypted, setEncrypted] = useState('');

  const key = getKey();
  const publicKey = JSON.parse(key.publicKey);
  const privateKey = JSON.parse(key.privateKey);

  const renderProperty = (key: any, property: string) => {
    return (
      <View style={styles.row}>
        <Text style={styles.property}>{property}</Text>
        <View style={styles.viewKey}>
          <Text>{key[property]}</Text>
        </View>
      </View>
    );
  };

  const enc = () => {
    if (!decrypted) return;
    const e = rsa.encrypt(decrypted);
    Alert.alert('Mã hóa thành công', e);
    setEncrypted(e);
  };

  const dec = () => {
    if (!encrypted) return;
    const d = rsa.decrypt(encrypted);
    if (d) {
      Alert.alert('Giải mã thành công', d);
      setDecrypted(d);
    } else Alert.alert('Không thể giải mã');
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderBar navigation={navigation} title="Demo RSA" isBack />
      <PaddingView style={styles.center}>
        <Text style={styles.title}>Public Key</Text>
        {renderProperty(publicKey, 'n')}
        {renderProperty(publicKey, 'e')}
        <Text style={styles.title}>Private Key</Text>
        {renderProperty(privateKey, 'd')}
        {renderProperty(privateKey, 'p')}
        {renderProperty(privateKey, 'q')}
        <TextInput
          style={styles.input}
          placeholder={'Nhập nội dung cần mã hóa'}
          value={decrypted}
          onChangeText={(value) => setDecrypted(value)}
          onSubmitEditing={enc}
        />
        <TextInput
          style={styles.input}
          placeholder={'Nhập nội dung cần giải mã'}
          value={encrypted}
          multiline
          numberOfLines={8}
          blurOnSubmit
          onChangeText={(value) => setEncrypted(value)}
          onSubmitEditing={dec}
          returnKeyType="next"
        />
      </PaddingView>
    </ScrollView>
  );
};

export default DemoRSA;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 14,
    color: colors.primary,
  },
  input: {
    flex: 1,
    fontFamily: 'Regular',
    borderColor: colors.lightGray,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    width: '94%',
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 14,
    flexWrap: 'wrap',
    textAlignVertical: 'top',
  },
  viewKey: {
    width: '88%',
    backgroundColor: '#eaeaea',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },
  property: {
    color: colors.primary,
    marginRight: 10,
    fontSize: 18,
    fontFamily: 'Regular',
  },
});
