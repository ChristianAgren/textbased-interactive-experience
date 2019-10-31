const   inputButton = document.querySelector('button'),
        basement = {
            items: ['drawer', 'axe', 'chest', 'door']
        },
        livingroom = {
            items: ['something', 'something', 'something', 'something']
        },
        library = {
            items: ['this', 'is', 'library', '!!']
        },
        attic = {
            items: ['this', 'be', 'the', 'attic']
        },
        player = {
            location: [ basement, 'basement'],
            acceptedLocations: ['attic', 'library', 'livingroom', 'basement'],
            inventory: {
                axe: {
                    img: 'gonna-be-an-img-here-soon',
                    name: 'An axe',
                    description: 'Useful in sticky situations',
                    isFound: false,
                }
            }
        };
let     getRoomItems = document.querySelectorAll('#room-item-list li'),
        currentLocation = player.location;

console.log(player.inventory.axe.isFound)
console.log(currentLocation[0].items.length)

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
                        console.log(checkStringEnding, player.acceptedLocations[i])
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

function loadItems() {
}



// Eventlisteners

inputButton.addEventListener('click', parseUserInput)
window.addEventListener('keypress', parseUserInput)
