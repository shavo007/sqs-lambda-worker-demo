import logger from './logger'

let counter = 1
let messageCount = 0
const funcId = `id${parseInt(Math.random() * 1000, 10)}`

const worker = async event => {
	// Record number of messages received
	if (event.Records) {
		messageCount += event.Records.length
	}
	logger.info(`records length is ${event.Records.length}`)
	counter += 1
	logger.info(`${funcId} REUSE:  ${counter}`)
	logger.info(`Message Count:  ${messageCount}`)
	logger.info(JSON.stringify(event))
	return 'done'
}

export default worker
