/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {ScrollView, TouchableOpacity, View, Text} from 'react-native';
import Addbutton from './Addbutton';
import styles from './styles';

interface taskjson {
  task: string;
  id: number;
  hour: number;
  minute: number;
  day: number;
  month: number;
  year: number;
}

interface Props {
  alltasks: taskjson[];
  removetask: () => void;
  visibleModal: boolean;
  setVisiblemodal: (arg: boolean) => void;
  delTask: (arg: string) => void;
}

const Alltasks: FC<Props> = props => {
  let alltasks = props.alltasks;
  let visibleModal = props.visibleModal;
  let setVisiblemodal = props.setVisiblemodal;
  let delTask = props.delTask;
  let count = 0;
  //let setAlltasks = props.setalltasks;

  return (
    <>
      <ScrollView style={styles.tasksscroll}>
        {alltasks.map(item => {
          count += 1;
          return (
            <View key={count} style={[styles.taskitemview]}>
              <TouchableOpacity
                style={styles.taskitemcancel}
                onPress={() => delTask(item.task)}>
                <Text style={styles.taskitemtextsecond}>×</Text>
              </TouchableOpacity>
              <Text style={[styles.taskitemtext]}>
                {`${item.task}\n`}
                <Text
                  style={[{fontSize: 12}, {color: '#454545'}]}>{`Deadline: ${
                  item.hour.toString().length === 1
                    ? `0${item.hour}`
                    : `${item.hour}`
                }:${
                  item.minute.toString().length === 1
                    ? `0${item.minute}`
                    : `${item.minute}`
                } on ${item.day}/${item.month + 1}/${item.year}`}</Text>
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <Addbutton
        visibleModal={visibleModal}
        setVisiblemodal={setVisiblemodal}
      />
    </>
  );
};

export default Alltasks;
