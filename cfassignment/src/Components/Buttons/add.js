import React, {Component} from 'react'

const styles = {
    backgroundColor: "grey",
    color: "white",
    fontSize: "12px",
    border: "none",
    borderRadius: "3px",
    padding: "12px",
    marginTop: "24px"
}

class Add extends Component{

    render(){
        return(
            <button style={styles}>Add Task</button>
        )
    }

}

export default Add