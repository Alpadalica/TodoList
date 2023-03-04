import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";


export type FilterValueType = 'all' | 'completed' | 'active'

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterValueType>('all')
    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }
    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }

    function changeFilter (value: FilterValueType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <TodoList
                title='What to learn?'
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
