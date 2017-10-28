import React, {Component} from 'react'
import FaTrashO from 'react-icons/lib/fa/trash-o'
const styles = {
    height: "120px",
    border: "none",
    borderColor: "#E8E8E8",
    borderBottomStyle: "solid",
    backgroundColor: "white"
}

const taskStyle = {
    paddingLeft: "10px",
    paddingTop: "10px",
    color: "grey",
    border: "none",
    outline: "none",
    fontSize: "15px",
    resize: "none",
    width: "80%",
    height: "80%"
}
const trashStyle = {
    position: "absolute",
    marginTop: "20px",
    right: "10px",
    color: "grey"

}

class Note extends Component{


    render(){

        console.log(this.props.tasks)

        const taskList = this.props.tasks.map((data,index)=>{
            return(
                <div style={styles} key={index}>
                <textarea style={taskStyle}>
                    {data}
                </textarea>
                    <FaTrashO style={trashStyle}/>
                </div>)
        })
        return(
            <div>
                {taskList}
            </div>
        )
    }

}
export default Note