import {useState} from "react";

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert('Please enter a task')
            return
        }

        onAdd({
            text: text,
            day: day,
            reminder: reminder
        })

        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label htmlFor="task">Bup Task</label>
                <input
                    type="text"
                    id="task"
                    placeholder="Add Task"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label htmlFor="daytime">Day & Time</label>
                <input
                    type="text"
                    id="daytime"
                    placeholder="Add Day & Time"
                    value={day}
                    onChange={e => setDay(e.target.value)}
                />
            </div>
            <div className="form-control-check">
                <label htmlFor="reminder">Set Reminder</label>
                <input
                    type="checkbox"
                    id="reminder"
                    value={reminder}
                    checked={reminder}
                    onChange={e => setReminder(e.currentTarget.checked)}
                />
            </div>
            <input className="btn btn-block" type="submit" value="Save Task"/>
        </form>
    )
}

export default AddTask
