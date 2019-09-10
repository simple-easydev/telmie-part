import { Provider } from 'preact-redux';
import { h } from 'preact';
import configureStore from './store/configure-store';

import './style/index.scss';

import App from './components/app';

const Index = () => (
	<Provider store={configureStore({})}>
		<App />
	</Provider>
);

export default Index;