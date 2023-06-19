import { forwardRef } from 'react';
import styles from './RegistrationField.module.css';

export const RegistrationField = forwardRef(({error, ...rest}, ref) => {
	return (
		<>
			<label htmlFor={rest.name} className={styles.label}>{rest.label}</label>
			<input
				{...rest}
				ref={ref}
				id={rest.name}
				className={error ? styles.inputError : styles.input}
			/>
			{error && <div className={styles.errorMessage}>{error}</div>}
		</>
	)
});

