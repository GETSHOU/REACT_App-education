import { Todos } from './components/Todos/Todos';
import styles from './App.module.css';

export const App = () => {
	return (
		<div className={styles.app}>
			<Todos />
		</div>
	);
};
