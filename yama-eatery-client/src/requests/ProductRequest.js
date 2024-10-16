export const ProductRequest = {
	GET_ALL: '/product/getAllProduct',
	GET_PRODUCT_DETAIL: (id) => `/product/detail/detail/${id}`,
	GET_ALL_SIMILAR: (categoryName) => `/product/getSimilar?categoryName=${categoryName}`,
}