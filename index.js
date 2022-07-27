const mainForm = document['main-form']
console.log(mainForm)


axios.get("https://api.vschool.io/cameronfordCapstone/todo")
.then(Response => {
    for (let i = 0; i < Response.data.length; i++) {
        let data = (Response.data[i])
        
        getStuff(data.title, data.description, data.price, data.imgLink, data)

        // console.log(data.completed)
        if (data.completed) { 
        lineThrough (newTitleDiv, newDiscDiv, newPriceDiv, newImgDiv, newcheckboxDiv)
    }         
    }
})

.catch(error => console.log("you got an error!"))




mainForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const newObj = {
        title: mainForm['main-form-title'].value,
        description: mainForm['main-form-disc'].value,
        price: mainForm['main-form-price'].value,
        img: mainForm['main-form-img'].value
    }
    
    axios.post("https://api.vschool.io/cameronfordCapstone/todo", newObj)
    
    const title = mainForm['main-form-title'].value
    const disc = mainForm['main-form-disc'].value
    const price = mainForm['main-form-price'].value
    const img = mainForm['main-form-img'].value
    
    getStuff (title, disc, price, img)
})

function getStuff (title, description, price, img, data){
    const newDiv = document.createElement("div")
    const newTitleDiv = document.createElement("h1")
    const newDiscDiv = document.createElement("h3")
    const newPriceDiv = document.createElement("h2")
    const newImgDiv = document.createElement("img")
    const newcheckboxDiv = document.createElement("INPUT");
    newcheckboxDiv.setAttribute("type", "checkbox");
    
    newTitleDiv.textContent = title
    newDiscDiv.textContent = description
    newPriceDiv.textContent = price
    newImgDiv.scr = img
    newDiv.style.border = "transparent 30px solid"
    
    document.body.append(newDiv)
    newDiv.appendChild(newTitleDiv)
    newDiv.appendChild(newDiscDiv)
    newDiv.appendChild(newPriceDiv)
    newDiv.appendChild(newImgDiv)
    newDiv.appendChild(newcheckboxDiv)

    const completedTrue = {
        completed: "true"
    }

    const completedfalse = {
        completed: "false"
    }

    newcheckboxDiv.addEventListener("change", (event) =>{
        if (event.target.checked) {
            //set complet to true
            axios.put("https://api.vschool.io/cameronfordCapstone/todo/"+data._id, completedTrue)
            .catch(error => console.log(error))

            lineThrough (newTitleDiv, newDiscDiv, newPriceDiv, newImgDiv, newcheckboxDiv)
          } else {
            //set complet to false 
            axios.put("https://api.vschool.io/cameronfordCapstone/todo/"+data._id, completedfalse)

            undoLine(newTitleDiv, newDiscDiv, newPriceDiv, newImgDiv, newcheckboxDiv)
        }

    })

    
}

function lineThrough(title, disc, price, img, checkBox) {
    console.log(title)
    title.style.textDecorationLine = "line-through";
    disc.style.textDecorationLine = "line-through";
    price.style.textDecorationLine = "line-through"
    // delete img
    checkBox.checked = true;
}

function undoLine (title, disc, price, img, checkBox) {
    title.style.textDecorationLine = null;
    disc.style.textDecorationLine = null;
    price.style.textDecorationLine = null
    // delete img
    checkBox.checked = false;
}