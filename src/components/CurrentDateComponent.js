import React from 'react';
import { CurrentDate } from '../modules/currentDate';

const date = new CurrentDate();

export const CurrentDateComponent = () => {
	return <div>{date.getCurrentYear()}</div>;
};
