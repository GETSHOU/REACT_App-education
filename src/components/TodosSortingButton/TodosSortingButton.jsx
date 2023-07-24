import { useTodos } from '../../hooks/useTodos';
import styles from './TodosSortingButton.module.css';

export const TodosSortingButton = () => {
	const { handleSortTodos } = useTodos();

	return (
		<button className={styles.sortButton} onClick={() => handleSortTodos('text')}>Sort by a-z</button>
	)
}
