import React, {Component} from 'react'
import Note from './Notes/notes'
import {Row} from 'react-grid-system'
import axios from 'axios'

const styles = {
    color: "#29293d",
    position: "absolute",
    left: "18%",
}
const addStyle = {
    position: "absolute",
    right: "26%",
}
const add ={
    backgroundColor: "grey",
    color: "white",
    fontSize: "12px",
    border: "none",
    borderRadius: "3px",
    padding: "12px",
    marginTop: "24px"
}
const saveStyle={
    position: "absolute",
    right: "18%",

}
const save ={
    backgroundColor: "#5cd65c",
    color: "white",
    fontSize: "12px",
    border: "none",
    borderRadius: "3px",
    padding: "12px",
    marginTop: "24px"
}
const noteStyle ={
    width: "64%",
    position: "absolute",
    marginTop: "100px",
    marginBottom: "100px",
    left: "18%"
}

class Layout extends Component{
    constructor(props){
        super(props)
        this.state={
            tasks: [],
            editing: false
        }
        this.edit = this.edit.bind(this)
        this.saveTask = this.saveTask.bind(this)
    }
    saveTask(e){

    }

    componentDidMount(){
        axios.get("http://cfassignment.herokuapp.com/nivethida/tasks")
            .then(result => {
                this.setState({
                    tasks: result.data.tasks
                })
            })
    }
    edit(){
        this.setState({
            editing: true
        })
        var newTask = this.state.tasks
        newTask.push(" ")
        this.setState({
            tasks: newTask
        })

    }


    render(){
        return(
            <div>
                <Row>
                <h1 style={styles}>Tasks</h1>
                <div style={addStyle}>
                    <button style={add} onClick={this.edit}>Add Task</button>
                </div>
                <div style={saveStyle}>
                    <button style={save}>Save</button></div>
                </Row>
                <Row>
                <div style={noteStyle}>
                    <Note tasks={this.state.tasks}/>
                </div>
                </Row>
            </div>
        )
    }

}

export default Layout;