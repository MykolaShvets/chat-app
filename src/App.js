import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import LoginPage from './pages/LoginPage/LoginPage';
import ChatPage from './pages/ChatPage/ChatPage';
import ActiveDialog from './components/ActiveDialog/ActiveDialog';
import { SetMessages, SetUser } from './store/slices/userSlice';

function App() {
    const { user } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            const data = localStorage.getItem('user');
            if (data) {
                dispatch(SetUser({ user: JSON.parse(data) }));
            }
        }
        if (user) {
            const savedMessages = localStorage.getItem(`${user.id}`);
            if (savedMessages) {

                dispatch(SetMessages({ messages: JSON.parse(savedMessages) }));
            }
        }
    }, [user])

    return (
        <Routes>
            {!user ? (
                <Route path='/' element={<LoginPage />} />
            ) : (
                <Route path='/' element={<ChatPage />}>
                    <Route path=':contactId' element={<ActiveDialog />} />
                </Route>
            )}
        </Routes>
    );
}

export default App;
