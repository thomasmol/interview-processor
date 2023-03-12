/** Dispatch event on click outside of node */
const clickOutside = (node: Node, fn: () => void) => {
	const handler = (event: MouseEvent) => {
		const el = event.target as Node;
		if (!node.contains(el) && !event.defaultPrevented) {
			fn();
		}
	};

	document.addEventListener('click', handler, true);

	return {
		destroy() {
			document.removeEventListener('click', handler, true);
		}
	};
};

export default clickOutside;
