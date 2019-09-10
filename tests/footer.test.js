import Footer from '../src/components/global/footer';
// See: https://github.com/mzgoddard/preact-render-spy
import { shallow } from 'preact-render-spy';

describe('Initial Test of the FOOTER', () => {
	test('rendering without crashing', () => {
		const footer = shallow(<Footer locale={'en-us'} currentUrl={'/'} />);
		expect(footer.exists()).toBe(true);
	});
});
