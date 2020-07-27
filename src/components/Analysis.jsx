import { Line, Circle } from 'rc-progress';
import '../styles/analysis.css'
import React from 'react'
// import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
// import TasksTable from './TasksTable'
// import AddTask from './AddTask'
import { inject, observer } from 'mobx-react'
import '../styles/tasksPage.css'
// import { toJS } from 'mobx'
// import SuperTable from './SuperTable'
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react'


const Analysis = inject('tasksStore')(observer((props) => {
    const [urgentTasks, setUrgent] = useState(0)
    const [completedTasks, setCompleted] = useState(0)

    const getAnalysis = () => {
        props.tasksStore.getTasksFromDB(props.tasksStore.userId)
        let tasks = props.tasksStore._tasks
        tasks = JSON.parse(JSON.stringify(tasks))
        const totalTasks = tasks.length 
        // eslint-disable-next-line
        const completedTasks = tasks.filter(u=>(u.status=="3" || u.status=="Completed")).length
        // eslint-disable-next-line
        const urgentTasks = tasks.filter(u=>(u.priority=="1" || u.priority=="Urgent")).length
        // eslint-disable-next-line
        const numUrgent = (totalTasks==0 || urgentTasks==0) ? 0 :  (urgentTasks/totalTasks)*100
        // eslint-disable-next-line
        const numCom = (totalTasks==0 || completedTasks==0) ? 0 :  (completedTasks/totalTasks)*100
        setUrgent(numUrgent)
        setCompleted(numCom)
    }


    return (
        <div className="analysis">
            <br />
            <Button variant='contained' color='primary' onClick={() => getAnalysis()}> Check Progress </Button>
            {/* <button onClick={getAnalysis}>Check Progress</button> */}
            <h2>Urgent Tasks {parseInt(urgentTasks, 10)}%</h2>
            <Line percent={urgentTasks} strokeWidth="4" strokeColor="red" />
            <h2>Tasks Completed {parseInt(completedTasks, 10)}%</h2>
            <Circle percent={completedTasks} strokeWidth="4" strokeColor="green" />
        </div>
    )

}))

export default Analysis;