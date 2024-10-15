export const AssetImages = {
	SYSTEM_LOGO: require('../assets/img/general/logo.jpg'),
	BACKGROUND: {
		HOME_HERO: require('../assets/img/general/HomeHeroBackground.jpg'),
		LOGIN: require('../assets/img/general/LoginBackground.jpg'),
	},
	HomeCategory: (index) => require(`../assets/img/general/HomeCategory${index}.jpg`),
	HomeStandard: (index) => require(`../assets/img/general/HomeStandard${index}.jpg`),
	ProductImage: (imageName) => require(`../assets/img/product/${imageName}`),
}
