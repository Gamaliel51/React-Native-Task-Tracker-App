/* eslint-disable prettier/prettier */
import React, {FC, useState} from 'react';
import {KeyboardAvoidingView, Modal, TextInput, TouchableOpacity, View, Text} from 'react-native';
import styles from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
    visibleModal: boolean,
    setVisiblemodal: (arg: boolean) => void,
    currentTask: string,
    setCurrenttask: (arg: string) => void,
    addnewtask: (arg: string) => void,
    day: number | any,
    setHour: (arg: number | any) => void,
    minute: number | any,
    setMinute: (arg: number | any) => void,
    period: string,
    setPeriod: (arg: string) => void
    setDay: (arg: number | any) => void,
    month: number | any,
    setMonth: (arg: number | any) => void,
    year: number | any,
    setYear: (arg: number | any) => void,
    hour: number | any,
}

const Addtaskform: FC<Props> = (props) => {
    let visibleModal = props.visibleModal;
    let setVisiblemodal = props.setVisiblemodal;
    let currentTask = props.currentTask;
    let setCurrenttask = props.setCurrenttask;
    let addnewtask = props.addnewtask;
    let setHour = props.setHour;
    let setMinute = props.setMinute;
    let setDay = props.setDay;
    let setMonth = props.setMonth;
    let setYear = props.setYear;

    const [show, setShow] = useState(false);
    const [mode, setMode] = useState<any>('');
    const [date ,setDate] = useState(new Date());

  const cancelModal = () => {
    setVisiblemodal(!visibleModal);
    setCurrenttask('');
  };

  const onChange = (event: any, newDate: any) => {
    let currentDate = newDate;
    setDate(currentDate);
    if (mode === 'time') {
      setShow(false);
      setHour(currentDate.getHours());
      setMinute(currentDate.getMinutes());
      setDate(new Date());
      return;
    }
    setShow(false);
    setDay(currentDate.getDate());
    setMonth(currentDate.getMonth());
    setYear(currentDate.getFullYear());
    setDate(new Date());
    return;
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
      <Modal
       animationType="fade"
       transparent={true}
       onRequestClose={() => {setVisiblemodal(!visibleModal);}}
       visible={visibleModal}>
        <View style={styles.addtaskmodalview}>
        <KeyboardAvoidingView behavior="height">
          <TextInput
           style={styles.addtaskmodaltextinput}
           value={currentTask}
           onChangeText={(val) => setCurrenttask(val)}
           placeholder="Enter new Task"/>

          <View style={styles.addtaskmodalallbuttonsview}>
            <View style={styles.alltaskmodaldatetimebuttons}>
              <TouchableOpacity style={styles.addtaskmodalbuttonC} onPress={() => showMode('date')}>
                <Text style={styles.whitetext}>Pick Date</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addtaskmodalbuttonD} onPress={() => showMode('time')}>
                <Text style={styles.whitetext}>Pick Time</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.addtaskmodalviewT}>
              <TouchableOpacity style={styles.addtaskmodalbuttonA} onPress={() => (addnewtask(currentTask))}>
                <Text style={styles.whitetext}>Add Task</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addtaskmodalbuttonB} onPress={() => cancelModal()}>
                <Text style={styles.whitetext}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
          {show && (<DateTimePicker testID="datetimepicker" value={date} mode={mode} display="default" is24Hour={true} onChange={onChange} />)}
          </KeyboardAvoidingView>
        </View>
      </Modal>
  );
};

export default Addtaskform;
