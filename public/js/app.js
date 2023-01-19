

// fetch('https://puzzle.mead.io/puzzle').then((response)=>{
//         response.json().then((data) => {
//         console.log(data)
//     })
// })


fetch('http://localhost:3000/weather?address=E14,GB').then((response) => {
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() 

    //extracts whatever input that was given in the searchbox
    const location = searchElement.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ' '

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

})