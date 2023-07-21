import styles from './TodoSearch.module.css';

export const TodoSearch = ({searchQuery, handleSearchQuery}) => {
	return (
		<input
			type="text"
			className={`${styles.field} ${styles.fieldSearch}`}
			placeholder='Search...'
			value={searchQuery}
			onChange={handleSearchQuery}
		/>
	)
}
