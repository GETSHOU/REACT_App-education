import styles from './Field.module.css';

export const FieldLayout = (props) => {
	const { field, handlerMove } = props;

	return (
		<div className={styles.fieldWrapper}>
			<div className={styles.field}>
				{field.map((cellValue, i) => {
					return (
						<button
							key={i}
							className={styles.cell}
							onClick={() => handlerMove(i, cellValue)}
						>
							{cellValue}
						</button>
							);
				})}
			</div>
		</div>
	)
};
