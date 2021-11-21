import AddTask from "./AddTask";
import Tasks from "./Tasks";

const Home = ({showAddTask, addTask, tasks, deleteTask, toggleReminder}) => {
    return (
        <>
            {showAddTask && <AddTask onAdd={addTask}/>}
            {
                tasks.length > 0 ? (
                    <Tasks
                        tasks={tasks}
                        onDelete={deleteTask}
                        onToggle={toggleReminder}
                    />
                ) : (
                    'All tasks are removed'
                )
            }
        </>
    )
}

export default Home
