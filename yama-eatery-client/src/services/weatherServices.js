import { API_REQUEST } from '../utilities/apiRequest'
import axiosConfig from '../utilities/axiosConfig'

export const weatherService = {
	getAllWeather: async () => {
		return await axiosConfig
			.get(API_REQUEST.requestWeather.getAllWeather)
			.then((response) => {
				console.log(response.data)
				return response.data
			})
			.catch((error) => {
				throw error
			})
	},
}
