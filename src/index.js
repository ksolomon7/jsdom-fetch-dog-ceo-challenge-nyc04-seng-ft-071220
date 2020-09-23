
let imgContainer= document.querySelector('#dog-image-container')
let breedList= document.querySelector('#dog-breeds')
let selectBreedType= document.querySelector('#breed-dropdown')

document.addEventListener('DOMContentLoaded', event=>{
    getIndividualDogs()
    getDogs()
})

// fetches the  dog image url and parses it so we can get the collection of image
// urls in the message key
let getIndividualDogs= ()=>{
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp=>resp.json())
    .then(dog => dog.message.forEach(dogImg=>addDogImg(dogImg)))
}

// this function appends the individual dog images(through the forEach) images to the
// stable html element
let addDogImg= (dogImg)=>{
   
    let newImg= document.createElement("img");
    newImg.src= dogImg;
    imgContainer.append(newImg)
}

// fetches the object that contains the list of all dog breeds
let getDogs=()=>{
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(resp=>resp.json())
    .then(dog=>getBreed(dog))
}

// takes the object and gets the keys from the message key which contains an
// key and value pair with dog breed(key)
let getBreed=(dog)=>{
    breed=Object.keys(dog.message);
    updateBreedList(breed)
    addingEventForDropdown();   
}

// Updates the breedList every time the eventlistener for the dropdown is selected
let updateBreedList=(breed)=>{
    removeChildren(breedList)
    // removes the li for the breeds so that they can be updated everytime
    // a letter is selected from the dropdown list
    breed.forEach(dogBreed=>addingIndividualDogs(dogBreed))   
}

let removeChildren=(breedList)=>{
    let child=breedList.lastElementChild;
    while(child){
        breedList.removeChild(child)
        child=breedList.lastElementChild
    }
}

// Since the forEach function was used for the breed object, the parameters for this
// dogBreed is the individual dog breeds
let addingIndividualDogs= (dogBreed)=>{
        breedLi= document.createElement("li")
        breedLi.id= `${dogBreed}`
        breedLi.style.cursor= "pointer"
        breedLi.innerText= dogBreed
        breedList.append(breedLi)
        breedLi.addEventListener("click", (event)=>{
            event.target.style.color= "purple"
        })    
}



let addingEventForDropdown= ()=>{
 selectBreedType.addEventListener("change", (event)=>{
        updateBreedList(breed.filter(breeds=> breeds.startsWith(event.target.value)))
})
}


// Questions
// on line 77 how is the function able to call on variables (closure? )
// also remove Children function- is there a better way to update without removing a 
// the children everytime (or is this just for faster processing.)