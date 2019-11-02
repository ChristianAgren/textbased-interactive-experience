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
                canBeTakeReason: "...It's bolted to the ground",
                canBeChop: false,
                canBeChopReason: "...It might blow up, don't want that"
            },
            chest: {
                lookDescription: "This looks VERY important... but it's locked. Go figure" ,
                canBeTake: false,
                canBeTakeReason: "Good idea, but it's far too heavy",
                canBeChop: false,
                canBeChopReason: "I get a feeling I shouldn't do that, don't want to damage anything important"

            },
            door: {
                lookDescription: "It's locked... I wonder if something here could help me...",
                canBeTake: false,
                canBeTakeReason: "It's not really possible, the door is pretty sturdy",
                canBeChop: true,
                canBeChopReason: "That felt good, looks like there's a way out from this room"
            }
            
        },
        livingroom = {
            items: ['table', 'drawer', 'painting', 'piano'],
            table: {
                lookDescription: "An empty table, not of much use",
                canBeTake: false,
                canBeTakeReason: "Well maybe I could, but i'm not sure I should...",
                canBeChop: false,
            },
            drawer: {
                lookDescription: "Looks like a rugged old drawer...",
                canBeTake: false,
                canBeChop: false,
            },
            painting: {
                lookDescription: "Of an old woman. She looks... happy? Does she want me to come closer?",
                canBeTake: true,
                inventoryDesc: "painting 1234",
                canBeChop: false,
                canBeChopReason: "Maybe I should try something else here..."
            },
            piano: {
                lookDescription: "I can play music when I'm out of this mess",
                canBeTake: false,
                canBeTakeReason: "Yeah... carrying around a piano. Makes sense...",
                canBeChop: false,
                canBeChopReason: "That wouldn't be fair to the piano"
            },
        },
        library = {
            items: ['book', 'bookshelf', 'globe', 'typewriter'],
            book: {
                lookDescription: "An open book, lying on a table. Don't have time for reading...",
                canBeTake: false,
                canBeChop: false,
                canBeChopReason: "I don't hate reading... that much"
            },
            bookshelf: {
                lookDescription: "So many books, where would I start?",
                canBeTake: false,
                canBeTakeReason: "Can't really go around with a bookshelf on my back...",
                canBeChop: false,
            },
            globe: {
                lookDescription: "A globe of the world. Seems like it's round after all!",
                canBeTake: false,
                canBeChop: false,
            },
            typewriter: {
                lookDescription: "Someone's been writing something here, a paper is stuck in the mechanism",
                canBeTake: true,
                inventoryDesc: "paper asdf",
                canBeChop: false,
                canBeChopReason: "It feels like I should be trying something else"
            },
            
        },
        attic = {
            items: ['boxes', 'binder', 'staircase', 'window'],
            boxes: {
                lookDescription: "Boxes. Just boxes everywhere. Dusty old boxes",
                canBeTake: false,
                canBeChop: true,
                canBeChopReason: "Doesn't look like there's anything here. And now the air is filled with dust..."
            },
            binder: {
                lookDescription: "There's a binder here, but it's not dusty like everything else",
                canBeTake: true,
                inventoryDesc: "picture qwert",
                canBeChop: false,
                canBeChopReason: "I wonder if I should chop it...? Maybe not"

            },
            staircase: {
                lookDescription: "Where I just came from. If it wasn't as creaky as it is, I would leave happily",
                canBeTake: false,
                canBeChop: false,
                canBeChopReason: "I need to be able to get back down somehow..."
            },
            window: {
                lookDescription: "A broken window. I should probably stay away from the glass shards",
                canBeTake: false,
                canBeChop: false,
                canBeChopReason: "Looks pretty beat up as is..."
            },

        },
        player = {
            location: [ basement, 'basement'],
            acceptedLocations: ['attic', 'library', 'livingroom', 'basement'],
            inventory: []
        };

let     getRoomItems = document.querySelectorAll('#room-item-list li'),
        currentLocation = player.location[0];


/**Returns a capitilized string
 * @param {string} string A string that is to be capitilized
 */ 
function capitilizeFirstLetter(string) {

    return string.charAt(0).toUpperCase() + string.slice(1)
    
 } 
    
/** Updates the "found items:" interface
 * @param {string} newItem Item that player took from room
 */
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
 * @param {string} newItem Item that player took from room
 */
function buildInventory(newItem) {
    
    player.inventory.push(newItem)  
    updateFoundItemsInterface(newItem)

    console.log(player.inventory);
    

}
    
