const formatDateWithLetterMonth = (date) =>
	new Date(date).toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	})

const formmatOverflowText = (line) => {
	return {
		display: '-webkit-box',
		WebkitBoxOrient: 'vertical',
		WebkitLineClamp: line,
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	}
}

export { formatDateWithLetterMonth, formmatOverflowText }
