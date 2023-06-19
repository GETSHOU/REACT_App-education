import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useEffect } from 'react';

import styles from './RegistrationForm.module.css';
import { RegistrationField } from '../RegistrationField/RegistrationField'

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const fieldsScheme = yup
	.object({
		email: yup.string()
							.required('Поле не должно быть пустым!')
							.matches(
								EMAIL_REGEXP,
								'Название почты введено некорректно!'
							),
		password: yup.string()
								.required('Поле не должно быть пустым!')
								.min(5, 'Длина пароля должна быть не менее 5 символов!')
								.max(15, 'Длина пароля должна быть не более 15 символов!')
								.matches(/[0-9]+/, 'В пароле должна быть минимум 1 цифра!')
								.matches(/[a-zA-z]+/, 'В пароле должна быть минимум 1 буква!')
								.matches(/\W+/, 'В пароле должнен быть минимум 1 спецсимвол!'),
		repeatPassword: yup.string()
											 .required('Поле не должно быть пустым!')
											 .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
	})
	.required();

export const RegistrationForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: ''
		},
		resolver: yupResolver(fieldsScheme),
		mode: 'all',
	});

	const onSubmit = (formData) => {
		console.log(formData);
	};

	const buttonRef = useRef();

	useEffect(() => { if (isValid) buttonRef.current.focus(); }, [isValid]);

	return (
		<div className={styles.block}>
			<div className={styles.titleBlock}>
				<h1 className={styles.title}>Регистрация</h1>
			</div>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.row}>
					<RegistrationField
						name='email'
						type='text'
						placeholder='почта'
						label='Почта'
						{...register('email')}
						error={errors.email?.message}
					/>
				</div>
				<div className={styles.row}>
					<RegistrationField
						name='password'
						type='text'
						placeholder='пароль'
						label='Пaроль'
						{...register('password')}
						error={errors.password?.message}
					/>
				</div>
				<div className={styles.row}>
					<RegistrationField
						name='repeatPassword'
						type='text'
						placeholder='Повторите пароль'
						label='Повторите пароль'
						{...register('repeatPassword')}
						error={errors.repeatPassword?.message}
					/>
				</div>
				<button type="submit" className={styles.button} disabled={!isValid} ref={buttonRef}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	)
}
