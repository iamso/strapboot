export function leadingZero(number, length = 2) {
	return ('0'.repeat(2) + number).slice((length * -1));
}

export default leadingZero;
