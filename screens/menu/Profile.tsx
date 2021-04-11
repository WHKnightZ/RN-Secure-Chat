import React from 'react';
import { ScrollView, View, StyleSheet, ImageBackground, Image } from 'react-native';
import { useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import { Text, HeaderBar, PaddingView } from '../../components';
import { colors, defaultUuid } from '../../constants';
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
  navigation: { push: any; navigate: any; goBack: any };
}

const Profile: React.FC<Props> = (props) => {
  const { navigation } = props;

  const auth = useSelector((state: any) => state.auth);
  const cover = auth.cover ? { uri: auth.cover } : require('./default-cover.jpg');
  const avatar = auth.avatar_path ? { uri: auth.avatar_path } : require('../default-avatar.png');

  const RenderItem = ({ icon, title, border }: any) => {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: colors.white,
          alignItems: 'center',
          paddingHorizontal: 18,
          paddingVertical: 14,
          borderTopWidth: 0.8,
          borderStyle: 'solid',
          borderTopColor: '#f3f4f5',
        }}>
        <View style={{ width: 30 }}>
          <FontAwesome5 name={icon} size={18} color={colors.primary} />
        </View>
        <Text style={{ fontSize: 15 }}>{title}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: colors.white }}>
      <HeaderBar parent="Menu" title="Trang cá nhân" isBack />
      <View style={{ paddingHorizontal: 24, alignItems: 'center', paddingBottom: 10 }}>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <ImageBackground
            source={cover}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 8,
              overflow: 'hidden',
            }}
          />
          <Image
            source={avatar}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              bottom: -50,
              position: 'absolute',
              borderColor: colors.white,
              borderWidth: 3,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            marginTop: 60,
          }}>
          {auth.display_name || auth.username || 'None'}
        </Text>
      </View>
      <PaddingView>
        <RenderItem icon="transgender" title={`Giới tính ${auth.gender ? 'Nam' : 'Nữ'}`} />
        <RenderItem icon="birthday-cake" title="Ngày sinh 24/08/1997" />
        <RenderItem icon="phone-alt" title="Điện thoại 0366918587" />
        <RenderItem icon="lock" title="Khóa định danh" />
        <View style={styles.center}>
          <View style={styles.viewUserId}>
            <Text style={styles.userId}>{(auth.user_id || defaultUuid).replace(/-/g, '')}</Text>
          </View>
        </View>
        <View style={styles.center}>
          <QRCode value={auth.user_id} size={200} />
        </View>
      </PaddingView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    marginVertical: 12,
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
