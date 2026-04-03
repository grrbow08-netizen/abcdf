const { WebSocketServer } = require("ws")
const port = process.env.PORT || 8080
const wss = new WebSocketServer({ port })
const clients = new Set()

wss.on("connection", ws => {
    clients.add(ws)
    ws.on("message", data => {
        const msg = data.toString()
        for (const client of clients) {
            if (client !== ws && client.readyState === 1) {
                client.send(msg)
            }
        }
    })
    ws.on("close", () => clients.delete(ws))
    ws.on("error", () => clients.delete(ws))
})

console.log("WebSocket server running on port", port)
