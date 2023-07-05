import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyC7XEiBiO6U3m7b0rv8Y2WiqBMzFq7fOlo',
	authDomain: 'todosproject-3b701.firebaseapp.com',
	projectId: 'todosproject-3b701',
	storageBucket: 'todosproject-3b701.appspot.com',
	messagingSenderId: '81897446991',
	appId: '1:81897446991:web:18e31c86b058b527b1543a',
	databaseURL:
		'https://todosproject-3b701-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
