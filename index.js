const express = require('express');
const app = express();
const amqp = require('amqplib');
const PORT = process.env.PORT || 3001;

let channel, connection;

app.use(express.json());

connectQueue()

app.listen(PORT, () => console.log(`Server on ${PORT}`));


async function connectQueue() {
    try {
        connection = await amqp.connect("amqp://localhost:5672");
        channel = await connection.createChannel();

        await channel.assertQueue("test-queue");

        channel.consume("test-queue", data => {
            console.log(`${Buffer.from(data.content)}`);
            channel.ack(data);
        })
    } catch (err) {
        console.log(err)
    }
}