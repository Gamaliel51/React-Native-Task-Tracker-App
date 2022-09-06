/* eslint-disable prettier/prettier */
import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

interface Props {
  visibleModal: boolean;
  setVisiblemodal: (arg: boolean) => void;
}

const Addbutton: FC<Props> = props => {
  let visibleModal = props.visibleModal;
  let setVisiblemodal = props.setVisiblemodal;

  return (
    <View style={[styles.addtaskbuttonview]}>
      <TouchableOpacity
        style={styles.addtaskbutton}
        onPress={() => setVisiblemodal(!visibleModal)}>
        <Text style={[styles.addtaskbuttontext]}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Addbutton;
