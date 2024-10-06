import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI('AIzaSyCupeN0JDIoHmFAL8cbX2TqhSyDiwpNNqc')
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

async function generate(entity, name, option) {
	const prompt = `Write a description in one paragraph for the ${entity} named '${name}'${
		option ? ' with option: ' + option : ''
	}. If any of information is not clear or not right, please only respond '404'.`
	const result = await model.generateContent(prompt)
	const response = await result.response
	const text = response.text()
	return text
}

export const DescriptionGenerator = generate
