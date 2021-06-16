import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HeaderBar, PaddingView, RadioButton, Text } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { changeSecurityLevel } from '../../store/common/actions';
import { slChoices } from '../../config';
import { saveSecurityLevel } from '../../utils';

interface Props {
  navigation: { push: any; navigate: any; goBack: any };
}

const ChooseSecurityLevel: React.FC<Props> = (props) => {
  const { navigation } = props;

  const securityLevel = useSelector((state: any) => state.common.securityLevel);
  const [level, setLevel] = useState(securityLevel);

  const dispatch = useDispatch();
  const username = useSelector((state: any) => state.auth.username);

  const done = () => {
    saveSecurityLevel(username, level);
    dispatch(changeSecurityLevel(level));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} title="Thiết lập mức độ an toàn" isBack />
      <PaddingView style={styles.center}>
        <Text style={styles.textInfo}>Bạn cần mức độ an toàn cho tài khoản của bạn ở mức nào?</Text>
        <View style={{ width: '100%', flex: 1 }}>
          {slChoices.map((item) => (
            <RadioButton
              key={item.value}
              style={styles.radio}
              label={item.label}
              checked={level === item.value}
              onPress={() => setLevel(item.value)}
            />
          ))}
          <View style={{ alignItems: 'center' }}>
            <Button style={styles.done} onPress={done} label="Xong" />
          </View>
        </View>
      </PaddingView>
    </View>
  );
};

export default ChooseSecurityLevel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 18,
    paddingVertical: 30,
  },
  textInfo: {
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 20,
  },
  radio: {
    marginTop: 10,
  },
  done: {
    marginTop: 42,
    marginBottom: 8,
    height: 44,
    width: 260,
  },
});
