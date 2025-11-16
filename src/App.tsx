import { useState } from 'react';
import AddUrlForm from './components/AddUrlForm';

const App = () => {
	const [urlCollection, setUrlCollection] = useState<string[]>([]);

	return (
		<div className="container">
			<AddUrlForm onSubmit={(url) => setUrlCollection([...urlCollection, url])} />
		</div>
	);
};

export default App;
