const formatDateWithLetterMonth = (date) =>
	new Date(date).toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	})

const formatDateWithDateTime = (dateString) => {
	const date = new Date(dateString)

	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()

	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	const seconds = String(date.getSeconds()).padStart(2, '0')

	return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`
}

const formmatOverflowText = (line) => {
	return {
		display: '-webkit-box',
		WebkitBoxOrient: 'vertical',
		WebkitLineClamp: line,
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	}
}

const getFormattedDate = (offset) => {
	const date = new Date()
	date.setDate(date.getDate() + offset)
	return date.toISOString().split('T')[0]
}

export { formatDateWithLetterMonth, formmatOverflowText, getFormattedDate, formatDateWithDateTime }
