let getFbAppId = () => {
	switch (location.host) {
		case 'localhost:3000':
			return ''
		default:
			return ''
	}
}

export default {
	fb: {
		appId: getFbAppId(),
		xfbml: true,
		version: 'v2.5'
	}
}
