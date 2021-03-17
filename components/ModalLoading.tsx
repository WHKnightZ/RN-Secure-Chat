import React from 'react';
import { StyleSheet, Modal, View, ActivityIndicator } from 'react-native';
import { colors } from '../constants';

interface Props {
  loading: boolean;
}

const ModalLoading: React.FC<Props> = (props) => {
  const { loading } = props;
  return (
    <Modal transparent={true} animationType="fade" visible={loading}>
      <View style={styles.modalBackground}>
        <ActivityIndicator animating={true} size={60} color={colors.white} />
      </View>
    </Modal>
  );
};

export default ModalLoading;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
});
