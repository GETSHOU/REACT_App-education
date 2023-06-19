import { useState } from 'react';
import { useValidation } from './useValidation';

export const useInput = (initialValue, validations) => {
	const [value, setValue] = useState(initialValue);
	const [focused, setFocus] = useState(false);
	const valid = useValidation(value, validations);

	const handleChange = ({target}) => {
		setValue(target.value);
	};

	const handleBlur = (e) => {
		setFocus(true);
	};

	return {
		value,
		handleChange,
		handleBlur,
		focused,
		...valid,
	}
};
