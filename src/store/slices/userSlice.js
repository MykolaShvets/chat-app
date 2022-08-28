import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

import { auth } from '../../config/firebaseConfig';
import { mockMessages, mockUsers } from '../../data/data';

export const signInWithGoogle = createAsyncThunk(
    'userSlice/signInWithGoogle',
    async (_, { dispatch }) => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);

            const data = {
                id: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                accessToken: user.accessToken,
            };
            localStorage.setItem('user', JSON.stringify(data));
            dispatch(SetUser({ user: data }));
        } catch (e) {
            console.log(e);
        }
    }
);

export const signOutFromGoogle = createAsyncThunk('userSlice/logout', async (_, { dispatch }) => {
    try {
        await signOut(auth);
        dispatch(SetUser({ user: null }));
    } catch (e) {
        console.log(e);
    }
});

const initialState = {
    user: null,
    contacts: mockUsers,
    messages: mockMessages,
    searchResult: null,
    test: null,
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        SetUser: (state, action) => {
            state.user = action.payload.user;
            if (action.payload.user === null) {
                localStorage.removeItem('user');
            }
        },
        SendMessage: (state, action) => {
            state.messages.push(action.payload.message);
            if (state.user.id) {
                localStorage.setItem(`${state.user.id}`, JSON.stringify(state.messages));
            }
        },
        SendAnswer: (state, action) => {
            state.messages.push(action.payload.message);
        },
        SetMessages: (state, action) => {
            state.messages = action.payload.messages;
        },
        SearchContact: (state, action) => {
            state.searchResult = action.payload.result;
        },
        SetMessageStatus: (state, action) => {
            state.messages.filter(msg => msg.fromUser === action.payload.contactId && msg.status === 'new').forEach(msg => msg.status = 'read')
        }
    },
});

export const userReducer = userSlice.reducer;

export const { SetUser, SendMessage, SearchContact, SetMessages, SendAnswer, SetMessageStatus } = userSlice.actions;
