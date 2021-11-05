import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text,TextInput, Button,View, Picker, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './components/Task';


export default function App() {
  const [task, setTask] = useState({title:"",description:"",status:"Select Status",deadline:""});
  const [taskItems, setTaskItems] = useState([]);
const [filteredItems,setFilteredItems]=useState([])
const [filter,setFilter]=useState(false)
const [isedit,setIsEdit]=useState(false)

 

  

  const handleAddTask = () => {
    // Keyboard.dismiss();
    setIsEdit(false)
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const handlefilter=(filter)=>{
    setFilter(true)
    console.log(filter,"filter")
    let itemsCopy = [...taskItems];
    let filtertasks=itemsCopy.filter(task=>task.status===filter)
    console.log(filtertasks,"filtertasks")
    setFilteredItems(filtertasks)

  }
  const editTask=(index)=>{
    setIsEdit(true)
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
    setTask(taskItems[index])
  }
  const markFinish=(index)=>{

    let itemsCopy = [...taskItems];
    itemsCopy[index].status='Finished'
    setTaskItems(itemsCopy)
  }
  const deleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }

const finalItems=filteredItems?.length>0 || filter ?filteredItems:taskItems
  console.log(task,"task")
  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.filters}>
         <Text  onPress={()=>{setFilteredItems([]);setFilter(false)}} style={styles.filter}>All Tasks</Text>
         <Text  onPress={()=>handlefilter("To Start")} style={styles.filter}>To Start</Text>
         <Text  onPress={()=>handlefilter("In Progress")} style={styles.filter}>In Progress</Text>
         <Text  onPress={()=>handlefilter("Finished")} style={styles.filter}>Finished</Text>
        </View>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            finalItems?.map((item, index) => {
              return (
                <TouchableOpacity key={index} >
                  <Task deleteTask={deleteTask}  markFinish={markFinish} editTask={editTask} task={item} index={index} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
        
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView 
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >

        <View>
        <TextInput style={styles.input} placeholder={'Title'} value={task?.title??""} name="title"   onChange={e=>setTask({...task,title:e.target.value})} />
       
       <TextInput  style={styles.input} placeholder={'Description'} value={task?.description??""} name="description"   onChange={e=>setTask({...task,description:e.target.value})} />
       <Picker
       placeholder="Status"
        selectedValue={task?.status??"To Start"}  
        style={{ height: 50, width: 150 }}
        
        onValueChange={(itemValue, itemIndex) => setTask({...task,status:itemValue})}
      >
          <Picker.Item label="Select Status" value="Select Status" />
        <Picker.Item label="To Start" value="To Start" />
        <Picker.Item label="In Progress" value="In Progress" />
        <Picker.Item label="Finished" value="Finished" />
      </Picker>

      
      <input style={{marginTop:"20px"}} type="date" name="deadline" value={task?.deadline??""} onChange={(e)=>{setTask({...task,deadline:e.target.value})}}></input>
      
        </View>
        <TouchableOpacity onPress={() =>{ handleAddTask();setFilteredItems([]);setFilter(false)}}>
      {  isedit? <Text style={styles.filter}>Edit</Text> :
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>}
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },

  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    marginBottom:10,
    fontSize: 24,
    fontWeight: 'bold'
  },
  filter:{
marginRight:10,
width:100,
height:30,

display:'flex',
alignItems:'center',
justifyContent:'center',
backgroundColor:'lightgreen',
marginRight:'10px',

borderRadius:8

  },
  items: {
    marginTop: 30,
  },
  filters:{
display:'flex',
flexDirection:'row'
  },
  writeTaskWrapper: {
    // position: 'absolute',
    // bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom:20
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    marginBottom:10
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
