export const calcPercentage = (child, parent) => 100 * parseFloat(child / parent);
export const elWidth = el => parseInt(el?.clientWidth);
export const elHeight = el => parseInt(el?.clientHeight);

export const getPosByPos = (id, index, pos) => {
	const contentEl = document.querySelector(`#${id} .swiper-wrapper .slide-${index} .slideContent`);
	const childEls = contentEl?.children || [];

	if (childEls?.length) {
		const childLen = childEls.length;

		const result = [];

		for (let i = 0; i < childLen; i++) {
			const getChildWidth = (ind = i) => calcPercentage(elWidth(childEls[ind]), elWidth(contentEl));
			const getChildHeight = (ind = i) => calcPercentage(elHeight(childEls[ind]), elHeight(contentEl));
			const cChildWidth = getChildWidth(i);
			const cChildHeight = getChildHeight(i);

			if (0 < cChildWidth && 0 < cChildHeight && isFinite(cChildWidth) && isFinite(cChildHeight)) {
				const itemHWS = ind => ind >= 0 ? getChildHeight(ind) + 3 : 0;
				const vSpace = 11;
				const hSpace = 5.8;

				let prevItemsHeight = 0;
				for (let j = 0; j < i; j++) {
					prevItemsHeight += itemHWS(j);
				}

				let nextItemsHeight = 0;
				for (let j = childLen - 1; j > i; j--) {
					nextItemsHeight += itemHWS(j);
				}

				const topTop = vSpace + prevItemsHeight;
				const topBottom = 100 - (vSpace + cChildHeight + prevItemsHeight);

				const bottomTop = 100 - (vSpace + cChildHeight + nextItemsHeight);
				const bottomBottom = vSpace + nextItemsHeight;

				const leftRightLong = 100 - (cChildWidth + hSpace);
				const leftRightCenter = 50 - (cChildWidth / 2);

				const centerTop = childLen === 3 ?
					(i === 1 ?
						50 - (cChildHeight / 2) :
						(i === 2 ?
							50 + (getChildHeight(1) / 2) + 3 :
							50 - (getChildHeight(1) / 2) - 3 - cChildHeight
						)
					) :
					(childLen === 2 ?
						(i === 1 ?
							50 + 1.5 :
							50 - 1.5 - cChildHeight
						) :
						50 - (cChildHeight / 2)
					);

				const centerBottom = childLen === 3 ?
					(i === 1 ?
						50 + (cChildHeight / 2) :
						(i === 2 ?
							50 + (getChildHeight(1) / 2) + 3 + cChildHeight :
							50 - (getChildHeight(1) / 2) - 3
						)
					) :
					(childLen === 2 ?
						(i === 1 ?
							50 + 1.5 + cChildHeight :
							50 - 1.5
						) :
						50 + (cChildHeight / 2)
					);

				const topLeft = { top: topTop, right: leftRightLong, bottom: topBottom, left: hSpace };
				const topCenter = { top: topTop, right: leftRightCenter, bottom: topBottom, left: leftRightCenter };
				const topRight = { top: topTop, right: hSpace, bottom: topBottom, left: leftRightLong };

				const centerLeft = { top: centerTop, right: leftRightLong, bottom: centerBottom, left: hSpace };
				const centerCenter = { top: centerTop, right: leftRightCenter, bottom: centerBottom, left: leftRightCenter };
				const centerRight = { top: centerTop, right: hSpace, bottom: centerBottom, left: leftRightLong };

				const bottomLeft = { top: bottomTop, right: leftRightLong, bottom: bottomBottom, left: hSpace };
				const bottomCenter = { top: bottomTop, right: leftRightCenter, bottom: bottomBottom, left: leftRightCenter };
				const bottomRight = { top: bottomTop, right: hSpace, bottom: bottomBottom, left: leftRightLong };

				switch (pos) {
					case 'top left': result.push(topLeft); break;
					case 'top center': result.push(topCenter); break;
					case 'top right': result.push(topRight); break;
					case 'center left': result.push(centerLeft); break;
					case 'center center': result.push(centerCenter); break;
					case 'center right': result.push(centerRight); break;
					case 'bottom left': result.push(bottomLeft); break;
					case 'bottom center': result.push(bottomCenter); break;
					case 'bottom right': result.push(bottomRight); break;
				}
			}
		}

		return result;
	}
}
