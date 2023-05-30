import styles from './Field.module.css';

const FieldLayout = (props) => {
	return (
		<div className={styles.fieldWrapper}>
			<div className={styles.field}>
				{props.fieldValues.map((value, i) => {
					return (
						<div
							key={i}
							className={styles.cell}
						>
							{value}
						</div>
							);
				})}
			</div>
		</div>
	)
};

export const Field = (props) => {
	return (
		<FieldLayout fieldValues={props.fieldValues}/>
	);
}
