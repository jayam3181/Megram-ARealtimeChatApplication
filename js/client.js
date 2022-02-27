const socket = io.connect("http://localhost:8000")

const audio = new Audio('../notification_sound.mp3')
const form = document.getElementById('send')
const msginp = document.getElementById('msginp')
const msgcon = document.querySelector('.msgarea')
const chats = document.querySelector('.members')

//Scrolling function
// function getMessages() {
//     shouldScroll = msgcon.scrollTop + msgcon.clientHeight === msgcon.scrollHeight;
//     if (!shouldScroll) {
//         scrollToBottom();
//     }
// }
// function scrollToBottom() {
//     msgcon.scrollTop = msgcon.scrollHeight;
// }
// scrollToBottom();
// var element = document.getElementById("box");

function scrollToBottom() {
    msgcon.scrollTop = msgcon.scrollHeight;
}

//Append Function
const append = (message, position) => {
    const msgelmnt = document.createElement('div')
    msgelmnt.innerText = message
    msgelmnt.classList.add('msg')
    msgelmnt.classList.add(position)
    msgcon.append(msgelmnt)
    // setInterval(scrollToBottom,10)
    scrollToBottom()

    if (position == 'left') {
        audio.play()
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = msginp.value
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    msginp.value = ''
})
const name = prompt('Enter your name to join:')
socket.emit('new-user-joined', name)

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})
socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left')
})
socket.on('left', name => {
    append(`${name} left the chat`, 'left')
})

const append2 = (message) => {
    const usernames = document.createElement('div')
    usernames.innerText = message
    usernames.classList.add('username')
    usernames.classList.add('members')
    chats.append(usernames)
}
socket.emit('new_user_joined', name)
socket.on('user_joined', name => {
    append2(`${name}`)
})

// stop scrolling

