import {useState, useEffect} from 'react';
import {getTasks, createTask, updateTask, deleteTask} from '../api/tasks';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
    const {user, logout} = useAuth();
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTasks = async() => {
            try {
                const {data} = await getTasks();
                setTasks(data);
            } catch(err) {
                setError('Failed to load tasks');
            }
        };
        fetchTasks();
    }, []);

    const handleCreate = async() => {
        if(!title.trim()) return;
        try {
            const {data} = await createTask({title});
            setTasks([...tasks, data]);
            setTitle('');
        } catch (err) {
             setError('Failed to create task');
        }
    };

    const handleToggle = async(task) => {
        try {
            const {data} = await updateTask(task._id, {
                completed: !task.completed
            });
            setTasks(tasks.map(t => t._id === data._id ? data : t));
        } catch(err) {
            setError('Failed to update task');
        }
    };

    const handleDelete = async(id) => {
        try {
            await handleDelete(id);
            setTasks(tasks.filter(t => t._id !== id));
        } catch(err) {
            setError('Failed to delete task');
        }
    };

    return (
        <div>
            <h2>Welcome, {user?.name}</h2>
            <button onClick={logout}>logout</button>
            {error && <p style={{color: 'red'}}>{error}</p>}

            <div>
                <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='New task...'
                />
                <button onClick={handleCreate}>Add Task</button>
            </div>

            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <input
                           type='checkbox'
                           checked={task.completed}
                           onChange={() => handleToggle(task)}
                        />
                        <span style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
                            {task.title}
                        </span>
                        <button onClick={() => handleDelete(task._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Tasks;