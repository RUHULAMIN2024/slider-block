import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { AlignmentToolbar, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, RangeControl, ToolbarGroup, ToolbarButton, Dashicon, ToggleControl, TabPanel, __experimentalUnitControl as UnitControl } from '@wordpress/components';

import { Label, Background, ColorControl, Device, Typography, ItemsPanel } from '../../../../../../bpl-tools/Components';
import { BorderControl, SpaceControl } from '../../../../../../bpl-tools/Components/Deprecated';
import { BControlPro, SelectControlPro } from '../../../../../../bpl-tools/ProControls';
import { pxUnit, perUnit, emUnit, vhUnit } from '../../../../../../bpl-tools/utils/options';
import { primaryColor, secondaryColor } from '../../../../../../bpl-tools/utils/data';


// import { pluginSlug } from '../../../utils/data';
import { effects, ProFeatures, tabs } from '../../../utils/options';
import ItemSettings from './ItemSettings';
import ProModal from '../../../utils/proModal/proModal';

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

const Settings = ({ attributes, setAttributes, clientId, activeIndex, setActiveIndex, isPremium, device }) => {
	const { slides = [], columns, columnGap, sliderWidth, sliderHeight, isLoop, isTouchMove, speed, isAutoplay, autoplayOptions = {}, freeModeOptions = {}, effect, keyboardOptions = {}, isMousewheel = false, isPage, pageOnDevice = {}, isPageClickable, isPageDynamic, isPrevNext, prevNextOnDevice = {}, sliderBG = {}, sliderPadding = {}, pageColor, pageWidth, pageHeight, pageBorder, prevNextColor, sliderAlign, isTitle, titleTypo, isDesc, descTypo, isBtn, linkTarget, btnTypo, btnPadding, btnBorder } = attributes;

	const [isProModalOpen, setIsProModalOpen] = useState(false);

	const newSlide = {
		background: { color: '#00000080' },
		border: {},
		position: 'center center',
		childPositions: defaultChildPositions,
		title: `Slide Title ${slides.length + 1}`,
		titleColor: '#fff',
		description: `This content area describes slider ${slides.length + 1} descriptions/details.`,
		descColor: '#fff',
		btnText: `Button ${slides.length + 1}`,
		btnLink: '#',
		btnColors: { color: '#fff', bg: primaryColor },
		btnHovColors: { color: '#fff', bg: secondaryColor }
	}

	const addSlide = () => {
		setAttributes({
			slides: [...slides, newSlide]
		});
		setActiveIndex(slides.length);
	}

	const premiumProps = {
		isPremium,
		setIsProModalOpen
	};

	const panelBodyIF = {
		className: 'bPlPanelBody',
		initialOpen: false
	}

	const itemsProps = { attributes, setAttributes, clientId, arrKey: 'slides', activeIndex, setActiveIndex, premiumProps }

	return <>
		<InspectorControls>
			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={tabs}>{tab => <>
				{'general' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Slides', 'ra-advanced-slider')}>
						<ItemsPanel {...itemsProps} newItem={newSlide} ItemSettings={ItemSettings} itemLabel='Slide' design={isPremium ? 'sortable' : 'all'} />
					</PanelBody>


					<PanelBody title={__('Layout Settings', 'ra-advanced-slider')} {...panelBodyIF}>
						<PanelRow>
							<Label className='mb5'>{__('Columns:', 'ra-advanced-slider')}</Label>
							<Device />
						</PanelRow>
						<RangeControl value={columns[device]} onChange={val => setAttributes({ columns: { ...columns, [device]: val } })} min={1} max={6} step={1} beforeIcon='grid-view' />

						<Label>{__('Column Gap:', 'ra-advanced-slider')}</Label>
						<RangeControl value={columnGap} onChange={val => setAttributes({ columnGap: val })} min={0} max={250} step={1} beforeIcon='arrow-right-alt' />

						<UnitControl className='mt20' label={__('Width:', 'ra-advanced-slider')} labelPosition='left' value={sliderWidth} onChange={val => setAttributes({ sliderWidth: val })} units={[pxUnit(), perUnit(), emUnit()]} />

						<UnitControl className='mt20' label={__('Height:', 'ra-advanced-slider')} labelPosition='left' value={sliderHeight} onChange={val => setAttributes({ sliderHeight: val })} units={[pxUnit(), emUnit(), vhUnit()]} />
					</PanelBody>
				</>}


				{'options' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Basic Options', 'ra-advanced-slider')}>
						<BControlPro label={__('Enable Loop', 'ra-advanced-slider')} checked={isLoop} onChange={val => setAttributes({ isLoop: val })} {...premiumProps} Component={ToggleControl} />

						<ToggleControl className='mt10' label={__('Enable Touch Move', 'ra-advanced-slider')} checked={isTouchMove} onChange={val => setAttributes({ isTouchMove: val })} />
						<small>{__('Switch slide with grab in anywhere in slide', 'ra-advanced-slider')}</small>
						<small>{__('Touch Move will not work in backend', 'ra-advanced-slider')}</small>

						<Label>{__('Speed (s):', 'ra-advanced-slider')}</Label>
						<RangeControl value={speed} onChange={val => setAttributes({ speed: val })} min={0} max={10} step={.05} />
						<small>{__('Smaller speed value will be slide faster', 'ra-advanced-slider')}</small>
					</PanelBody>


					<PanelBody title={__('Autoplay', 'ra-advanced-slider')} {...panelBodyIF}>
						<ToggleControl label={__('Enable Autoplay', 'ra-advanced-slider')} checked={isAutoplay} onChange={val => setAttributes({ isAutoplay: val })} />
						<small>{__('Autoplay will not work in backend', 'ra-advanced-slider')}</small>

						{isAutoplay && <>
							<BControlPro className='mt20' label={__('Delay (s):', 'ra-advanced-slider')} value={autoplayOptions.delay} onChange={val => setAttributes({ autoplayOptions: { ...autoplayOptions, delay: val } })} min={0} max={10} step={.05} beforeIcon='visibility' {...premiumProps} Component={RangeControl} />
							<small>{__('Smaller delay value will be autoplay faster', 'ra-advanced-slider')}</small>

							<BControlPro className='mt20' label={__('Disable on Interaction', 'ra-advanced-slider')} checked={autoplayOptions.disableOnInteraction} onChange={val => setAttributes({ autoplayOptions: { ...autoplayOptions, disableOnInteraction: val } })} {...premiumProps} Component={ToggleControl} />

							<BControlPro className='mt10' label={__('Pause on Mouse Enter', 'ra-advanced-slider')} checked={autoplayOptions.pauseOnMouseEnter} onChange={val => setAttributes({ autoplayOptions: { ...autoplayOptions, pauseOnMouseEnter: val } })} {...premiumProps} Component={ToggleControl} />
							<small>{__(`If 'Disable on Interaction' is also enabled, it will stop autoplay instead of pause`, 'ra-advanced-slider')}</small>

							<BControlPro className='mt10' label={__('Reverse Direction', 'ra-advanced-slider')} checked={autoplayOptions.reverseDirection} onChange={val => setAttributes({ autoplayOptions: { ...autoplayOptions, reverseDirection: val } })} {...premiumProps} Component={ToggleControl} />

							<BControlPro className='mt10' label={__('Stop on Last Slide', 'ra-advanced-slider')} checked={autoplayOptions.stopOnLastSlide} onChange={val => setAttributes({ autoplayOptions: { ...autoplayOptions, stopOnLastSlide: val } })} {...premiumProps} Component={ToggleControl} />
						</>}
					</PanelBody>


					<PanelBody title={__('Free Mode', 'ra-advanced-slider')} {...panelBodyIF}>
						<BControlPro label={__('Enable Free Mode', 'ra-advanced-slider')} checked={freeModeOptions.enabled} onChange={val => setAttributes({ freeModeOptions: { ...freeModeOptions, enabled: val } })} {...premiumProps} Component={ToggleControl} />
						<small>{__('Smooth Scrolling with dragging the slide', 'ra-advanced-slider')}</small>
						<br />
						<small>{__('Enable Touch Move to use Free Mode', 'ra-advanced-slider')}</small>

						{freeModeOptions.enabled && <BControlPro className='mt10' label={__('Sticky', 'ra-advanced-slider')} checked={freeModeOptions.sticky} onChange={val => setAttributes({ freeModeOptions: { ...freeModeOptions, sticky: val } })} {...premiumProps} Component={ToggleControl} />}
					</PanelBody>


					<PanelBody title={__('Effects', 'ra-advanced-slider')} {...panelBodyIF}>
						<PanelRow>
							<Label className=''>{__('Effect:', 'ra-advanced-slider')}</Label>
							<SelectControlPro value={effect}
								onChange={val => {
									setAttributes({ effect: val });
									val === 'slide' && setAttributes({
										columns: { desktop: 1, tablet: 1, mobile: 1 },
										sliderWidth: '100%',
										sliderHeight: '400px',
										sliderPadding: { vertical: '0px', horizontal: '0px' }
									});
									val === 'fade' && setAttributes({
										columns: { desktop: 1, tablet: 1, mobile: 1 },
										sliderWidth: '100%',
										sliderHeight: '400px',
										sliderPadding: { vertical: '0px', horizontal: '0px' }
									});
									val === 'cube' && setAttributes({
										columns: { desktop: 1, tablet: 1, mobile: 1 },
										sliderWidth: '450px',
										sliderHeight: '500px',
										sliderPadding: { vertical: '50px', horizontal: '50px' }
									});
									val === 'creative' && setAttributes({
										columns: { desktop: 1, tablet: 1, mobile: 1 },
										sliderWidth: '100%',
										sliderHeight: '400px',
										sliderPadding: { vertical: '0px', horizontal: '0px' }
									});
									val === 'coverflow' && setAttributes({
										columns: { desktop: 3, tablet: 2, mobile: 1 },
										sliderWidth: '100%',
										sliderHeight: '400px',
										sliderPadding: { vertical: '0px', horizontal: '0px' }
									});
									val === 'flip' && setAttributes({
										columns: { desktop: 1, tablet: 1, mobile: 1 },
										sliderWidth: '450px',
										sliderHeight: '500px',
										sliderPadding: { vertical: '50px', horizontal: '50px' }
									});
									val === 'cards' && setAttributes({
										columns: { desktop: 1, tablet: 1, mobile: 1 },
										sliderWidth: '400px',
										sliderHeight: '500px',
										sliderPadding: { vertical: '50px', horizontal: '50px' }
									});
								}}
								options={effects}
								proValues={['cube', 'coverflow', 'flip', 'cards']}
								{...premiumProps}
							/>
						</PanelRow>
						<small>{__('To work fade, cube, creative, flip & cards effects properly, set single column per view.', 'ra-advanced-slider')}</small>
						<br />
						<small>{__('Some settings may change when effect will be changed.', 'ra-advanced-slider')}</small>
					</PanelBody>


					<PanelBody title={__('Keyboard Control', 'ra-advanced-slider')} {...panelBodyIF}>
						<BControlPro label={__('Enable Keyboard Control', 'ra-advanced-slider')} checked={keyboardOptions.enabled} onChange={val => setAttributes({ keyboardOptions: { ...keyboardOptions, enabled: val } })}{...premiumProps} Component={ToggleControl} />
					</PanelBody>


					<PanelBody title={__('Mousewheel', 'ra-advanced-slider')} {...panelBodyIF}>
						<BControlPro label={__('Enable Slide on Mousewheel', 'ra-advanced-slider')} checked={isMousewheel} onChange={val => setAttributes({ isMousewheel: val })}{...premiumProps} Component={ToggleControl} />
					</PanelBody>


					<PanelBody title={__('Pagination', 'ra-advanced-slider')} {...panelBodyIF}>
						<ToggleControl label={__('Show Pagination', 'ra-advanced-slider')} checked={isPage} onChange={val => setAttributes({ isPage: val })} />

						{isPage && <>
							<BControlPro className='mt10' label={__('Show On Tablet', 'ra-advanced-slider')} checked={pageOnDevice?.tablet} onChange={val => setAttributes({ pageOnDevice: { ...pageOnDevice, tablet: val } })} {...premiumProps} Component={ToggleControl} />

							<BControlPro className='mt10' label={__('Show On Mobile', 'ra-advanced-slider')} checked={pageOnDevice?.mobile} onChange={val => setAttributes({ pageOnDevice: { ...pageOnDevice, mobile: val } })} {...premiumProps} Component={ToggleControl} />

							<ToggleControl className='mt10' label={__('Enable Pagination Clickable', 'ra-advanced-slider')} checked={isPageClickable} onChange={val => setAttributes({ isPageClickable: val })} />

							<BControlPro className='mt10' label={__('Enable Pagination Dynamic Bullets', 'ra-advanced-slider')} checked={isPageDynamic} onChange={val => setAttributes({ isPageDynamic: val })} {...premiumProps} Component={ToggleControl} />
						</>}
					</PanelBody>


					<PanelBody title={__('Navigation', 'ra-advanced-slider')} {...panelBodyIF}>
						<ToggleControl label={__('Show Preview Next Button', 'ra-advanced-slider')} checked={isPrevNext} onChange={val => setAttributes({ isPrevNext: val })} />

						{isPrevNext && <>
							<BControlPro className='mt10' label={__('Show On Tablet', 'ra-advanced-slider')} checked={prevNextOnDevice?.tablet} onChange={val => setAttributes({ prevNextOnDevice: { ...prevNextOnDevice, tablet: val } })} {...premiumProps} Component={ToggleControl} />

							<BControlPro className='mt10' label={__('Show On Mobile', 'ra-advanced-slider')} checked={prevNextOnDevice?.mobile} onChange={val => setAttributes({ prevNextOnDevice: { ...prevNextOnDevice, mobile: val } })} {...premiumProps} Component={ToggleControl} />
						</>}
					</PanelBody>
				</>}


				{'style' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Slider', 'ra-advanced-slider')}>
						<BControlPro label={__('Background', 'ra-advanced-slider')} value={sliderBG} onChange={val => setAttributes({ sliderBG: val })} defaults={{ color: '#0000' }} {...premiumProps} Component={Background} />

						<BControlPro className='mt20' label={__('Padding:', 'ra-advanced-slider')} value={sliderPadding} onChange={val => setAttributes({ sliderPadding: val })} defaults={{ vertical: '0px', horizontal: '0px' }} {...premiumProps} Component={SpaceControl} />
					</PanelBody>


					{isPage || isPrevNext ? <PanelBody title={__('Options', 'ra-advanced-slider')} {...panelBodyIF}>
						{isPage && <>
							<ColorControl label={__('Pagination Bullets Color:', 'ra-advanced-slider')} value={pageColor} onChange={val => setAttributes({ pageColor: val })} defaultColor='#fff' />

							<UnitControl className='mt20' label={__('Pagination Width:', 'ra-advanced-slider')} labelPosition='left' value={pageWidth} onChange={val => setAttributes({ pageWidth: val })} units={[pxUnit(), emUnit()]} />

							<UnitControl className='mt20' label={__('Pagination Height:', 'ra-advanced-slider')} labelPosition='left' value={pageHeight} onChange={val => setAttributes({ pageHeight: val })} units={[pxUnit(), emUnit()]} />

							<BorderControl label={__('Pagination Border:', 'ra-advanced-slider')} value={pageBorder} onChange={val => setAttributes({ pageBorder: val })} defaults={{ radius: '50%' }} />
						</>}

						{isPrevNext && <ColorControl label={__('Preview Next Button Color:', 'ra-advanced-slider')} value={prevNextColor} onChange={val => setAttributes({ prevNextColor: val })} defaultColor='#fff' />}
					</PanelBody> : ''}


					<PanelBody title={__('Slide Title', 'ra-advanced-slider')} {...panelBodyIF}>
						<ToggleControl label={__('Show Title', 'ra-advanced-slider')} checked={isTitle} onChange={val => setAttributes({ isTitle: val })} />

						{isTitle && <Typography value={titleTypo} onChange={val => setAttributes({ titleTypo: val })} defaults={{ fontSize: { desktop: 25, tablet: 22, mobile: 20 } }} />}
					</PanelBody>


					<PanelBody title={__('Slide Description', 'ra-advanced-slider')} {...panelBodyIF}>
						<ToggleControl label={__('Show Description', 'ra-advanced-slider')} checked={isDesc} onChange={val => setAttributes({ isDesc: val })} />

						{isDesc && <Typography value={descTypo} onChange={val => setAttributes({ descTypo: val })} defaults={{ fontSize: { desktop: 15, tablet: 15, mobile: 15 } }} />}
					</PanelBody>


					<PanelBody title={__('Slide Button', 'ra-advanced-slider')} {...panelBodyIF}>
						<ToggleControl label={__('Show Button', 'ra-advanced-slider')} checked={isBtn} onChange={val => setAttributes({ isBtn: val })} />

						{isBtn && <>
							<ToggleControl className='mt10' label={__('Open link in new tab', 'ra-advanced-slider')} checked={'_blank' === linkTarget ? true : false} onChange={val => setAttributes({ linkTarget: val ? '_blank' : '' })} />

							<Typography value={btnTypo} onChange={val => setAttributes({ btnTypo: val })} defaults={{ fontSize: { desktop: 16, tablet: 16, mobile: 16 } }} />

							<SpaceControl className='mt20' label={__('Padding:', 'ra-advanced-slider')} value={btnPadding} onChange={val => setAttributes({ btnPadding: val })} defaults={{ vertical: '12px', horizontal: '35px' }} />

							<BorderControl label={__('Border:', 'ra-advanced-slider')} value={btnBorder} onChange={val => setAttributes({ btnBorder: val })} defaults={{ radius: '3px' }} />
						</>}
					</PanelBody>
				</>}
			</>}</TabPanel>
		</InspectorControls>


		<BlockControls>
			<ToolbarGroup className='bPlToolbar'>
				<ToolbarButton label={__('Add New Slide', 'ra-advanced-slider')} onClick={addSlide} ><Dashicon icon='plus' /></ToolbarButton>
			</ToolbarGroup>

			<AlignmentToolbar value={sliderAlign} onChange={val => setAttributes({ sliderAlign: val })} describedBy={__('Slider Alignment')} alignmentControls={[
				{ title: __('Slider in left', 'ra-advanced-slider'), align: 'left', icon: 'align-left' },
				{ title: __('Slider in center', 'ra-advanced-slider'), align: 'center', icon: 'align-center' },
				{ title: __('Slider in right', 'ra-advanced-slider'), align: 'right', icon: 'align-right' }
			]} />
		</BlockControls>
		<ProModal
        isProModalOpen={isProModalOpen}
        setIsProModalOpen={setIsProModalOpen}
        link="https://checkout.freemius.com/plugin/26132/plan/43189/"
        features={ProFeatures}
      ></ProModal>


		
	</>;
};
export default withSelect((select) => {
	const { getDeviceType } = select('core/editor');

	return {
		device: getDeviceType()?.toLowerCase()
	}
})(Settings);