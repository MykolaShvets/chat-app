import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyAOCgvvsdO0tg7XghDPfPliFqbVppqmkcI',
    authDomain: 'chat-app-a1682.firebaseapp.com',
    projectId: 'chat-app-a1682',
    storageBucket: 'chat-app-a1682.appspot.com',
    messagingSenderId: '985447666616',
    appId: '1:985447666616:web:e083cdf6c95605b898754d',
};



export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);