/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const AWS = require('aws-sdk')

const SQS = new AWS.SQS()
const queue = process.env.QUEUE

const flooder = () => {
    const entries = []

    for (let i = 0; i < 10; i += 1) {
        entries.push({
            Id: `id${parseInt(Math.random() * 1000000, 10)}`,
            MessageBody: `value${Math.random()}`
        })
    }
    return entries
}

const producer = async () => {
    // Flood SQS Queue
    const results = []
    for (let i = 0; i < 50; i += 1) {
        results.push(
            SQS.sendMessageBatch({
                Entries: flooder(),
                QueueUrl: queue
            }).promise()
        )
    }
    await Promise.all(results)
    console.log('sent messages to queue')
    return 'done'
}

export default producer
