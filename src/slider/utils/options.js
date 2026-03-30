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
	{ label: __('Slide', 'ra-advanced-slider'), value: 'slide' },
	{ label: __('Fade', 'ra-advanced-slider'), value: 'fade' },
	{ label: __('Cube', 'ra-advanced-slider'), value: 'cube' },
	{ label: __('Creative', 'ra-advanced-slider'), value: 'creative' },
	{ label: __('Coverflow', 'ra-advanced-slider'), value: 'coverflow' },
	{ label: __('Flip', 'ra-advanced-slider'), value: 'flip' },
	{ label: __('Cards', 'ra-advanced-slider'), value: 'cards' }
];

export const tabs = [
	{ name: 'general', title: __('General', 'ra-advanced-slider') },
	{ name: 'options', title: __('Options', 'ra-advanced-slider') },
	{ name: 'style', title: __('Style', 'ra-advanced-slider') }
];
