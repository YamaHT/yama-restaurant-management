import classNames from 'classnames/bind'
import styles from './SearchBar.module.scss'
import SearchItem from '@/components/SearchItem'
import { useEffect, useState } from 'react'
import HeadlessTippy from '@tippyjs/react/headless'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'

const cx = classNames.bind(styles)

function SearchBarComponent({ to, children, rounded = false, icon, className, ...passProps }) {
	const [searchValue, setSearchValue] = useState('')
	const [searchResult, setSearchResult] = useState([])
	const [showResult, setShowResult] = useState(true)

	const handleHideResult = () => {
		setShowResult(false)
	}

	const handleSearchButton = () => {
		setShowResult(false)
	}

	useEffect(() => {
		setTimeout(() => {
			setSearchResult([])
		}, 0)
	}, [searchResult])

	const props = {
		...passProps,
	}

	const classes = cx('wrapper', {
		[className]: className,
		rounded,
	})

	return (
		<HeadlessTippy
			interactive={true}
			placement='bottom'
			visible={showResult && searchResult.length > 0}
			render={(attrs) => (
				<div className={cx('search-result')} tabIndex={'-1'} {...attrs}>
					<div className={cx('result')}>
						<SearchItem />
						<SearchItem />
						<SearchItem />
						<SearchItem />
						<SearchItem />
						<SearchItem />
						<SearchItem />
						<SearchItem />
					</div>
				</div>
			)}
			onClickOutside={handleHideResult}
		>
			<div className={classes}>
				{icon && <span className={cx('icon')}>{icon}</span>}
				<input
					{...props}
					value={searchValue}
					onFocus={() => {
						setShowResult(true)
					}}
					onChange={(e) => {
						setSearchValue(e.target.value)
					}}
				/>
				<Tippy content={children} animation='scale'>
					<button onClick={handleSearchButton}>{children}</button>
				</Tippy>
			</div>
		</HeadlessTippy>
	)
}

export default SearchBarComponent
