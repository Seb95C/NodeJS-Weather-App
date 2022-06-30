const searchLocation = (location) => {

    paragraphOne.textContent = 'Loading...'
    paragraphTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then(({ error, location, forecast}) => {
            if (error) {
                
                paragraphOne.textContent = error
            } else {
                paragraphOne.textContent = location
                paragraphTwo.textContent = forecast
            }
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const paragraphOne = document.querySelector('#info')
const paragraphTwo = document.querySelector('#result')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    searchLocation(location)
})