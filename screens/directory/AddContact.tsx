import React from 'react';
import { ScrollView, View, StyleSheet, Clipboard } from 'react-native';
import { useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import { Text, HeaderBar, PaddingView, MenuContainer, MenuItem, TouchableOpacity } from '../../components';
import { colors } from '../../constants';
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
  navigation: any;
}

const AddContact: React.FC<Props> = (props) => {
  const { navigation } = props;
  const auth = useSelector((state: any) => state.auth);

  return (
    <ScrollView>
      <HeaderBar title="Thêm bạn" isBack navigation={navigation} />
      <View>
        <MenuContainer>
          <MenuItem icon="search" title="Tìm theo tên" onPress={() => {}} />
          <MenuItem icon="qrcode" title="Tìm theo mã QR" onPress={() => {}} />
          <MenuItem icon="search-location" title="Tìm theo vị trí" onPress={() => {}} />
        </MenuContainer>
      </View>
      <PaddingView>
        <View>
          <Text style={styles.textYourKey}>Khóa định danh của bạn</Text>
          <Text style={styles.textInfo}>
            Mỗi tài khoản Secure Chat có một Khóa định danh duy nhất kết bạn với tài khoản Secure Chat khác
          </Text>
          <View style={styles.buttonShare}>
            <TouchableOpacity style={styles.viewShare}>
              <FontAwesome5 name="share-alt" size={18} color={colors.white} />
              <Text style={styles.textShare}>Chia sẻ ngay</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <View style={styles.viewUserId}>
              <Text style={styles.userId}>{auth.user_id.replace(/-/g, '')}</Text>
            </View>
          </View>
          <View style={styles.center}>
            <TouchableOpacity style={styles.buttonCopy} onPress={() => Clipboard.setString(auth.user_id)}>
              <FontAwesome5 name="copy" size={16} color={colors.primary} />
              <Text style={styles.textCopy}>Sao chép</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <QRCode value={auth.user_id} size={200} />
          </View>
        </View>
      </PaddingView>
    </ScrollView>
  );
};

export default AddContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
  },
  viewUserId: {
    width: '80%',
    backgroundColor: '#eaeaea',
    borderRadius: 10,
    padding: 14,
  },
  userId: {
    letterSpacing: 5,
  },
  textYourKey: {
    fontSize: 16,
    marginTop: 5,
  },
  textInfo: {
    fontStyle: 'italic',
    fontSize: 13,
    marginTop: 4,
  },
  buttonShare: {
    alignItems: 'center',
    marginVertical: 20,
  },
  viewShare: {
    borderRadius: 18,
    height: 38,
    width: 160,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textShare: {
    color: colors.white,
    marginLeft: 14,
  },
  buttonCopy: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 10,
  },
  textCopy: {
    color: colors.primary,
    marginLeft: 8,
  },
});
