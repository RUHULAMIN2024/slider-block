import { createRoot } from 'react-dom/client';

import './style.scss';
import Slider from './Components/Common/Slider';
import Style from './Components/Common/Style';

document.addEventListener('DOMContentLoaded', () => {
	const sliderEls = document.querySelectorAll('.wp-block-raslb-slider');
	sliderEls.forEach(sliderEl => {
		const attributes = JSON.parse(sliderEl.dataset.attributes);

		createRoot(sliderEl).render(<>
			<Style attributes={attributes} id={sliderEl.id} />
			<Slider attributes={attributes} />
		</>);

		sliderEl?.removeAttribute('data-attributes');
	});
});
