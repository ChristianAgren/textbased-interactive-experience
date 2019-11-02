const   inputButton = document.querySelector('button'),
        basement = {
            items: ['axe', 'heater', 'chest', 'door'],
            axe: {
                lookDescription: "Useful in a sticky situation",
                canBeTake: true,
                inventoryDesc: "An axe might come in handy"
            },
            heater: {
                lookDescription: "If this was on it might've been a little warmer in here...",
                canBeTake: false,
                canBeTakeReason: "...It's bolted to the ground"
            },
            chest: {
                lookDescription: "This looks VERY important... but it's locked. Go figure" ,
                canBeTake: false,
                canBeTakeReason: "Good idea, but it's far too heavy"

            },
            door: {
                lookDescription: "Seems locked... I wonder if something here could help me...",
                canBeTake: false,
                canBeTakeReason: "I can't take a door with me..."
            }
            
        },
        livingroom = {
            items: ['table', 'drawer', 'painting', 'ceiling'],
            table: {
                lookDescription: "An empty table, not of much use",
                canBeTake: false,
                canBeTakeReason: "Well maybe I could, but i'm not sure I should..."
            },
            drawer: {
                lookDescription: "Looks like a rugged old drawer...",
                canBeTake: false
            },
            painting: {
                lookDescription: "Of an old woman. She looks... happy? Does she want me to come closer?",
                canBeTake: true,
                inventoryDesc: "painting 1234"
            },
            couch: {
                lookDescription: "This couch has seen better days",
                canBeTake: false
            },
        },
        library = {
            items: ['book', 'bookshelf', 'globe', 'typewriter'],
            book: {
                lookDescription: "An open book, lying on a table. Don't have time for reading...",
                canBeTake: false
            },
            bookshelf: {
                lookDescription: "So many books, where would I start?",
                canBeTake: false,
                canBeTakeReason: "Can't really go around with a bookshelf on my back..."
            },
            globe: {
                lookDescription: "A globe of the world. Seems like it's round after all!",
                canBeTake: false
            },
            typewriter: {
                lookDescription: "Someone's been writing something here, a paper is stuck in the mechanism",
                canBeTake: true,
                inventoryDesc: "paper asdf"
            },
            
        },
        attic = {
            items: ['boxes', 'binder', 'staircase', 'window'],
            boxes: {
                lookDescription: "Boxes. Just boxes everywhere. Dusty old boxes",
                canBeTake: false
            },
            binder: {
                lookDescription: "There's a binder here, but it's not dusty like everything else",
                canBeTake: true,
                inventoryDesc: "picture qwert"
            },
            staircase: {
                lookDescription: "Where I just came from. If it wasn't as creaky as it is, I would leave happily",
                canBeTake: false
            },
            window: {
                lookDescription: "A broken window. I should probably stay away from the glass shards",
                canBeTake: false
            },

        },
        player = {
            location: [ basement, 'basement'],
            acceptedLocations: ['attic', 'library', 'livingroom', 'basement'],
            inventory: []
        };

let     getRoomItems = document.querySelectorAll('#room-item-list li'),
        currentLocation = player.location[0];


/**
 * Returns a capitilized string
 * @param {string} string A string that is to be capitilized
 */ 
function capitilizeFirstLetter(string) {

    return string.charAt(0).toUpperCase() + string.slice(1)
    
 } 
    
function updateFoundItemsInterface(newItem) {

    const   buildSearchTitle = "."+newItem+"-desc h4",
            buildSearchDesc = "."+newItem+"-desc p",
            selectedTitle = document.querySelector(buildSearchTitle),
            selectedDesc = document.querySelector(buildSearchDesc),
            selectedItem = currentLocation[newItem];
            
        selectedTitle.innerText = capitilizeFirstLetter(newItem)
        selectedTitle.style.backgroundColor = "var(--secondary-color)"

        selectedDesc.innerText = selectedItem['inventoryDesc']
        selectedDesc.style.backgroundColor = "var(--secondary-color)"
            
}

/** Places item in player inventory
 * 
 * @param {string} newItem Item that player took from room
 */
function buildInventory(newItem) {
    
    player.inventory.push(newItem)  
    updateFoundItemsInterface(newItem)

}
    
/**Loads items into the interface when called
 * @param {number} itemNameIndex Index of item in array
 * @param {array} itemArray Item array of current location
 */
function loadItems(itemNameIndex, itemArray, itemString) {

    getRoomItems = document.querySelectorAll('#room-item-list li')
    currentLocation = player.location[0]

    for (i = 0; selectedLi = getRoomItems[i]; i++) {
        selectedLi.parentNode.removeChild(selectedLi);
    }

    if (itemArray != undefined) {
        let newItemArray = itemArray.splice(itemNameIndex, 1)       
        buildInventory(itemString)
    }
                
    for (i=0 ; i < currentLocation.items.length ; i++) {
    let newLiNode = document.createElement('li')
        textNode = document.createTextNode(currentLocation.items[i])
    newLiNode.appendChild(textNode)
    document.getElementById('room-item-list').appendChild(newLiNode)
    }

}

/**
 * Function for managing action history
 * @param {string} assignedAction User inputs assigned action
 */
