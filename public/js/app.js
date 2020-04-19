console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const fetchWeather = (arg)=>{
    fetch(`/weather?address=${arg}`).then((response)=>{
        response.json().then((data)=>{
            if (data.error) {
                return messageOne.textContent = data.error
            }
    
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })
}

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    if (search.value===''){
        messageOne.textContent = 'Please put an address'
        messageTwo.textContent = ''
    } else {
        search.value =''
    
        messageOne.textContent = 'Loading'
        messageTwo.textContent = ''
    
       fetchWeather(location)
    }
})