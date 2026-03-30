import { registerBlockType } from '@wordpress/blocks';

import './editor.scss';
import './style.scss';
import metadata from './block.json';
import Edit from './Components/Backend/Edit';

registerBlockType(metadata.name, {
	icon: {
		src: <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
			<path d='M2 6a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6zm2 1v10h16V7H4zm-3 4h1v2H1v-2zm21 0h1v2h-1v-2z' />
		</svg>
	},

	edit: Edit,

	save: () => null
});
