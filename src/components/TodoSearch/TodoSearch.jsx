import { useTodos } from '../../hooks/useTodos';
import styles from './TodoSearch.module.css';

export const TodoSearch = () => {
	const { fieldValueSearchQuery, handleSearchQuery } = useTodos();

	return (
		<input
			type="text"
			className={`${styles.field} ${styles.fieldSearch}`}
			placeholder='Search...'
			value={fieldValueSearchQuery}
			onChange={handleSearchQuery}
		/>
	)
}
