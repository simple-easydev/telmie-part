import LogInForm from '../src/components/log-in/login-in-form';
// See: https://github.com/mzgoddard/preact-render-spy
import { shallow } from 'preact-render-spy';

describe('Initial Test of the LoginForm', () => {
	test('rendering without crashing', () => {
		const header = shallow(<LogInForm />);
		expect(header.exists()).toBe(true);
	});
});
