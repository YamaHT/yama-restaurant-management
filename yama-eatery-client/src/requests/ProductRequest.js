export const ProductRequest = {
	GET_ALL: '/product',
	GET_PRODUCT_DETAIL: (id) => `/product/detail/${id}`,
	GET_ALL_SIMILAR: (categoryName) => `/product/get-similar?categoryName=${categoryName}`,
	GET_PRICE_RANGE: '/product/price-range',
	GET_POPULAR_PRODUCT: 'product/get-popular',
}
