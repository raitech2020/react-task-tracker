import {useEffect, useState} from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer";
import About from "./components/About";
import Home from "./components/Home";

const App = () => {
    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([
        // {
        //     id: 1,
        //     text: "Doctor's Appointment",
        //     day: "Feb 5, 2:30pm",
        //     reminder: true,
        // },
        // {
        //     id: 2,
        //     text: "Meeting at School",
        //     day: "Feb 6, 1:30pm",
        //     reminder: true,
        // },
        // {
        //     id: 3,
        //     text: "Food Shopping",
        //     day: "Feb 7, 12:30pm",
        //     reminder: false,
        // },
        // {
        //     id: 4,
        //     text: "Park Visit",
        //     day: "Nov 20, 5:30pm",
        //     reminder: false,
        // },
        // {
        //     id: 5,
        //     text: "گلاب جامن",
        //     day: "Never",
        //     reminder: true,
        // }
    ])

    useEffect(() => {
        // fn def
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        // fn call
        getTasks()
    }, [])

    // fetch tasks from server
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/tasks')
            const data = await response.json()
            return data
        } catch (error) {
            console.error("There has been a problem", error)
        }
    }

    // fetch a task from server
    const fetchTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${id}`)
            const data = await response.json()
            return data
        } catch (error) {
            console.error("There has been a problem", error)
        }
    }

    const addTask = async (task) => {
        // const id = Math.floor(Math.random() * 1000) + 1
        // const newTask = {
        //     id: id,
        //     ...task
        // }
        // setTasks([...tasks, newTask])

        const response = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        // data is the newly added task
        const data = await response.json()

        setTasks([...tasks, data])
    }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        })
        setTasks(tasks.filter(task => task.id !== id))
    }

    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updatedTask = {
            ...taskToToggle,
            reminder: !taskToToggle.reminder
        }

        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
        // data has the updated reminder
        const data = await response.json()

        setTasks(tasks.map(task =>
                task.id === id ? {...task, reminder: data.reminder}
                    : task
            )
        )
    }

    return (
        <BrowserRouter>
            <div className="container">
                <Header
                    title="RAI Task Tracker App"
                    onAdd={() => setShowAddTask(!showAddTask)}
                    showAdd={showAddTask}
                />
                <Routes>
                    <Route path="/" element={
                        <Home
                            showAddTask={showAddTask}
                            addTask={addTask}
                            tasks={tasks}
                            deleteTask={deleteTask}
                            toggleReminder={toggleReminder}
                        />
                    }/>
                    <Route path="/about" element={<About/>}/>
                </Routes>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}

export default App

// <Route path="/" render={props => (
//     <>
//         {showAddTask && <AddTask onAdd={addTask}/>}
//         {
//             tasks.length > 0 ? (
//                 <Tasks
//                     tasks={tasks}
//                     onDelete={deleteTask}
//                     onToggle={toggleReminder}
//                 />
//             ) : (
//                 'All tasks are removed'
//             )
//         }
//     </>
// )}/>
