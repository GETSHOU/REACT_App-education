import { useEffect, useState } from 'react';
import styles from './UserList.module.css';
import { Loader } from '../Loader/Loader';
import { UserInfo } from '../UserInfo/UserInfo';

const API_USERS_INFO_LIST = 'http://localhost:3004/userList';
// run server: json-server --watch ./src/data/userList.json --delay 2000 --port 3004

export const UserList = () => {
	const [userList, setUserList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [userListRefreshStatus, setUserListRefreshStatus] = useState(false);

	const refreshUserList = () => setUserListRefreshStatus(!userListRefreshStatus);

	useEffect(() => {
		setIsLoading(true);

		fetch(API_USERS_INFO_LIST)
			.then((response) => response.json())
			.then((loadedUsersListInfo) => {
				setUserList(loadedUsersListInfo);
			})
			.finally(() => setIsLoading(false));
	}, [userListRefreshStatus]);

	const addUser = () => {
		setIsCreating(true);

		fetch(API_USERS_INFO_LIST, {
			method: 'POST',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify({
				"nickName": "Vivien",
				"name": "Виолетта",
				"lastname": "Виолеттова",
				"age": 15,
				"email": "Vivien.mailbox@gmail.com",
				"address": {
					"country": "РФ",
					"city": "Москва"
				},
				"avatar": ""
			})
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Пользователь добавлен!', response);
				refreshUserList();
			})
			.finally(() => setIsCreating(false));
	};

	return (
		<div className={styles.users}>
			<h2 className={styles.title}>Пользователи</h2>
				<ul className={styles.userList}>
					{isLoading
						? <Loader />
						: userList.map(({id, name, lastname, avatar}) => (
							<UserInfo
								key={id}
								name={name}
								lastname={lastname}
								avatar={avatar}
							/>
						))}
				</ul>
				<button
					type='submit'
					className={styles.buttonAddUser}
					onClick={addUser}
					disabled={isCreating}>
						Добавить пользователя
				</button>
		</div>
	)
}
