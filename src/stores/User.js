// import Axios from "axios";

const { observable, action, computed } = require("mobx");

export class User {
    @observable userName = null
    @observable firstName = null
    @observable lastName = null
    @observable birthDate = null
    @observable email = null
    @observable loggedIn = localStorage.getItem('loggedIn')
    @observable id 

    @action login(details, userID){
        this.userName = details.userName
        this.firstName = details.firstName
        this.lastName = details.lastName
        this.birthDate = details.birthDate
        this.email = details.email
        this.id = userID
        localStorage.setItem("userId", userID)
        localStorage.setItem("loggedIn", 'true')
        localStorage.setItem("username",  details.userName)
        this.loggedIn = 'true'
        // console.log(details);
    }

    @action logout(){
        localStorage.setItem("userId", undefined)
        localStorage.setItem("loggedIn", 'false')
        localStorage.setItem('username', ``);
        localStorage.setItem('firstName', ``);
        localStorage.setItem('lastName', ``);
        localStorage.setItem('email', ``);               
        this.loggedIn = 'false'
    }

    // getTeams = async () =>{
        
    //     const response = await Axios.get(`http://localhost:3200//teams/${localStorage.getItem('userId')}`)
    //     return response.data
    // }
    

    @computed get in(){
        return localStorage.getItem('loggedIn')
    }
}