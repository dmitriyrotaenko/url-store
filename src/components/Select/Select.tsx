import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import MatchMedia from '../../constants/MatchMedia.ts';
import Input from '../Input';

import './Select.scss';

type SelectProps = {
	className?: string;
	options: Option[];
	onSelect: (option: string) => void;
};

type Option = {
	value: string;
	isSelected?: boolean;
};

const Select = (props: SelectProps) => {
	const { options, onSelect, className } = props;

	const [selectedOption, setSelectedOption] = useState(options[0]);
	const [currentOptionIndex, setCurrentOptionIndex] = useState<number | null>(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const [query, setQuery] = useState('');
	const [isMobile, setIsMobile] = useState(MatchMedia.mobile.matches);

	const selectWrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMediaChange = (event: MediaQueryListEvent) => {
			setIsMobile(event.matches);
		};

		const handleClickOutside = (event: MouseEvent) => {
			const { target } = event;
			if (selectWrapperRef.current && !selectWrapperRef.current.contains(target as Node)) {
				setIsExpanded(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		MatchMedia.mobile.addEventListener('change', handleMediaChange);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			MatchMedia.mobile.removeEventListener('change', handleMediaChange);
		};
	}, []);

	useEffect(() => {
		onSelect(selectedOption.value);
	}, [selectedOption, onSelect]);

	/*
	 * TODO
	 *  - Add keyboard navigation
	 *  - Toggle tabIndex on mobile/desktop
	 *  - understand what to do with positioning
	 *  - useEffect for onSelect?
	 * */

	return (
		<div
			ref={selectWrapperRef}
			className={cn('select', className)}
		>
			{/* On touch devices native select is preferable*/}
			<select
				className="select__original-control"
				tabIndex={isMobile ? 0 : -1}
				value={selectedOption.value}
				// call onSelect
				onChange={(e) => setSelectedOption(options[e.target.selectedIndex])}
			>
				{options.map(({ value }, index) => (
					<option
						key={index}
						value={value}
					>
						{value}
					</option>
				))}
			</select>
			<div className="select__body">
				{/** biome-ignore lint/a11y/useKeyWithClickEvents: <TODO> */}
				<div
					onClick={() => setIsExpanded(!isExpanded)}
					className={cn('select__button', {
						'is-expanded': isExpanded,
					})}
					tabIndex={isMobile ? -1 : 0}
					role="combobox"
					aria-expanded={isExpanded}
					aria-controls="select__listbox"
					aria-autocomplete="list"
					aria-activedescendant={currentOptionIndex !== null ? `category-option-${currentOptionIndex}` : undefined}
				>
					{selectedOption?.value}
				</div>
				<div
					id="select__dropdown"
					className={cn('select__dropdown', { 'is-expanded': isExpanded })}
				>
					<Input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<div
						className="select__list"
						id="select__listbox"
						role="listbox"
					>
						{options
							.filter(({ value }) => value.toLowerCase().startsWith(query.toLowerCase()))
							.map((option, index) => {
								const { value, isSelected = false } = option;

								return (
									// biome-ignore lint/a11y/useKeyWithClickEvents: <TODO>
									<div
										key={index}
										id={`category-option-${index}`}
										className={cn('select__option', { 'select__option--selected': selectedOption.value === value })}
										role="option"
										aria-selected={isSelected}
										tabIndex={0}
										onClick={() => {
											//Object with single key? What about isSelected?
											setSelectedOption({ value });
										}}
									>
										{value}
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Select;
