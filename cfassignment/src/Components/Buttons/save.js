import React, {Component} from 'react'

const styles = {
    backgroundColor: "#5cd65c",
    color: "white",
    fontSize: "12px",
    border: "none",
    borderRadius: "3px",
    padding: "12px",
    marginTop: "24px"
}

class Save extends Component{

    render(){
        return(
            <button style={styles}>Save</button>
        )
    }

}

export default Save
