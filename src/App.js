import Header from "./components/Header"
import Tasks from "./Tasks"

function App() {
  return (
    <div className="container">
      <Header title="Task Tracker" />
      <Tasks />
    </div>
  )
}

export default App
