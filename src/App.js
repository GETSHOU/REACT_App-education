import './App.css';
import { UserProfile } from './components/userProfile/userProfile.jsx';

const userInfo = {
	nickName: 'Getshou',
	name: 'Сергей',
	lastname: 'Борисов',
	age: '31',
	email: 'BorisovSF.mailbox@gmail.com',
	address: {
		country: 'РФ',
		city: 'Москва',
	},
	avatar: '',
};

export const App = () => {
	return (
		<div className="App">
			<UserProfile {...userInfo} />
		</div>
	);
};
