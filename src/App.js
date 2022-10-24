import './App.css';
import React from 'react'
import {useState, useEffect} from 'react'
//import fetch from 'fetch'
/*
import { Button } from '@mui/material';
(MUI Package was not properly interfacing in recitation) */

/* Implemented at least 2 components other than the Projects component in HardwareSet and Button*/
/* Reused HardwareSet component multiple times within the Projects component to further modularize the project*/
/* Used custom event handling to change the state of initNum and startNum in order to properly update the available units*/
function HardwareSet(props){
  const [initNum, setNum] = useState();
  const [startNum, newNum] = useState(100);
  const HWSetName = props.number;
  //const projectName = props.projectNum;
  const [info, setInfo] = useState([{}]);
  useEffect(() => {
      fetch("/checkIn", {mode:"no-cors"}).then(res => res).then(info => setInfo(info), console.log(info)).catch(error => console.log('Error Present', error))
  }, []);
  const changeValue = (event) => {
    setNum(parseInt(event.target.value));
  };
  const incValue = (e) => {
    e.preventDefault();
    if ((initNum+startNum)>100){
      newNum(100);
      alert(initNum + " hardware checked in but maxed at 100 for HW Set " + HWSetName);
    }
    else {
      newNum(initNum+startNum);
      alert(initNum + " hardware checked in for HW Set " + HWSetName);
    }
  };
  const decValue = (e) => {
    e.preventDefault();
    if ((startNum-initNum)<0){
      newNum(0);
      alert(initNum + " hardware checked out but reduced to 0 for HW Set " + HWSetName);
    }
    else {
      newNum(startNum-initNum);
      alert(initNum + " hardware checked out for HW Set " + HWSetName);
    }
  };
  return(
    <header>
      <form className = 'customheader'> HW Set {props.number}: {startNum}/{props.initsize}
        <label> 
        <input type = "number" min = {0} max = {props.initsize} placeholder = {props.title}  onChange = {changeValue} value = {initNum}/>
        </label>
        <button className = 'in' onClick = {incValue}>Check In</button>
        <button className = 'out' onClick = {decValue}>Check Out</button>
      </form>
    </header>
  )
}

/* Implemented at least 2 components other than the Projects component in HardwareSet and Button*/
/* Reused Button component multiple times within the Projects component to further modularize the project*/
/* Used component Button to have custom event handler to change state of button from Join to Leave */
/* Pass props of project numbers and list the projects that you can access*/
function CustomButton(props){
  const [btnName, setName] = useState(false);
  const projectName = props.projectNum;
  const [info, setInfo] = useState([{}]);
  useEffect(() => {
      fetch("/join", {mode:"no-cors"}).then(res => res.json).then(info => setInfo(info), console.log(info)).catch(error => console.log('Error Present', error))
  }, []);
  const changeName = (e) => {
    e.preventDefault();
    setName(!btnName);
    if (btnName === true){
      e.preventDefault();
      // Send projectName here
      alert("Left Project " + projectName);
    }
    else if (btnName === false){
      e.preventDefault();
      // Send projectName here
      alert("Joined Project " + projectName);
    }
  };
  return (
    <button onClick={changeName} style = {{backgroundColor:  'orange'}}>
      {`${btnName ? 'Leave' : 'Join'}`}
    </button>
  );  
}

/* Passed props from parent to child twice (App passed props to Projects and Projects passed props to HardwareSet)*/
/* Also passed props from parent to child again when Projects passed props to Button */
function Projects(props) {
  const [userName, setUser] = useState('User');
  const changeUser = event => {
    setUser(event.target.value);
  };
  return (
    <header> 
      <input type = 'text' value = {userName} onChange = {changeUser}/>
      <h1>Hello {userName}! This is the project catalog:</h1>
      <h3>Project {props.number/3} <CustomButton projectNum = {props.number/3}/></h3>
      <h3>List of Authorized Users: Person A, Person D, Person G</h3>
      <h2><HardwareSet number = {props.number/3} initsize = {props.initsize} title = {props.title} projectNum = {props.number/3}/></h2>
      <h2><HardwareSet number = {props.number*2/3} initsize = {props.initsize} title = {props.title} projectNum = {props.number/3}/></h2>
      <h3>Project {props.number*2/3} <CustomButton projectNum = {props.number*2/3}/></h3>
      <h3>List of Authorized Users: Person B, Person E, Person H</h3>
      <h2><HardwareSet number = {props.number*3/3} initsize = {props.initsize} title = {props.title} projectNum = {props.number*2/3}/></h2>
      <h2><HardwareSet number = {props.number*4/3} initsize = {props.initsize} title = {props.title} projectNum = {props.number*2/3}/></h2>
      <h3>Project {props.number*3/3} <CustomButton projectNum = {props.number*3/3}/></h3>
      <h3>List of Authorized Users: Person C, Person F, Person I</h3>
      <h2><HardwareSet number = {props.number*5/3} initsize = {props.initsize} title = {props.title} projectNum = {props.number*3/3}/></h2>
      <h2><HardwareSet number = {props.number*6/3} initsize = {props.initsize} title = {props.title} projectNum = {props.number*3/3}/></h2>
    </header>
  )
}

/* <Button>Placeholder Button</Button> (MUI Package was not properly interfacing in recitation) */

/* Passed props from parent to child twice (App passed props to Projects and Projects passed props to HardwareSet)*/
/*  projectId qty */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Projects title = 'Enter Qty' number = {3} initsize = {100}/>
      </header>
    </div>
  ); 
}

/*
class App extends React.Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <Projects title = 'Enter Qty' number = {3} initsize = {100}/>
        </header>
      </div>
    );
  }
}
*/

export default App;
