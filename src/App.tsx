import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {AddItemForm} from "./AddItemForm";


export type FilterValueType = 'all' | 'completed' | 'active'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj})
        }
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: 'What to learn?', filter: 'active'},
        {id: todolistId2, title: 'What to buy?', filter: 'completed'}
    ])

    let removeTodoList = (todolistId: string) => {
        let filtredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filtredTodolist)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    let changeTodoListTitle = (id: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === id);
        if(todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    let [tasksObj, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Brain', isDone: false},
        ]
    })
    const addTodolist = (title: string) => {
        const todolist: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((tl) => {
                let tasksForTodoList = tasksObj[tl.id]

                if (tl.filter === 'completed') {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                }
                if (tl.filter === 'active') {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                }
                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
                    />)
            })}
        </div>
    );
}

export default App;
