import { __ } from '@wordpress/i18n';

export const ProFeatures = [
	"Enable infinite loop for slider.",
	"Enable dynamic pagination bullets.",
	"Pause autoplay on mouse hover.",
	"Stop slider at the last slide.",
	"Apply effects like Cube, Flip, Coverflow, & Cards.",
	"Navigate slides using keyboard.",
	"Show or hide navigation & pagination on different devices.",
	"Customize slider wrapper background.",
	"Adjust padding and spacing easily.",
];


export const effects = [
	{ label: __('Slide', 'ruhulamin-slider-block'), value: 'slide' },
	{ label: __('Fade', 'ruhulamin-slider-block'), value: 'fade' },
	{ label: __('Cube', 'ruhulamin-slider-block'), value: 'cube' },
	{ label: __('Creative', 'ruhulamin-slider-block'), value: 'creative' },
	{ label: __('Coverflow', 'ruhulamin-slider-block'), value: 'coverflow' },
	{ label: __('Flip', 'ruhulamin-slider-block'), value: 'flip' },
	{ label: __('Cards', 'ruhulamin-slider-block'), value: 'cards' }
];

export const tabs = [
	{ name: 'general', title: __('General', 'ruhulamin-slider-block') },
	{ name: 'options', title: __('Options', 'ruhulamin-slider-block') },
	{ name: 'style', title: __('Style', 'ruhulamin-slider-block') }
];
