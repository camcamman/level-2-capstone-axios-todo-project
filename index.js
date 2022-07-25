axios.get("https://api.vschool.io/cameronfordCapstone/todo")
.then(Response => {
    for (let i = 0; i < Response.data.length; i++) {
        let data = (Response.data[i])

        const newDiv = document.createElement("div")
        const newTitleDiv = document.createElement("h1")
        const newDiscDiv = document.createElement("h1")
        const newImgDiv = document.createElement("h1")
        // newDiv.style.border = "solid blue 1px"

        newTitleDiv.textContent = data.title
        newDiscDiv.textContent = data.description
        newImgDiv.textContent = data.img

        if (data.completed) {
            newTitleDiv.style.textDecorationLine = "line-through";
            newDiscDiv.style.textDecorationLine = "line-through";
            delete newImgDiv
        }

        document.body.append(newDiv)
        newDiv.appendChild(newTitleDiv)
        newDiv.appendChild(newDiscDiv)
        newDiv.appendChild(newImgDiv)

        console.log(Response.data[i].title)
        console.log(Response.data[i].description)
        console.log(Response.data[i].img)
    }
    // console.log(Response.data)
})
.catch(console.log("you got an error!"))
