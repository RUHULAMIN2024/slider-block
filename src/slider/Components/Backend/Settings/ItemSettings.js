import { __ } from '@wordpress/i18n';
import { PanelRow, TextControl, TextareaControl, __experimentalAlignmentMatrixControl as AlignmentMatrixControl } from '@wordpress/components';
import { produce } from 'immer';

import { Label, Background, ColorControl, ColorsControl } from '../../../../../../bpl-tools/Components';
import { BorderControl } from '../../../../../../bpl-tools/Components/Deprecated';
import { BControlPro } from '../../../../../../bpl-tools/ProControls';
import { primaryColor, secondaryColor } from '../../../../../../bpl-tools/utils/data';

import { getPosByPos } from '../../../utils/functions';

const ItemSettings = ({ attributes, setAttributes, clientId, arrKey, index, setActiveIndex = false, premiumProps }) => {
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
		<Background label={__('Background', 'ra-advanced-slider')} value={background} onChange={val => updateSlide(index, 'background', val)} defaults={{ color: '#00000080' }} />

		<BControlPro label={__('Border:', 'ra-advanced-slider')} value={border} onChange={val => updateSlide(index, 'border', val)} {...premiumProps} Component={BorderControl} />

		<PanelRow>
			<Label className=''>{__('Content Position', 'ra-advanced-slider')}</Label>
			<AlignmentMatrixControl value={items[index]?.position} onChange={val => {
				setAttributes({
					slides: produce(items, draft => {
						draft[index]['position'] = val;
						draft[index]['childPositions'] = getPosByPos(`block-${clientId}`, index, val);
					})
				})
			}} />
		</PanelRow>
		<small>{__('You can also change the content position by dragging element (Pro).', 'ra-advanced-slider')}</small>

		<PanelRow className='mt20'>
			<Label className=''>{__('Title:', 'ra-advanced-slider')}</Label>
			<TextControl value={title} onChange={val => updateSlide(index, 'title', val)} placeholder={__('Slide title', 'ra-advanced-slider')} />
		</PanelRow>

		<ColorControl label={__('Title Color:', 'ra-advanced-slider')} value={titleColor} onChange={val => updateSlide(index, 'titleColor', val)} defaultColor='#fff' />

		<Label>{__('Description:', 'ra-advanced-slider')}</Label>
		<TextareaControl value={description} onChange={val => updateSlide(index, 'description', val)} placeholder={__('Description of the slider', 'ra-advanced-slider')} />

		<ColorControl label={__('Description Color:', 'ra-advanced-slider')} value={descColor} onChange={val => updateSlide(index, 'descColor', val)} defaultColor='#fff' />

		<PanelRow className='mt20'>
			<Label className=''>{__('Button Text:', 'ra-advanced-slider')}</Label>
			<TextControl value={btnText} onChange={val => updateSlide(index, 'btnText', val)} placeholder={__('Button label', 'ra-advanced-slider')} />
		</PanelRow>

		<PanelRow>
			<Label className=''>{__('Button Link:', 'ra-advanced-slider')}</Label>
			<TextControl value={btnLink} onChange={val => updateSlide(index, 'btnLink', val)} placeholder={__('Button link', 'ra-advanced-slider')} />
		</PanelRow>

		<ColorsControl label={__('Button Colors:', 'ra-advanced-slider')} value={btnColors} onChange={val => updateSlide(index, 'btnColors', val)} defaults={{ color: '#fff', bg: primaryColor }} />

		<BControlPro label={__('Button Hover Colors:', 'ra-advanced-slider')} value={btnHovColors} onChange={val => updateSlide(index, 'btnHovColors', val)} defaults={{ color: '#fff', bg: secondaryColor }} {...premiumProps} Component={ColorsControl} />
	</>
}
export default ItemSettings;