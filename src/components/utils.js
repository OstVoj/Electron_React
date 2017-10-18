export function dispatchGlobalState() {
	if (window.electricPageComponent) {
		try {
			window.electricPageComponent.setState({
				element: '#pageComponent',
				page: page,
				site: data.site
			});
		} catch(error){}
	}
}
