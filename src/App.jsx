import styles from './App.module.css';
import { Todos } from './components/Todos/Todos';

export const App = () => {
	return (
		<div className={styles.app}>
			<Todos />
		</div>
	);
};
