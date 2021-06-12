import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal } from 'react-native-paper';
import { Button, RadioButton, Text } from '../../components';
import { colors } from '../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector } from 'react-redux';

const ChooseSecurityLevel: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [level, setLevel] = useState(1);
  
  const auth = useSelector((state: any) => state.auth);
  const username = auth.usename;

  useEffect(() => {
    if (!username) return;

    const checkStore = async () => {
      await AsyncStorage.getItem(`${username}-private`);
    };
  }, [username]);

  const hideModal = () => setVisible(false);

  return (
    <Modal
      visible={visible}
      dismissable={false}
      //   onDismiss={hideModal}
      contentContainerStyle={{ backgroundColor: colors.white, padding: 20 }}>
      <Text style={styles.textInfo}>Bạn cần mức độ an toàn cho tài khoản của bạn ở mức nào?</Text>
      <View>
        <RadioButton
          style={styles.radio}
          label="Cao (Cập nhật khóa mỗi lần đăng nhập)"
          checked={level === 0}
          onPress={() => setLevel(0)}
        />
        <RadioButton
          style={styles.radio}
          label="Vừa (Cập nhật khóa mỗi ngày)"
          checked={level === 1}
          onPress={() => setLevel(1)}
        />
        <RadioButton
          style={styles.radio}
          label="Thấp (Cập nhật khóa mỗi tuần)"
          checked={level === 2}
          onPress={() => setLevel(2)}
        />
        <RadioButton
          style={styles.radio}
          label="Kém (Không cập nhật khóa)"
          checked={level === 3}
          onPress={() => setLevel(3)}
        />
        <Button style={styles.done} onPress={hideModal} label="Xong" />
      </View>
    </Modal>
  );
};

export default ChooseSecurityLevel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  textInfo: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  radio: {
    marginTop: 8,
  },
  done: {
    marginTop: 24,
    marginBottom: 16,
  },
});
