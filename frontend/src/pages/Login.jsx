import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(form.email, form.password);
            navigate('/tasks');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <input
               type="email"
               placeholder="Email"
               value={form.email}
               onChange={(e) => setForm({...form, email: e.target.value})}
            />
            <input
               type="password"
               placeholder="Password"
               value={form.password}
               onChange={(e) => setForm({...form, password: e.target.value})}
            />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </div>
    )
} 
export default Login;