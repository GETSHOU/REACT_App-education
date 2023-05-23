import './App.css';
import calculatorStyles from './Calculator.module.css';
import { useState } from 'react';

export const App = () => {
	const defaultButtonStyle = calculatorStyles.workspaceButton;
	const operatorButtonStyle = calculatorStyles.operator;
	const clearButtonDefaultStyle = calculatorStyles.clearDefault;
	const clearButtonActiveStyle = calculatorStyles.clearActive;
	const screenDefaultStyle = calculatorStyles.screen;
	const screenActiveStyle = calculatorStyles.screenActive;

	const btnValues = [7, 8, 9, 'c', 4, 5, 6, '+', 1, 2, 3, '-', 0, '='];

	const defaultDigit = 0;

	const [fieldValue, setFieldValue] = useState(defaultDigit);
	const [operation, setOperation] = useState('');
	const [operationState, setOperationState] = useState(true);

	const getStyleScreen = () => {
		if (operationState) {
			return `${screenDefaultStyle}`;
		}
		return `${screenDefaultStyle} ${screenActiveStyle}`;
	};

	const getStyleButtons = (value) => {
		const operatorButtons = ['+', '-', '='];
		const clearButton = 'c';

		if (operatorButtons.includes(value) && value !== clearButton) {
			return `${defaultButtonStyle} ${operatorButtonStyle}`;
		} else if (value === clearButton) {
			if (operationState) {
				return `${defaultButtonStyle} ${clearButtonDefaultStyle}`;
			} else {
				return `${defaultButtonStyle} ${clearButtonActiveStyle}`;
			}
		} else {
			return defaultButtonStyle;
		}
	};

	const isNumber = (value) => typeof value === 'number' && !isNaN(value);

	const clearButton = () => {
		setFieldValue(defaultDigit);
		setOperation('');
	};

	const getResultOperation = (str) => {
		if (str) {
			console.log('operation:', str);
			console.log(operationState);
			if (str.includes('+')) {
				const [op1, op2] = str.split('+');
				setFieldValue(Number(op1) + Number(op2));
			} else if (str.includes('-')) {
				const [op1, op2] = str.split('-');
				setFieldValue(Number(op1) - Number(op2));
			}
		} else {
			console.log('getResultOperation INNER FALSE');
			return;
		}
	};

	const handleButtonClick = (value) => {
		setOperation((prevValue) => {
			if (value !== '=' && value !== 'c') {
				return prevValue + value;
			}
		});
		if (Number.isInteger(value) || isNumber(value)) {
			value = value.toString();

			setFieldValue((prevValue) => {
				if (fieldValue === '+' || fieldValue === '-') {
					return value;
				}

				return prevValue + value;
			});

			if (fieldValue === defaultDigit) {
				setFieldValue(value);
			}
		} else if (value === 'c') {
			if (!operationState) {
				setOperationState(true);
			}
			clearButton();
		} else if (value === '+') {
			setFieldValue(value);
		} else if (value === '-') {
			setFieldValue(value);
		} else if (value === '=') {
			if (operationState) {
				getResultOperation(operation);
				setOperationState(false);
			} else {
				console.log(operationState);
				console.log('getResultOperation FALSE');
				return;
			}
		} else {
			console.log('ЧТО-ТО ПОШЛО НЕ ТАК!');
		}
	};

	return (
		<div className="App">
			<div className={calculatorStyles.calculator}>
				<div className={calculatorStyles.innerWrapper}>
					<div className={getStyleScreen()}>
						<div className={calculatorStyles.fieldValue}>{fieldValue}</div>
					</div>
					<div className={calculatorStyles.workspace}>
						{btnValues.map((value, i) => {
							return (
								<button
									key={i}
									onClick={() => handleButtonClick(value)}
									className={`${getStyleButtons(value)}`}
								>
									{value}
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
