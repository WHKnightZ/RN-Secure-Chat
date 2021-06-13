import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, HeaderBar, PaddingView, Text } from '../../components';
import { colors } from '../../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  navigation: { push: any; navigate: any; goBack: any };
}

const mappingSLToText: any = {
  1: { text: 'Kém', note: 'Khóa của bạn sẽ không bao giờ được tạo mới' },
  2: { text: 'Thấp', note: 'Khóa của bạn sẽ được cập nhật mới mỗi tuần' },
  3: { text: 'Vừa', note: 'Khóa của bạn sẽ được cập nhật mới mỗi ngày' },
  4: { text: 'Cao', note: 'Khóa của bạn sẽ được cập nhật liên tục mỗi khi bạn bật app' },
};

const Settings: React.FC<Props> = (props) => {
  const { navigation } = props;

  const securityLevel = useSelector((state: any) => state.common.securityLevel);

  const renderSecurityIcons = () => {
    const renderIcon = (key: any, color: string) => (
      <MaterialCommunityIcons style={{ marginHorizontal: 5 }} key={key} name="shield-check" size={50} color={color} />
    );

    let activeItems = [];
    for (let i = 0; i < securityLevel; i++) activeItems.push(renderIcon(i, colors.loading));
    for (let i = securityLevel; i < 4; i++) activeItems.push(renderIcon(i, colors.secondary));
    return <View style={styles.securityLevelIcons}>{activeItems}</View>;
  };

  const renderText = mappingSLToText[securityLevel];

  return (
    <View>
      <HeaderBar navigation={navigation} title="Cài đặt" isBack />
      <PaddingView style={styles.center}>
        <Text style={styles.textSLInfo}>Mức độ an toàn tài khoản của bạn</Text>
        <Text style={styles.textSL}>{renderText.text}</Text>
        {renderSecurityIcons()}
        <Text style={styles.textNote}>Ghi chú: {renderText.note}</Text>
        <Button label="Thay đổi" style={styles.btnChange} onPress={() => navigation.push('ChooseSecurityLevel')} />
      </PaddingView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    marginVertical: 12,
  },
  textSLInfo: {
    fontSize: 24,
    marginTop: 14,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  textSL: {
    fontSize: 36,
    marginTop: 24,
    marginBottom: 30,
    color: colors.primary,
  },
  securityLevelIcons: {
    flexDirection: 'row',
    height: 80,
  },
  textNote: {
    fontSize: 18,
    marginTop: 24,
    marginBottom: 50,
    marginHorizontal: 16,
    color: colors.secondary,
    fontStyle: 'italic',
  },
  btnChange: {
    height: 44,
  },
});
