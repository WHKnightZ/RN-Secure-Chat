import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import { Text, HeaderBack, SafeAreaView, PaddingView } from '../../components';

interface Props {
  navigation: any;
}

const AddContact: React.FC<Props> = (props) => {
  const { navigation } = props;
  const auth = useSelector((state: any) => state.auth);

  return (
    <SafeAreaView>
      <HeaderBack title="Thêm bạn" navigation={navigation} />
      <PaddingView>
        <View>
          <Text>Tìm theo tên</Text>
          <Text>Tìm theo mã QR</Text>
        </View>
        <View>
          <Text>Khóa định danh của bạn</Text>
          <Text>Mỗi tài khoản Secure Chat có một Khóa định danh duy nhất kết bạn với tài khoản Secure Chat khác</Text>
          {/* <TouchableOpacity>Chia sẻ ngay</TouchableOpacity> */}
          {/* <View>{auth.user_id}</View> */}
          {/* <TouchableOpacity>Sao chép</TouchableOpacity> */}
          <QRCode value={auth.user_id} size={400} />
        </View>
      </PaddingView>
    </SafeAreaView>
  );
};

export default AddContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
