import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade, EffectCube, EffectCreative, EffectCoverflow, EffectFlip, EffectCards } from 'swiper/modules';

import { prefix } from '../../utils/data';

import 'swiper/css/bundle';

const sanitizeHTML = html => {
	const div = document.createElement('div');
	div.innerHTML = html;
	return div.innerHTML;
};

const sanitizeURL = url => {
	if (!url) return '#';
	try {
		const parsed = new URL(url, window.location.href);
		if (['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol)) {
			return url;
		}
	} catch (e) {
		// fallthrough
	}
	return '#';
};

const Slider = ({ attributes, initialSlide = 0, isBackend = false }) => {
	const { slides = [], columns, columnGap, isLoop, isTouchMove, speed, isAutoplay, autoplayOptions, freeModeOptions = {}, effect, keyboardOptions = {}, isMousewheel = false, isPage, isPageClickable, isPageDynamic, isPrevNext, isTitle, isDesc, isBtn } = attributes;

	return <Swiper
		className={prefix}
		direction='horizontal'
		initialSlide={initialSlide}
		slidesPerView={columns.mobile}
		breakpoints={{ 576: { slidesPerView: columns.tablet }, 768: { slidesPerView: columns.desktop } }}
		spaceBetween={columnGap}
		modules={[Autoplay, Navigation, Pagination, EffectFade, EffectCube, EffectCreative, EffectCoverflow, EffectFlip, EffectCards]}
		loop={isLoop}
		allowTouchMove={isTouchMove}
		grabCursor={isTouchMove}
		speed={speed * 1000}
		autoplay={isAutoplay ? { ...autoplayOptions, delay: autoplayOptions.delay * 1000 } : false}
		freeMode={freeModeOptions}
		effect={effect}
		fadeEffect={{ crossFade: false }}
		cubeEffect={{ shadow: false }}
		creativeEffect={{
			prev: {
				shadow: true,
				translate: ['-120%', 0, -500],
			},
			next: {
				shadow: true,
				translate: ['120%', 0, -500],
			}
		}}
		keyboard={keyboardOptions}
		mousewheel={isMousewheel}
		pagination={isPage ? {
			clickable: isPageClickable,
			dynamicBullets: isPageDynamic,
			forceClass: true
		} : false}
		navigation={isPrevNext}
		allowSlidePrev={true}
		allowSlideNext={true}
		autoHeight={false}
	>
		{slides?.map((slide, index) => {
			const { position, title, description, btnText, btnLink } = slide;

			return <SwiperSlide key={index} className={`slide-${index}`}>
				<div className={`slideContent ${position?.split(' ')?.join('-') || 'center-center'}`}>
					{isTitle && title && <h2 className='slideTitle' dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }} />}

					{isDesc && description && <p className='slideDesc' dangerouslySetInnerHTML={{ __html: sanitizeHTML(description) }} />}

					{isBtn && btnText && <a href={isBackend ? '#' : sanitizeURL(btnLink)} className='slideBtn' dangerouslySetInnerHTML={{ __html: sanitizeHTML(btnText) }} />}
				</div>
			</SwiperSlide>
		})}
	</Swiper>
}
export default Slider;
