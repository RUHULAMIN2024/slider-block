import { primaryColor, secondaryColor } from '../../../../../bpl-tools/utils/data';
import { getBackgroundCSS, getBorderCSS, getColorsCSS, getSpaceCSS, getTypoCSS } from '../../../../../bpl-tools/utils/getCSS';

import { prefix } from '../../utils/data';

const defaultChildPositions = [
	{
		top: 36,
		right: 44.71,
		bottom: 44.5,
		left: 44.71
	},
	{
		top: 47.5,
		right: 34.67,
		bottom: 52.5,
		left: 34.67
	},
	{
		top: 55.5,
		right: 44.54,
		bottom: 67,
		left: 44.54
	}
];

const Style = ({ attributes, id }) => {
	const { slides = [], sliderWidth, sliderHeight, pageOnDevice = {}, prevNextOnDevice = {}, sliderBG = {}, sliderPadding = {}, pageColor, pageWidth, pageHeight, pageBorder, prevNextColor, sliderAlign, isTitle, titleTypo, isDesc, descTypo, isBtn, btnTypo, btnPadding, btnBorder } = attributes;

	const mainSl = `#${id}`;
	const sliderSl = `${mainSl} .${prefix}`;
	const gSlideSl = `${sliderSl} .swiper-slide`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS('', titleTypo)?.googleFontLink}
		${getTypoCSS('', descTypo)?.googleFontLink}
		${getTypoCSS('', btnTypo)?.googleFontLink}
		${getTypoCSS(`${gSlideSl} .slideTitle`, titleTypo)?.styles}
		${getTypoCSS(`${gSlideSl} .slideDesc`, descTypo)?.styles}
		${getTypoCSS(`${gSlideSl} .slideBtn`, btnTypo)?.styles}

		${mainSl}{
			text-align: ${sliderAlign};
			height: ${sliderHeight};
		}
		${sliderSl}{
			width: ${sliderWidth};
			height: ${sliderHeight};
			${getBackgroundCSS(sliderBG)};
			padding: ${getSpaceCSS(sliderPadding)};
		}

		${gSlideSl} .slideBtn{
			padding: ${getSpaceCSS(btnPadding)};
			${getBorderCSS(btnBorder)}
		}

		${sliderSl} .swiper-pagination .swiper-pagination-bullet{
			background: ${pageColor};
			width: ${pageWidth};
			height: ${pageHeight};
			${getBorderCSS(pageBorder)}
		}
		
		${sliderSl} .swiper-button-prev, ${sliderSl} .swiper-button-next{
			color: ${prevNextColor};
		}

		@media only screen and (max-width: 1024px) {
			${sliderSl} .swiper-pagination{
				display: ${!pageOnDevice?.tablet ? 'none' : 'block'};
			}
			${sliderSl} .swiper-button-prev, ${sliderSl} .swiper-button-next{
				display: ${!prevNextOnDevice?.tablet ? 'none' : 'flex'};
			}
		}
		@media only screen and (max-width: 640px) { 
			${sliderSl} .swiper-pagination{
				display: ${!pageOnDevice?.mobile ? 'none' : 'block'};
			}
			${sliderSl} .swiper-button-prev, ${sliderSl} .swiper-button-next{
				display: ${!prevNextOnDevice?.mobile ? 'none' : 'flex'};
			}
		}

		${slides.map((item, index) => {
			const { background, border = {}, childPositions = defaultChildPositions, title, titleColor, description, descColor, btnText, btnColors, btnHovColors } = item;

			const totalChild = (isTitle && title ? 1 : 0) + (isDesc && description ? 1 : 0) + (isBtn && btnText ? 1 : 0);

			const slideSl = `${mainSl} .swiper-wrapper .slide-${index}`;
			const contentSl = `${slideSl} .slideContent`;

			let childElPositionCSS = '';
			for (let i = 0; i < totalChild; i++) {
				const { top, right, bottom, left } = childPositions[i] || {};

				const posV = top > bottom ? `bottom: ${bottom}%;` : `top: ${top}%;`;
				const posH = left > right ? `right: ${right}%;` : `left: ${left}%;`;

				childElPositionCSS += `${contentSl} > *:nth-child(${i + 1}){${posV}${posH}}`;
			}

			return `
				${slideSl}{
					${getBackgroundCSS(background)}
					${getBorderCSS(border) || ''}
				}
				${slideSl} .slideTitle{
					color: ${titleColor || '#fff'};
				}
				${slideSl} .slideDesc{
					color: ${descColor || '#fff'};
				}
				${slideSl} .slideBtn{
					${getColorsCSS(btnColors) || `color: #fff; background: ${primaryColor};`}
				}
				${slideSl} .slideBtn:hover{
					${getColorsCSS(btnHovColors) || `color: #fff; background: ${secondaryColor};`}
				}
				${childElPositionCSS}
			`;
		}).join('')}
		`.replace(/\s+/g, ' ')
	}} />;
}
export default Style;
