import React, {Component} from 'react'
import Add from './Buttons/add'
import Save from './Buttons/save'
import Note from './Notes/notes'
import {Row} from 'react-grid-system'
import axios from 'axios'

const styles = {
    color: "#1c2331",
    position: "absolute",
    left: "18%"
}
const addStyle = {
    position: "absolute",
    right: "26%",
}
const saveStyle={
    position: "absolute",
    right: "18%",
}
const noteStyle ={
    width: "64%",
    position: "absolute",
    left: "18%",
    marginTop: "72px",

}
class Layout extends Component{
    constructor(props){
        super(props)
        this.state={
            tasks: "Buy Milk"
        }
    }
    componentDidMount(){
        axios.get("http://cfassignment.herokuapp.com/nivethida/tasks")
            .then(result => {
                console.log(result.data)
                this.setState({
                    tasks: result.data.tasks
                })
            }).bind(this)
    }
    render(){
        return(
            <div>
                <Row>
                <h1 style={styles}>Tasks</h1>
                <div style={addStyle}>
                <Add  className="addButton"/>
                </div>
                <div style={saveStyle}>
                <Save className="saveButton"/>
                </div>
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