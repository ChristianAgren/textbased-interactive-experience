const   inputButton = document.querySelector('button'),
        basement = {
            items: ['heater', 'axe', 'chest', 'door'],
            heater: {
                description: "If this was on it might've been a little warmer in here..."
            },
            axe: {
                description: 'Useful in a sticky situation'
            },
            chest: {
                description: 'This looks VERY important'
            },
            door: {
                description: 'Seems locked... I wonder if something here could help me...'
            }
            
        },
        livingroom = {
            items: ['table', 'painting', 'drawer', 'ceiling'],
            table: {
                description: "An empty table, not of much use"
            },
            painting: {
                description: "Of an old woman. She looks... happy? Does she want me to come closer?"
            },
            drawer: {
                description: 'Looks like a rugged old drawer...'
            },
            couch: {
                description: "This couch has seen better days"
            },
        },
        library = {
            items: ['book', 'bookshelf', 'globe', 'typewriter'],
            book: {
                description: "An open book, lying on a table. Don't have time for reading..."
            },
            bookshelf: {
                description: "So many books, where would I start?"
            },
            globe: {
                description: "A globe of the world. Seems like it's round after all!"
            },
            typewriter: {
                description: "Someone's been writing something here, a paper is stuck in the mechanism"
            },

        },
        attic = {
            items: ['boxes', 'binder', 'staircase', 'window'],
            boxes: {
                description: "Boxes. Just boxes everywhere. Dusty old boxes."
            },
            binder: {
                description: "There's a binder here, but it's not dusty like everything else"
            },
            staircase: {
                description: "Where I just came from. If it wasn't as torn down as it is, I would happily leave."
            },
            window: {
                description: "A broken window. I should probably stay away from the glass shards."
            },

        },
        player = {
            location: [ basement, 'basement'],
            acceptedLocations: ['attic', 'library', 'livingroom', 'basement'],
            inventory: {
                // axe: {
                //     img: 'gonna-be-an-img-here-soon',
                //     name: 'An axe',
                //     description: 'Useful in sticky situations',
                //     isFound: false,
                // }
            }
        };

let     getRoomItems = document.querySelectorAll('#room-item-list li'),
        currentLocation = player.location[0];

/**Loads items into the interface
 * 
 */
function loadItems() {
    currentLocation = player.location[0];
    for(i=0 ; i < currentLocation.items.length ; i++) {
        getRoomItems[i].innerText = currentLocation.items[i]
    }
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

        else if (checkFirstFourLetters === 'look') {
            if (noSpaceString.length === 4) {
                userActionInput += ' - Type "look" followed by an item in the room that you want to look at.'
            }
            else {
                let checkIfItem = false
            
                for (i = 0; i < currentLocation.items.length; i++) {
                    if (checkStringEnding === currentLocation.items[i]) {
                        checkIfItem = true
                    }
                }
                if (checkIfItem) {
                    let selectedItem = currentLocation[checkStringEnding]
                    userActionInput += ' - ' + selectedItem['description']
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
            else if (checkStringEnding === player.location) {
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
    loadItems()
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
}

/**
 * Returns a capitilized string
 * @param {string} string A string that is to be capitilized
 */ 
function capitilizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1)
}



// Eventlisteners

inputButton.addEventListener('click', parseUserInput)
window.addEventListener('keypress', parseUserInput)
document.addEventListener('DOMContentLoaded', loadItems);
