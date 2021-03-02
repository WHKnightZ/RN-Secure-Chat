import React from 'react';
import { StyleSheet, Modal, View, ActivityIndicator } from 'react-native';
import { colors } from '../constants';

interface Props {
  isLoading: boolean;
}

const Loading: React.FC<Props> = (props) => {
  const { isLoading } = props;
  return (
    <Modal transparent={true} animationType="none" visible={isLoading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={isLoading} size="large" />
        </View>
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: colors.white,
    width: 240,
    height: 140,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
