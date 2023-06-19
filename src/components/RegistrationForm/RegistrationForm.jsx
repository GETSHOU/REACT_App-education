import styles from './RegistrationForm.module.css'
import { useRef, useEffect } from 'react';
import { useInput } from '../../hooks/useInput';
import { RegistrationField } from '../RegistrationField/RegistrationField';
import { sendRegistrationRequest } from '../../js/requests/sendRegistrationRequest';

export const RegistrationForm = () => {
	const email = useInput('', {isEmail: true});
	const password = useInput('', {passwordLength: {minLength: 5, maxLength: 15}});
	const repeatPassword = useInput('', {isPassword: password.value});

	const buttonRef = useRef();

	useEffect(() => {
		if (email.inputValid || password.inputValid || repeatPassword.inputValid) {
			buttonRef.current.focus();
		}
	}, [email, password, repeatPassword]);

	const sendDataRegistration = (e) => {
		e.preventDefault();
		sendRegistrationRequest({
			email: email.value,
			password: password.value,
			repeatPassword: repeatPassword.value,
		});
	};

	return (
		<div className={styles.block}>
			<div className={styles.titleBlock}>
				<h1 className={styles.title}>Регистрация</h1>
			</div>
			<form className={styles.form} onSubmit={sendDataRegistration}>
				<div className={styles.row}>
					<RegistrationField
						name='email'
						type='text'
						labelName='Почта'
						placeholder='почта'
						value={email.value}
						onChange={(e) => email.handleChange(e)}
						onBlur={(e) => email.handleBlur(e)}
					/>
					{(email.focused && email.emailError) && <div style={{color: 'red'}}>{email.error}</div>}
				</div>
				<div className={styles.row}>
					<RegistrationField
						name='password'
						type='password'
						labelName='Пароль'
						placeholder='пароль'
						value={password.value}
						onChange={(e) => password.handleChange(e)}
						onBlur={(e) => password.handleBlur(e)}
					/>
					{(password.focused && password.passwordError) && <div style={{color: 'red'}}>{password.error}</div>}
				</div>
				<div className={styles.row}>
					<RegistrationField
						name='repeatPassword'
						type='password'
						labelName='Повторить пароль'
						placeholder='повторить пароль'
						value={repeatPassword.value}
						onChange={(e) => repeatPassword.handleChange(e)}
						onBlur={(e) => repeatPassword.handleBlur(e)}
					/>
					{(repeatPassword.focused && repeatPassword.repeatPasswordError) && <div style={{color: 'red'}}>{repeatPassword.error}</div>}
				</div>
				<button
					type="submit" className={styles.button} ref={buttonRef} disabled={!email.inputValid || !password.inputValid || !repeatPassword.inputValid}>Submit</button>
			</form>
		</div>
	)
}