/**Loads items into the interface when called
 * @param {number} itemNameIndex Index of item in array
 * @param {array} itemArray Item array of current location
 * @param {string} itemString String of inputed item
 */
function loadItems(itemNameIndex, itemArray, itemString, shouldBuildInventory) {

    getRoomItems = document.querySelectorAll('#room-item-list li')
    currentLocation = player.location[0]

    for (i = 0; selectedLi = getRoomItems[i]; i++) {
        selectedLi.parentNode.removeChild(selectedLi);
    }

    if (itemArray != undefined) {
        let newItemArray = itemArray.splice(itemNameIndex, 1)  
        if (shouldBuildInventory === true) {
            buildInventory(itemString)
        }     
    }
                
    for (i=0 ; i < currentLocation.items.length ; i++) {
    let newLiNode = document.createElement('li')
        textNode = document.createTextNode(currentLocation.items[i])
    newLiNode.appendChild(textNode)
    document.getElementById('room-item-list').appendChild(newLiNode)
    }

}

/**Function for managing element lists
 * @param {string} assignedAction   User inputs assigned action. If undefined it updates the commands list
 */
function updateListElements(assignedAction) {
    let getElementsList,
        buildElementsArray;

    if (assignedAction != undefined) {
        getElementsList = document.querySelectorAll('#user-action-list li')
        buildElementsArray = []

        for (i = 0; i < getElementsList.length; i++) {
            buildElementsArray[i] = getElementsList[i].innerText
            
        }
        buildElementsArray.shift()
        buildElementsArray.push(assignedAction)  
    }
    else {
        getElementsList = document.querySelectorAll('.commands-list li')
        buildElementsArray = [  'instruction - opens instructions',
                                'move *location*',
                                'look/take *item*',
                                'help',
                                'exit',
                                'chop *item*',
                                '...',
                            ];
    }
    
    for (i = 0; i < getElementsList.length; i++) {
        getElementsList[i].innerText = buildElementsArray[i]
    }
}

/**Updates new location for logic
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

function updateCurrentLocationGraphic() {
    let newLocation,
        oldLocation = currentLocation[1];

    if (oldLocation === 'basement') {
        newLocation = livingroom
    }
    else if (oldLocation === 'livingroom') {
        newLocation = library
    }
    else if (oldLocation === 'library') {
        newLocation = attic
    }
}

/**Updates new location interface it based off input
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

/**Reads users action input and outputs accordingly
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

        else if (checkFirstFourLetters === 'look' || checkFirstFourLetters === 'take' || (checkFirstFourLetters === 'chop' && player.inventory.includes('axe'))) {
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
                    else if (checkFirstFourLetters === 'take' || checkFirstFourLetters === 'chop') {
                        if ((checkFirstFourLetters === 'take' && selectedItem['canBeTake'] === false) || (checkFirstFourLetters === 'chop' && selectedItem['canBeChop'] === false) ) {
                            if (checkFirstFourLetters === 'take' && 'canBeTakeReason' in selectedItem) {
                                userActionInput +=' - ' + selectedItem['canBeTakeReason']
                            }
                            else if (checkFirstFourLetters === 'chop' && 'canBeChopReason' in selectedItem) {
                                userActionInput +=' - ' + selectedItem['canBeChopReason']
                            }
                            else {
                                userActionInput += " - Don't see why I should..."
                            }
                        }
                        else {
                            let shouldBuildInventory = false

                            if (checkFirstFourLetters === 'take') {
                                userActionInput += ' - Took ' + checkStringEnding
                                shouldBuildInventory = true
                                if (checkStringEnding === 'axe') {
                                    updateListElements()
                                }
                            }
                            else {
                                if (checkStringEnding === 'door') {
                                    console.log('insert location logic');

                                    //updateLocationCurrentLocationGraphics()
                                    
                                }
                                userActionInput += ' - Chopped ' + checkStringEnding + ' - ' + selectedItem['canBeChopReason']
                            }
                            loadItems(itemNameIndex, currentLocation['items'], checkStringEnding, shouldBuildInventory)
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
                userActionInput += " - You're already there"
            }
            else {

                if (player.acceptedLocations.includes(checkStringEnding)) {
                    updateLocationGraphic(checkStringEnding) 
                    userActionInput += " - You went to the " + player.location[1]
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
        newCommand = false
        updateListElements(userActionInput)
    }

}


// Eventlisteners

inputButton.addEventListener('click', parseUserInput)
window.addEventListener('keypress', parseUserInput)
document.addEventListener('DOMContentLoaded', loadItems)