function updateListElements(assignedAction) {

    let getActionsList = document.querySelectorAll('#user-action-list li'),
        buildActionArray = []
        
    for (i = 0; i < getActionsList.length; i++) {
         buildActionArray[i] = getActionsList[i].innerText
    }
    
    buildActionArray.shift()
    buildActionArray.push(assignedAction)  
    
    for (i = 0; i < getActionsList.length; i++) {
        getActionsList[i].innerText = buildActionArray[i]
    }

}

/**
 * Updates new location for logic
 * @param {string} location String based off user's input
 */
function updateLocationLogic(location) {
    
    if (location === 'basement') {
        player.location[0] = basement
    }
    else if (location === 'livingroom') {
        player.location[0] = livingroom
    }
    else if (location === 'library') {
        player.location[0] = library
    }
    else {
        player.location[0] = attic
    }
    player.location[1] = location    
    loadItems()

}

/**
 * Updates new location interface it based on input
 * @param {string} location String based off user's input
 */
function updateLocationGraphic(location) {
    const   oldLocation = document.querySelector('.'+player.location[1]),
            newLocation = document.querySelector('.'+location);

    oldLocation.innerText = capitilizeFirstLetter(player.location[1])
    oldLocation.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
    oldLocation.style.color = 'var(--primary-color)'
    
    newLocation.innerText = capitilizeFirstLetter(location) + ' - You are here'
    newLocation.style.backgroundColor = '#111112E5'
    newLocation.style.color = 'var(--secondary-color)'

    updateLocationLogic(location)
    
}

/**
 * Reads users action input and outputs accordingly
 * @param {EventListener} e Listens for keypress/buttonclick
 */
function parseUserInput(e) {

    if (e.charCode === 13 || e.type === 'click') {

        let userAction = document.querySelector('input'),
            userActionInput = userAction.value,
            noSpaceString = userActionInput.replace(/\s/g, '').toLowerCase(),
            checkFirstFourLetters = noSpaceString.substring(0, 4),
            checkStringEnding = noSpaceString.substring(4);
            getInstructions = document.querySelector('.instructions-grid')

        if (noSpaceString === 'instructions') {
            if (getInstructions.style.display === 'grid') {
                userActionInput += " - Closing instructions..."
                getInstructions.style.display = 'none'
            }
            else {
                userActionInput += " - Showing instructions..."
                getInstructions.style.display = 'grid'
            }
        }
        
        else if (noSpaceString === 'location') {
            userActionInput += " - You can find the locations to the right."
        }
        
        else if (noSpaceString === 'help') {
            userActionInput += " - Can't help you right now..."
        }
        
        else if (noSpaceString === 'exit') {
            userActionInput += " - Thought it would be that easy, did you?"
        }

        else if (checkFirstFourLetters === 'look' || checkFirstFourLetters === 'take') {
            if (noSpaceString.length === 4) {
                userActionInput += ' - Type "' + userActionInput + '" followed by an item in the room that you want to interact with.'
            }
            else {
                let checkIfItem = false,
                    itemNameIndex
            
                for (i = 0; i < currentLocation.items.length; i++) {
                    if (checkStringEnding === currentLocation.items[i]) {
                        itemNameIndex = i
                        checkIfItem = true
                    }
                }
                if (checkIfItem) {
                    const selectedItem = currentLocation[checkStringEnding]
                    if (checkFirstFourLetters === 'look') {
                        userActionInput += ' - ' + selectedItem['lookDescription']
                    }
                    else {
                        if (selectedItem['canBeTake'] === true) {
                            userActionInput += ' - Took ' + checkStringEnding
                            
                            loadItems(itemNameIndex, currentLocation['items'], checkStringEnding)
                        }
                        else {
                            if ('canBeTakeReason' in selectedItem) {
                                userActionInput +=' - ' + selectedItem['canBeTakeReason']
                            }
                            else {
                                userActionInput += " - Don't see why I should..."
                            }
                        }
                        
                    }
                }
                
                else {
                    userActionInput += " - Can't find that item in the room..."
                }                
            }
        }
        
        else if (checkFirstFourLetters === 'move') {
            if (noSpaceString.length === 4) {
                userActionInput += ' - Type "move" and where you want to go. Locations are to the right.' 
            }
            else if (checkStringEnding === player.location[1]) {
                userActionInput += ' - You are already there'
            }
            else {
                let checkIfLocation = false

                for (i = 0; i < player.acceptedLocations.length; i++) {
                    if (checkStringEnding === player.acceptedLocations[i]) {
                        checkIfLocation = true
                    }
                }
                if (checkIfLocation) {
                    updateLocationGraphic(checkStringEnding) 
                    userActionInput += ' - You went to the ' + player.location[1]
                }
                else {
                    userActionInput += " - Invalid location..."
                }
            }
        }
        
        else {
            userActionInput += ' - Invalid input...'
        }
        
        userAction.value = ""
        
        userAction.focus()
        updateListElements(userActionInput)
    }

}


// Eventlisteners

inputButton.addEventListener('click', parseUserInput)
window.addEventListener('keypress', parseUserInput)
document.addEventListener('DOMContentLoaded', loadItems)

