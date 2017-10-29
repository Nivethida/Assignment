
import React, {Component} from 'react'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaRefresh from 'react-icons/lib/fa/refresh'
import axios from 'axios'
import keyIndex from 'react-key-index';

var _ = require('lodash');

var TaskAppState = {
    TaskError: -1,
    TaskLoading: 0,
    TaskLoaded: 1
};

const styles = {
    color: "#29293d"
}

const add ={
    backgroundColor: "blue",
    minHeight: 35,
    minWidth: 75,
    color: "white",
    fontSize: "12px",
    border: "none",
    borderRadius: "3px"
}

const save ={
    fontSize: "12px",
    minHeight: 35,
    minWidth: 75,
    border: "none",
    borderRadius: "3px"
}

const trashStyle = {
    position: "absolute",
    marginTop: "20px",
    right: "10px"

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
const nStyles = {
        height: "120px",
        border: "none",
        borderColor: "#E8E8E8",
        borderBottomStyle: "solid",
        backgroundColor: "white"

}
class Layout extends Component{
    constructor(props){
        super(props)
        this.state={
            tasks: [],
            statusText: "loading data",
            height: window.innerHeight,
            width: window.innerWidth,
            currState: TaskAppState.TaskLoading,
            isSaveEnabled: false,
            newTaskIndex: -1
        }

        this._onNewEmptyTask = this._onNewEmptyTask.bind(this)
        this._onSaveTask = this._onSaveTask.bind(this)
        this._onTaskChanged = this._onTaskChanged.bind(this)
        this._onDeleteTask = this._onDeleteTask.bind(this)
        this._getTasks = this._getTasks.bind(this)
    }

    componentDidMount(){
        this._getTasks()
    };

    _getTasks() {
        axios.get("http://cfassignment.herokuapp.com/nivethida/tasks")
            .then(result => {
                this.setState({
                    tasks: result.data.tasks,
                    currState: TaskAppState.TaskLoaded
                })
            }).catch((error) => {
            this.setState({
                currState: TaskAppState.TaskError,
                statusText: "Error! Tap refresh to try again."
            })
        })
    }

    _onNewEmptyTask(e){
        e.preventDefault()
        var existingTasks = _.cloneDeep(this.state.tasks);
        existingTasks.push("")
        this.setState({
            tasks: existingTasks,
            newTaskIndex: existingTasks.length - 1
        })
    }

    _onTaskChanged(e){
        e.preventDefault();
        const taskIndex = parseInt(e.target.id, 10);
        const currTasks = _.cloneDeep(this.state.tasks);
        currTasks.splice(taskIndex, 1, e.target.value);
        const isNewTaskEmpty = _.isEmpty(e.target.value)
        this.setState({
           tasks: currTasks,
            isSaveEnabled: taskIndex === this.state.newTaskIndex ? !isNewTaskEmpty : true
        })
    }

    _onDeleteTask(taskIndex){
        const currTasks = _.cloneDeep(this.state.tasks);
        currTasks.splice(taskIndex, 1);
        this.setState({
            tasks: currTasks,
            isSaveEnabled: true
        })
    }

    _onSaveTask(e){
        axios.post("http://cfassignment.herokuapp.com/nivethida/tasks",{
            tasks: _.compact(this.state.tasks)
        }).then((response)=>{
            this.setState({
                isTaskLoaded: false,
                statusText: "saving tasks",
                newTaskIndex: -1,
                isSaveEnabled: false,
                currState: TaskAppState.TaskLoading
            }, this._getTasks())
        }).catch((error)=>{
            this.setState({
                isTaskLoaded: false,
                statusText: "saving failed",
                newTaskIndex: -1,
                isSaveEnabled: false,
                currState: TaskAppState.TaskError
            })
        })
    }

    render(){
        let view = null;
        switch(this.state.currState) {
            case TaskAppState.TaskError:
                view = this._renderTaskError();
                break;
            case TaskAppState.TaskLoading:
                view = this._renderTaskLoading();
                break;
            case TaskAppState.TaskLoaded:
                view = this._renderTaskLoaded();
                break;
        }
        return(
            <div>
                {view}
            </div>
        )
    }

    _renderTaskError() {
        return(
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: this.state.width,
                height: this.state.height}}>
                <p>{this.state.statusText}</p>
                <div style={{
                    width: 50,
                    height: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#00ff00',
                    borderRadius: 25,}}
                     onClick={() => this._getTasks()}>
                    <FaRefresh />
                </div>
            </div>
        )
    }

    _renderTaskLoading() {
        return(
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: this.state.width,
                height: this.state.height}}>
                <p>{this.state.statusText}</p>
            </div>
        )
    }

    _renderTaskLoaded() {
        const taskLists = this.state.tasks.length === 0 ?
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: this.state.width,
                height: this.state.height}}>
                <p>{'No task yet.'}</p>
            </div>
            :
            _.map(this.state.tasks, (task, taskId) => {
            return(
                <div style={{...nStyles}} key={taskId}>
                            <textarea
                                id={taskId}
                                style={taskStyle}
                                defaultValue={task}
                                onChange={this._onTaskChanged}
                                placeholder={_.isEmpty(task) ? "Add your new task" : ""}>
                            </textarea>
                    <FaTrashO
                        style={{...trashStyle, color: _.isEmpty(task) || this.state.newTaskIndex === taskId ? 'lightGrey' : 'grey' }}
                        onClick={() => _.isEmpty(task) ? null : this._onDeleteTask(taskId)}/>
                </div>
            );
        });

        const saveStyle = this.state.isSaveEnabled ?
            {
                backgroundColor: "#5cd65c",
                color: "white"
            } :
            {
                backgroundColor: "darkGrey",
                color: "lightGrey"
            };

        return(
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',
                    top: 60,
                    height: 50,
                    width: '100%'}}>
                    <div style={{display: 'flex', flexGrow: 5, alignItems: 'center', paddingLeft: 15 }}>
                        <h1 style={{ margin: 0 }}>Tasks</h1>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 100,
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <button style={add} onClick={this._onNewEmptyTask}>Add Task</button>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: 100,
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <button style={{ ...save, ...saveStyle}} onClick={this._onSaveTask}>Save</button>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', paddingTop: 50}}>
                    {taskLists}
                </div>
            </div>
        );
    }
}

export default Layout;
