export interface OrderCreatedMessage {
    orderId: string
    amount: number
    status: 'pending' | 'paid' | 'canceled',
    customer: {
        id: string
    },
}