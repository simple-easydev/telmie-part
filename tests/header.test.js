import Header from '../src/components/global/header';
// See: https://github.com/mzgoddard/preact-render-spy
import { shallow } from 'preact-render-spy';

describe('Initial Test of the Header', () => {
	test('rendering without crashing', () => {
		const header = shallow(<Header />);
		expect(header.exists()).toBe(true);
	});
});
