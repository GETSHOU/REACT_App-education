import { useEffect, useState } from 'react';
import styles from './UserInfo.module.css';

export const UserInfo = ({name, lastname, avatar}) => {
	const [avatarState, setAvatarState] = useState(false);

	useEffect(() => {
		return avatar ? setAvatarState(true) : setAvatarState(false);
	}, [avatar]);

	return (
		<li className={styles.userItem}>
			<div className={styles.userAvatar}>
					{!avatarState
						? <div className={styles.userAvatarCover}></div>
						: <img src={avatar} alt="avatar" />
					}
				</div>
				<div className={styles.userName}>
					<span>{name} {lastname}</span>
				</div>
		</li>
	)
}
