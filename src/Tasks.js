import { useState } from "react"

const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctor's Appointment",
      day: "Feb 5, 2:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Meeting at School",
      day: "Feb 6, 1:30pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Food Shopping",
      day: "Feb 7, 12:30pm",
      reminder: true,
    },
    {
      id: 4,
      text: "Vaccination",
      day: "Feb 8, 11:30am",
      reminder: true,
    },
  ])

  return tasks.map((task) => <h3 key={task.id}>{task.text}</h3>)
}

export default Tasks
