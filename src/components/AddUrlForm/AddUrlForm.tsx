import { useState } from 'react';
import Input from '../Input';

import './AddUrlForm.scss';
import type * as React from 'react';
import Select from '../Select';

type AddUrlFormProps = {
	onSubmit: (url: string) => void;
};

const AddUrlForm = (props: AddUrlFormProps) => {
	const { onSubmit } = props;

	const [value, setValue] = useState('');
	const [category, setCategory] = useState('Personal');

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (URL.canParse(value)) {
			onSubmit(value.trim());
			setValue('');
		} else {
			// App level error with UI later
			alert('Please enter a valid URL.');
		}
	}

	return (
		<form
			className="add-url-form"
			onSubmit={handleSubmit}
		>
			<Input
				className="add-url-form__input"
				type="url"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="For example, https://doodles.google/"
			/>
			<Select
				options={[{ value: 'Uncategorized', isSelected: true }, { value: 'Work' }, { value: 'Shopping' }]}
				onSelect={(option) => setCategory(option)}
			/>
		</form>
	);
};

export default AddUrlForm;
