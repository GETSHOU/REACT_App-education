import styles from './RegistrationField.module.css';
import PropTypes from 'prop-types';

export const RegistrationField = (props) => {
	const {
		name,
		type,
		value,
		onBlur,
		onChange,
		labelName,
		placeholder,
	} = props;

	return (
		<>
			<label htmlFor={name} className={styles.label}>{labelName}</label>
			<input
				id={name}
				name={name}
				type={type}
				value={value}
				onBlur={onBlur}
				onChange={onChange}
				className={styles.input}
				placeholder={placeholder}
			/>
		</>
	)
}

RegistrationField.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onBlur: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	labelName: PropTypes.string,
	placeholder: PropTypes.string,
};
