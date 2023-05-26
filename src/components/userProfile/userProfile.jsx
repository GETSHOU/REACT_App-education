import React from 'react';
import styles from './userProfile.module.css';

export const UserProfile = (props) => {
	return (
		<div className={styles.profile}>
			<h2 className={styles.title}>Профиль</h2>
				<div className={styles.info}>
					<div className={styles.avatar}>
						<img src={props.avatar} alt="avatar" />
					</div>
					<div className={styles.infoList}>
						<ul className={styles.infoListTitles}>
							<li>Никнейм:</li>
							<li>Имя:</li>
							<li>Фамилия:</li>
							<li>Возраст:</li>
							<li>Почта:</li>
							<li>Страна:</li>
							<li>Город:</li>
						</ul>
						<ul className={styles.infoListData}>
							<li>{props.nickName}</li>
							<li>{props.name}</li>
							<li>{props.lastname}</li>
							<li>{props.age}</li>
							<li>{props.email}</li>
							<li>{props.address.country}</li>
							<li>{props.address.city}</li>
						</ul>
					</div>
				</div>

		</div>
	)
}
