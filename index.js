const mainForm = document['main-form']
// console.log(mainForm)


axios.get("https://api.vschool.io/cameronfordCapstone/todo")
.then(Response => {
    for (let i = 0; i < Response.data.length; i++) {
        let data = (Response.data[i])
        
        getStuff(data)

      
    }
})
.catch(error => console.log("you got an error!"))




mainForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const newObj = {
        title: mainForm['main-form-title'].value,
        description: mainForm['main-form-disc'].value,
        price: mainForm['main-form-price'].value,
        imgUrl: mainForm['main-form-img'].value
    }
    
    axios.post("https://api.vschool.io/cameronfordCapstone/todo", newObj)
    .then(Response => {
        getStuff (Response.data)
    })
    
})

function getStuff (data){
    const newDiv = document.createElement("div")
    const newTitleDiv = document.createElement("h1")
    const newDiscDiv = document.createElement("h3")
    const newPriceDiv = document.createElement("h2")
    const newEditButton = document.createElement("button")
    const newImgDiv = document.createElement("img")
    const newDeleteButon = document.createElement("button")
    const newcheckboxDiv = document.createElement("INPUT");
    newcheckboxDiv.setAttribute("type", "checkbox");
    
    newTitleDiv.textContent = data.title
    newDiscDiv.textContent = data.description
    newPriceDiv.textContent = data.price
    newDeleteButon.textContent = "delete"
    newEditButton.textContent = "edit"
    newImgDiv.src = data.imgUrl
    newDiv.style.border = "transparent 30px solid"
    
    document.body.append(newDiv)
    newDiv.appendChild(newTitleDiv)
    newDiv.appendChild(newDiscDiv)
    newDiv.appendChild(newPriceDiv)
    newDiv.appendChild(newDeleteButon)
    newDiv.appendChild(newEditButton)
    newDiv.appendChild(newImgDiv)
    newDiv.appendChild(newcheckboxDiv)

    if (data.completed){
        lineThrough (newTitleDiv, newDiscDiv, newPriceDiv, newImgDiv, newcheckboxDiv)
    }

    // console.log(newDiv)
    
    newDeleteButon.addEventListener("click",() =>{
    newDiv.remove();
        axios.delete("https://api.vschool.io/cameronfordCapstone/todo/"+data._id)
    })

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
    newEditButton.addEventListener("click", () =>{
    const newDivEdit = document.createElement("div")
    const newTitleDivEdit = document.createElement("input")
    const newDiscDivEdit = document.createElement("input")
    const newPriceDivEdit = document.createElement("input")
    const newSaveDivEdit = document.createElement("button")
    // const newCancelDivEdit = document.createElement("button")

    newTitleDivEdit.defaultValue = newTitleDiv.textContent
    newTitleDivEdit.placeholder = "Title"
    newDiscDivEdit.defaultValue = newDiscDiv.textContent
    newDiscDivEdit.placeholder = "Description"
    newPriceDivEdit.defaultValue = newPriceDiv.textContent
    newPriceDivEdit.placeholder = "Price"
    // newSaveDivEdit.textContent = "save"
    // newCancelDivEdit.textContent = "cancel"

    newEditButton.textContent = "save"

    
    newDiv.appendChild(newDivEdit),
    newDivEdit.appendChild(newTitleDivEdit)
    newDivEdit.appendChild(newDiscDivEdit)
    newDivEdit.appendChild(newPriceDivEdit)
    // newDivEdit.appendChild(newSaveDivEdit)
    // newDivEdit.appendChild(newCancelDivEdit)

    newSaveDivEdit.addEventListener("click", () =>{
        const editedObject = {
            title: newTitleDivEdit.value,
            description: newDiscDivEdit.value,
            price: newPriceDivEdit.value
        }

        newTitleDiv.textContent = newTitleDivEdit.value
        newDiscDiv.textContent = newDiscDivEdit.value
        newPriceDiv.textContent = newPriceDivEdit.value

        newDivEdit.remove()

        // console.log(editedObject)
        axios.put("https://api.vschool.io/cameronfordCapstone/todo/"+data._id,editedObject)
    })
    })
    
}

function lineThrough(title, disc, price, img, checkBox) {
    // console.log(title)
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