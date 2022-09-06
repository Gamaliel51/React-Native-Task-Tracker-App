/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, NativeModules, SafeAreaView} from 'react-native';
import Addtaskform from './components/Addtaskform';
import Alltasks from './components/Alltasks';
import HeadingText from './components/HeadingText';
import styles from './components/styles';
import {openDatabase} from 'react-native-sqlite-storage';
import SplashScreen from 'react-native-splash-screen';
import Notification from './components/Notifications';

interface dbtask {
  id: number;
  task: string;
  hour: number;
  minute: number;
  day: number;
  month: number;
  year: number;
}

const {AlarmModule} = NativeModules;

export default function App() {
  let windowHeight = Dimensions.get('window').height;
  let windowWidth = Dimensions.get('window').width;
  let empty: dbtask[] = [];
  let temps: dbtask[];
  let todayDate = new Date();
  let taskDate = new Date();

  const [currentTask, setCurrenttask] = useState('');
  const [visibleModal, setVisiblemodal] = useState(false);
  const [alltasks, setAlltasks] = useState(empty);
  const [day, setDay] = useState(todayDate.getDate());
  const [month, setMonth] = useState(todayDate.getMonth());
  const [year, setYear] = useState(todayDate.getFullYear());
  const [hour, setHour] = useState(todayDate.getHours());
  const [minute, setMinute] = useState(todayDate.getMinutes());
  const [period, setPeriod] = useState('');

  useEffect(() => {
    createInfoTable();
    getInfo();
    createTable();
    getAlltasks();
    SplashScreen.hide();
  }, []);

  async function createAlarmMine() {
    console.log(
      `year: ${year}| month: ${month}| day: ${day}| hour: ${hour}| minute: ${minute}`,
    );
    await AlarmModule.setAlarm(
      parseInt(year.toString()),
      parseInt(month.toString()),
      parseInt(day.toString()),
      parseInt(hour.toString()),
      parseInt(minute.toString()),
    );
  }

  async function getAlltasks() {
    const db = await openDatabase({name: 'tasks'});
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM tasks ORDER BY id ASC',
        [],
        (sqltxn, result) => {
          let len = result.rows.length;
          temps = [];
          for (let i = 0; i < len; i++) {
            let item = result.rows.item(i);
            temps.push({
              task: item.task,
              id: item.id,
              hour: item.hour,
              minute: item.minute,
              day: item.day,
              month: item.month,
              year: item.year,
            });
          }
          setAlltasks(temps);
        },
        error => {
          console.error(error);
        },
      );
    });
  }

  async function infoShow() {
    Alert.alert(
      'Welcome Newcomer 🎉🎊',
      'Notice \n-->When A task is cancelled, the scheduled alarm is also deleted.\n-->To stop an ongoing alarm, Click the dismiss button in the notification or simply exit the app. \n\n-Yours sincerely, Ndukwe Miracle Gamaliel -The Creator\n\n  May the force be with you 😄',
    );
    const db = await openDatabase({name: 'tasks'});
    db.transaction(txn => {
      txn.executeSql('INSERT INTO info (done) VALUES (?)', [0]);
    });
  }

  async function getInfo() {
    const db = await openDatabase({name: 'tasks'});
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM info',
        [],
        (sqltxn, result) => {
          console.log(sqltxn);
          console.log('THE RESULT IS ', result);
          let item = result.rows.item(0);
          if (item === undefined) {
            infoShow();
          }
        },
        error => {
          console.error(error);
        },
      );
    });
  }

  const createTable = async () => {
    const db = await openDatabase({name: 'tasks'});
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task VARCHAR(20), hour INTEGER, minute INTEGER, day INTEGER, month INTEGER, year INTEGER)',
        [],
        (sqltxn, result) => {
          console.log('table available');
          console.log('during');
          console.log(sqltxn, result);
        },
      );
    });
  };

  const createInfoTable = async () => {
    const db = await openDatabase({name: 'tasks'});
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS info (done INTEGER)',
        [],
        (sqltxn, result) => {
          console.log('table available');
          console.log('during');
          console.log(sqltxn, result);
        },
      );
    });
  };

  const addnewtask = async (task: string) => {
    if (task === '' || task === ' ') {
      Alert.alert('', 'No task was added.');
      setVisiblemodal(!visibleModal);
      setCurrenttask('');
      return null;
    }

    let checkExist = alltasks.find((item: dbtask) => {
      return task === item.task;
    });
    if (checkExist) {
      Alert.alert('', 'This task already exists.');
      setVisiblemodal(!visibleModal);
      setCurrenttask('');
      return null;
    }
    console.log(`${hour}:${minute},, ${day}/${month}/${year}`);
    const db = await openDatabase({name: 'tasks'});
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO tasks (task, hour, minute, day, month, year) VALUES (?,?,?,?,?,?)',
        [currentTask, hour, minute, day, month, year],
        (sqltxn, result) => {
          console.log(
            'adding success:',
            currentTask,
            hour,
            minute,
            day,
            month,
            year,
          );
          console.log(sqltxn, result);
        },
      );
    });
    let temp = [...alltasks];
    let a = temp[temp.length - 1];
    if (a === undefined) {
      console.log(`a is here: ${a}`);
      let nextnum = 0;
      temp.push({
        task: task,
        id: nextnum + 1,
        hour: hour,
        minute: minute,
        day: day,
        month: month,
        year: year,
      });
      console.log(temp);
      taskDate.setFullYear(year);
      taskDate.setMonth(month);
      taskDate.setDate(day);
      taskDate.setHours(hour);
      taskDate.setMinutes(minute);
      console.log('first date:', taskDate.toISOString());
      createAlarmMine();
      // let notifDate = new Date(year, month, day, hour, minute - 1);
      Notification.schduleNotification(currentTask, taskDate);
      setAlltasks(temp);
      setVisiblemodal(!visibleModal);
      setCurrenttask('');
      return null;
    }
    let nextnum = a.id;
    temp.push({
      task: task,
      id: nextnum + 1,
      hour: hour,
      minute: minute,
      day: day,
      month: month,
      year: year,
    });
    console.log(temp);
    taskDate.setFullYear(year);
    taskDate.setMonth(month);
    taskDate.setDate(day);
    taskDate.setHours(hour);
    taskDate.setMinutes(minute);
    console.log('first date:', taskDate.toISOString());
    createAlarmMine();
    // let notifDate = new Date(year, month, day, hour, minute - 1);
    Notification.schduleNotification(currentTask, taskDate);
    setAlltasks(temp);
    setVisiblemodal(!visibleModal);
    setCurrenttask('');
    return null;
  };

  async function delTask(ctask: string) {
    const db = await openDatabase({name: 'tasks'});
    db.transaction(txn => {
      txn.executeSql(
        'DELETE FROM tasks WHERE task == ?',
        [ctask],
        (sqltxn, result) => {
          console.log(`deleted ${ctask}`);
          console.log(sqltxn, result);
        },
        error => {
          console.error(error);
        },
      );
    });
    temps = [...alltasks];
    temps = temps.filter(item => {
      return item.task !== ctask;
    });
    Notification.cancelNotification(ctask);
    setAlltasks(temps);
  }

  return (
    <SafeAreaView
      style={[styles.container, {width: windowWidth}, {height: windowHeight}]}>
      <HeadingText />
      <Addtaskform
        visibleModal={visibleModal}
        setVisiblemodal={setVisiblemodal}
        currentTask={currentTask}
        setCurrenttask={setCurrenttask}
        addnewtask={addnewtask}
        day={day}
        setDay={setDay}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        hour={hour}
        setHour={setHour}
        minute={minute}
        setMinute={setMinute}
        period={period}
        setPeriod={setPeriod}
      />
      <Alltasks
        alltasks={alltasks}
        removetask={() => setAlltasks}
        visibleModal={visibleModal}
        setVisiblemodal={setVisiblemodal}
        delTask={delTask}
      />
    </SafeAreaView>
  );
}
