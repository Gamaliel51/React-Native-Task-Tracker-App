/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    alignContent: 'center',
  },
  whitetext: {
    color: 'white',
  },
  headingtextview: {
    width: '100%',
    height: '10%',
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingtext:{
    color: '#FFFDD0',
    fontSize: 30,
  },
  taskitemview: {
        backgroundColor: '#FFFDD0',
        flex: 1,
        fontSize: 24,
        marginTop: 24,
        paddingVertical: 30,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 0,
        borderLeftColor: '#FFFDD0',
        borderColor: 'black',
        flexDirection: 'row-reverse',
        elevation: 20,
        alignSelf: 'center',
        padding: 12,
  },
  taskitemtext: {
    flex: 1,
    fontSize: 20,
    flexWrap: 'wrap',
    color: 'black',
  },
  taskitemtextsecond: {
    fontSize: 30,
    color: 'black',
  },
  taskitemcancel: {
    marginLeft: '15%',
    marginRight: '2%',
    width: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tasksscroll: {
    flexDirection: 'column',
    width: '99%',
  },
  addtaskbuttonview: {
    height: '20%',
    backgroundColor: 'white',
    flexDirection: 'row-reverse',
  },
  addtaskbutton: {
    borderRadius: 50,
    width: 85,
    height: 85,
    backgroundColor: 'orange',
    marginRight: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    elevation: 20,
  },
  addtaskbuttontext: {
    fontSize: 55,
    color: 'white',
  },
  addtaskmodalview: {
    height: 220,
    width: '70%',
    top: '30%',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: '15%',
    elevation: 100,
    backgroundColor: 'white',
  },
  addtaskmodalviewT: {
    flexDirection: 'row',
  },
  addtaskmodaltextinput: {
    marginHorizontal: '5%',
    marginVertical: '9%',
    borderWidth: 1,
    alignItems: 'center',
    color: 'black',
  },
  addtaskmodalbuttonA: {
    marginLeft: '7%',
    marginRight: '8%',
    backgroundColor: 'orange',
    marginTop: '0%',
    width: '40%',
    height: '55%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addtaskmodalbuttonB: {
    backgroundColor: 'orange',
    marginTop: '0%',
    width: '40%',
    height: '55%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addtaskmodaltextinputall: {
    flexDirection: 'column',
  },
  addtaskmodaltextinputtime: {
    flexDirection: 'row',
  },
  addtaskmodaltextinputday: {
    marginHorizontal: '1%',
    marginLeft: '5%',
    borderWidth: 1,
    alignItems: 'center',
    width: '36%',
  },
  addtaskmodaltextinputhour: {
    marginHorizontal: '1%',
    borderWidth: 1,
    alignItems: 'center',
    width: '13%',
  },
  addtaskmodaltextinputminute: {
    marginHorizontal: '1%',
    borderWidth: 1,
    alignItems: 'center',
    width: '18%',
  },
  addtaskmodaltextinputperiod: {
    marginHorizontal: '1%',
    borderWidth: 1,
    alignItems: 'center',
    width: '18%',
  },
  addtaskmodalallbuttonsview: {
    flexDirection: 'column',
  },
  addtaskmodalbuttonC: {
    marginLeft: '7%',
    marginRight: '8%',
    backgroundColor: 'orange',
    width: '40%',
    height: '55%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addtaskmodalbuttonD: {
    backgroundColor: 'orange',
    width: '40%',
    height: '55%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alltaskmodaldatetimebuttons: {
    flexDirection: 'row',
  },
});

export default styles;
