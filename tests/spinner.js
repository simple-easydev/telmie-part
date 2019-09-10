import Spinner from '../src/components/global/spinner';
// See: https://github.com/mzgoddard/preact-render-spy
import { shallow } from 'preact-render-spy';

describe('Initial Test of the Spinner', () => {
	test('rendering without crashing', () => {
		const header = shallow(<Spinner />);
		expect(header.exists()).toBe(true);
	});
});
