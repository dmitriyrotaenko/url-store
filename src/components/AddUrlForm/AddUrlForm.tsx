import { useState } from 'react';
import Input from '../Input';

import './AddUrlForm.scss';

type AddUrlFormProps = {
	onSubmit: (url: string) => void;
};

const AddUrlForm = (props: AddUrlFormProps) => {
	const { onSubmit } = props;

	const [value, setValue] = useState('');

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
		</form>
	);
};

export default AddUrlForm;
