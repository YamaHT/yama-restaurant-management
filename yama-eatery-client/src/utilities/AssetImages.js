export const AssetImages = {
	SYSTEM_LOGO: (() => {
		try {
			return require('../assets/img/general/logo.jpg')
		} catch (e) {
			return null
		}
	})(),

	BACKGROUND: {
		HOME_HERO: (() => {
			try {
				return require('../assets/img/general/HomeHeroBackground.jpg')
			} catch (e) {
				return null
			}
		})(),
		LOGIN: (() => {
			try {
				return require('../assets/img/general/LoginBackground.jpg')
			} catch (e) {
				return null
			}
		})(),
	},

	HomeCategory: (index) => {
		try {
			return require(`../assets/img/general/HomeCategory${index}.jpg`)
		} catch (e) {
			return null
		}
	},

	HomeStandard: (index) => {
		try {
			return require(`../assets/img/general/HomeStandard${index}.jpg`)
		} catch (e) {
			return null
		}
	},

	ProductImage: (imageName) => {
		try {
			return require(`../assets/img/product/${imageName}`)
		} catch (e) {
			return null
		}
	},

	TableImage: (imageName) => {
		try {
			return require(`../assets/img/table/${imageName}`)
		} catch (e) {
			return null
		}
	},

	UserImage: (imageName) => {
		try {
			return require(`../assets/img/user/${imageName}`)
		} catch (e) {
			return null
		}
	},

	VoucherImage: (imageName) => {
		try {
			return require(`../assets/img/voucher/${imageName}`)
		} catch (e) {
			return null
		}
	},

	EmployeeImage: (imageName) => {
		try {
			return require(`../assets/img/employee/${imageName}`)
		} catch (e) {
			return null
		}
	},
}
