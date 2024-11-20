const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

 const dropdown = document.querySelectorAll(".dropdown select")
const btn =document.querySelector(" form button")
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")



 for (let select of dropdown) {
    for (currcode in countryList) {
        const option = document.createElement("option")
        option.innerText = currcode
        option.value = currcode
        if (select.name === "from" && currcode === "USD") {
            option.selected = "selected"
        } else if (select.name === "to" && currcode === "INR") {
            option.selected = "selected"
        }
        select.append(option)
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target )
    })
 }

 



 const updateflag = (select) => {
    let currcode = select.value
    let countrycode = countryList[currcode]
    console.log(countrycode)
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    
    let img = select.parentElement.querySelector("img")
    img.src = newsrc
 }


const updaterate = async () => {
    let amount = document.querySelector("form input")
    let amtval = amount.value

    if(amtval === "" || amtval < 1) {
        amtval = 1
        amount.value = "1"
    }

    const URL = `${base_url}/${fromcurr.value.toLowerCase()}.json`;

    let response = await fetch(URL) 
    let data = await response.json()
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]
    let finalamt = amtval * rate

    msg.innerText = `${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`
}
 
btn.addEventListener("click",  async (evt) => {
    evt.preventDefault()
    updaterate()
    
})


window.addEventListener("load", () => {
    updaterate()
})
