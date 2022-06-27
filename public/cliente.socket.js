const socket = io();
const messageForm = document.querySelector('#messageForm');
const usernameInput = document.querySelector('#usernameInput');
const messageInput = document.querySelector('#messageInput');
const messagesPool = document.querySelector('#messagesPool');

function sendMessage(messageInfo){
    socket.emit('client:message', messageInfo)
}

function renderMessages(messageInfo){
    const html = messageInfo.map(info =>{
        return(`<div>
        <strong>${info.username}</strong>:
        <em>${info.message}</em></div>`)
    }).join(" ");
    messagesPool.innerHTML = html;
}

function submitHandler(evt){
    evt.preventDefault()
    const messageInfo = { username: usernameInput.value, message: messageInput.value}
    sendMessage(messageInfo)
}

messageForm.addEventListener('submit', submitHandler);

socket.on('server:mensajes', renderMessages)