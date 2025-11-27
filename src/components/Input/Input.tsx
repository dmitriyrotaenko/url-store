import './Input.scss';

type InputProps = {
	className?: string;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
};

const Input = (props: InputProps) => {
	const { type, value, onChange, placeholder, className } = props;

	return (
		<input
			className={`input ${className ?? ''}`}
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
};

export default Input;
