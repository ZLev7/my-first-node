

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
});

const weatherFrom = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//messageOne.textContent = 'asdd'

weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
            if(data.error){
                return messageTwo.textContent = data.error
            }
            messageOne.textContent = data.summary;
            messageTwo.textContent = data.timeZone;
        })
    })
})
