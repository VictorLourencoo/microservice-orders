import { orders } from "./channels/orders.ts";

orders.consume("orders", async (message) => {
    if (!message) {
        console.error("No message received");
        return;
    }

    console.log("Message received:", message.content.toString());

    orders.ack(message); // Reconhecer a mensagem quando for processada
}, {
    noAck: false,
})
//   noAck: false, - reconhecer quando a mensagem for processada  - ter controle sobre as mensagens
//   noAck: true, - não reconhecer quando a mensagem for processada

