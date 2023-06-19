import { useState, useEffect } from 'react';

export const useValidation = (value, validations) => {
	const [error, setError] = useState(null);
	const [inputValid, setInputValid] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [repeatPasswordError, setRepeatPasswordError] = useState(false);

	useEffect(() => {
		for (const validation in validations) {

			switch (validation) {
				case 'isEmail':
					const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

					EMAIL_REGEXP.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true);
					setError('Некорректный Email!');
					break;
				case 'passwordLength':
					(value.length < validations[validation].minLength || value.length > validations[validation].maxLength) ? setPasswordError(true) : setPasswordError(false);
					setError(`В поле должно быть не менее ${validations[validation].minLength} и не более ${validations[validation].maxLength} символов!`);
					break;
				case 'isPassword':
					value !== validations.isPassword ? setRepeatPasswordError(true) : setRepeatPasswordError(false);
					setError('Оба введенных пароля должны быть идентичны!');
					break;
				default:
					break;
			}
		}
	}, [value, validations]);

	useEffect(() => {
		if (emailError || passwordError || repeatPasswordError) {
			setInputValid(false);
		} else {
			setInputValid(true);
		}
	}, [emailError, passwordError, repeatPasswordError]);

	return {
		error,
		inputValid,
		emailError,
		passwordError,
		repeatPasswordError
	};
};
