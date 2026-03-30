import { __ } from '@wordpress/i18n';
import { PanelRow, TextControl, TextareaControl, __experimentalAlignmentMatrixControl as AlignmentMatrixControl } from '@wordpress/components';
import { produce } from 'immer';

import { Label, Background, ColorControl, ColorsControl } from '../../../../../../bpl-tools/Components';
import { BorderControl } from '../../../../../../bpl-tools/Components/Deprecated';
import { primaryColor, secondaryColor } from '../../../../../../bpl-tools/utils/data';

import { getPosByPos } from '../../../utils/functions';

const ItemSettings = ({ attributes, setAttributes, clientId, arrKey, index, setActiveIndex = false }) => {
	const items = attributes[arrKey];
	const { background, border = {}, title, titleColor, description, descColor, btnText, btnLink, btnColors, btnHovColors } = items[index];

	const updateSlide = (index, property, val) => {
		const newSlides = produce(attributes[arrKey], draft => {
			draft[index][property] = val;
		});

		setAttributes({ [arrKey]: newSlides });
		setActiveIndex && setActiveIndex(index);
	}

	return <>
		<Background label={__('Background', 'ruhulamin-slider-block')} value={background} onChange={val => updateSlide(index, 'background', val)} defaults={{ color: '#00000080' }} />

		<BorderControl label={__('Border:', 'ruhulamin-slider-block')} value={border} onChange={val => updateSlide(index, 'border', val)} />

		<PanelRow>
			<Label className=''>{__('Content Position', 'ruhulamin-slider-block')}</Label>
			<AlignmentMatrixControl value={items[index]?.position} onChange={val => {
				setAttributes({
					slides: produce(items, draft => {
						draft[index]['position'] = val;
						draft[index]['childPositions'] = getPosByPos(`block-${clientId}`, index, val);
					})
				})
			}} />
		</PanelRow>
		<small>{__('You can also change the content position by dragging element (Pro).', 'ruhulamin-slider-block')}</small>

		<PanelRow className='mt20'>
			<Label className=''>{__('Title:', 'ruhulamin-slider-block')}</Label>
			<TextControl value={title} onChange={val => updateSlide(index, 'title', val)} placeholder={__('Slide title', 'ruhulamin-slider-block')} />
		</PanelRow>

		<ColorControl label={__('Title Color:', 'ruhulamin-slider-block')} value={titleColor} onChange={val => updateSlide(index, 'titleColor', val)} defaultColor='#fff' />

		<Label>{__('Description:', 'ruhulamin-slider-block')}</Label>
		<TextareaControl value={description} onChange={val => updateSlide(index, 'description', val)} placeholder={__('Description of the slider', 'ruhulamin-slider-block')} />

		<ColorControl label={__('Description Color:', 'ruhulamin-slider-block')} value={descColor} onChange={val => updateSlide(index, 'descColor', val)} defaultColor='#fff' />

		<PanelRow className='mt20'>
			<Label className=''>{__('Button Text:', 'ruhulamin-slider-block')}</Label>
			<TextControl value={btnText} onChange={val => updateSlide(index, 'btnText', val)} placeholder={__('Button label', 'ruhulamin-slider-block')} />
		</PanelRow>

		<PanelRow>
			<Label className=''>{__('Button Link:', 'ruhulamin-slider-block')}</Label>
			<TextControl value={btnLink} onChange={val => updateSlide(index, 'btnLink', val)} placeholder={__('Button link', 'ruhulamin-slider-block')} />
		</PanelRow>

		<ColorsControl label={__('Button Colors:', 'ruhulamin-slider-block')} value={btnColors} onChange={val => updateSlide(index, 'btnColors', val)} defaults={{ color: '#fff', bg: primaryColor }} />

		<ColorsControl label={__('Button Hover Colors:', 'ruhulamin-slider-block')} value={btnHovColors} onChange={val => updateSlide(index, 'btnHovColors', val)} defaults={{ color: '#fff', bg: secondaryColor }} />
	</>
}
export default ItemSettings;