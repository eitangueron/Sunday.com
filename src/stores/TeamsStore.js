import { observable, action } from "mobx";
// import Task from '../stores/Task'
import axios from 'axios';
const dateFormat = require('dateformat');
const API_URL = 'http://localhost:3200';
// const API_URL = '';


export class TeamsStore {
    
    constructor() {
        this.getTeams(localStorage.getItem('userId'))
    }

    @observable teams = []

    @action getTeams = async (userId) => {
        if (!userId) { return }
        const teamsArr = []
        const data = await axios.get(`${API_URL}/teams/${parseInt(userId)}`);
        const teams = data.data
        for (let team of teams) {
            let teamInfo = {}
            teamInfo.name = team.teamName
            teamInfo.id = team.teamId
            const tasksFromAPI = await axios.get(`${API_URL}/teamstasks/${team.teamId}`);
            const membersFromAPI = await axios.get(`${API_URL}/members/${team.teamId}`);
            const teamTasks = tasksFromAPI.data
            teamInfo.tasks = []
            for (let task of teamTasks) {
                let taskInfo = {}
                taskInfo.task = task
                const tasksUserFromAPI = await axios.get(`${API_URL}/taskuser/${task.taskId}`);
                taskInfo.assignee = (tasksUserFromAPI.data).map(u => u.userName)[0]
                teamInfo.tasks.push(taskInfo)
            }
            teamInfo.members = (membersFromAPI.data).map(u => u.userName)
            teamsArr.push(teamInfo)
        }
        this.teams = teamsArr
    }
    

    @action addTeam = async (teamName, userId) => {
        const team1 = {
            "teamName": teamName,
            "userId": userId
        }
        // eslint-disable-next-line
        const response = await axios.post(`${API_URL}/teams`, team1)
        this.getTeams(localStorage.getItem('userId'))

        // const id = response.data.teamId
        // this.teams.push({ name: teamName, id: id })
    }
    @action addTask = async (teamName, rowData) => {
        const userName = rowData.assignee
        const response1 = await axios.get(`${API_URL}/userid/${userName}`)
        const userId = response1.data.userId
        const taskToAdd = {
            taskName: rowData.taskName,
            description: 'A team Task',
            status: rowData.status,
            priority: rowData.priority,
            deadLine: dateFormat(new Date(rowData.deadLine), 'isoDate'),
            budget: rowData.budget,
            category: 'Team'
        }
        const response2 = await axios.post(`${API_URL}/tasks/${userId}`, taskToAdd)
        const taskId = response2.data.taskId
        const teamId = this.teams.find(t => t.name === teamName).id
        await axios.post(`${API_URL}/teamstasks/${teamId}/${taskId}`)
        this.getTeams(localStorage.getItem('userId'))
    }

    @action deleteTask(taskId){

    }

    // getTeams = async (userId) => {
    //     const response = await axios.get(`${API_URL}/teams/${userId}`)
    //     return response.data
    // }

}