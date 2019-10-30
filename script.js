const   inputButton = document.querySelector('button'),
        player = {
            location: "basement",
            acceptedLocations: ['attic', 'library', 'livingroom', 'basement']
        };

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

        if (noSpaceString === 'instructions') {
            userActionInput += " - Showing instructions"
        }
        
        else if (noSpaceString === 'help') {
            userActionInput += " - Can't help you right now..."
        }
        
        else if (checkFirstFourLetters === 'goto') {
            if (noSpaceString.length === 4) {
                userActionInput += ' - Type "goto" and where you want to go. Locations are to the right.' 
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
                    updateLocation(checkStringEnding) 
                    userActionInput += ' - You went to the ' + player.location 
                }
                else {
                    userActionInput += " - That's not a location..."
                }
            }
        }
        
        else {
            userActionInput = 'Invalid input'
        }
        
        userAction.value = ""
        
        userAction.focus()
        updateListElements(userActionInput)
    }
}

function movePlayerLocation(noSpaceString, checkFirstFourLetters) {
    return userinput
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
 * Manages player location and updates it based on input
 * @param {string} location 
 */
function updateLocation(location) {
    const   oldLocation = document.querySelector('.'+player.location),
            newLocation = document.querySelector('.'+location);

    oldLocation.innerText = capitilizeFirstLetter(player.location)
    oldLocation.style.backgroundColor = ''
    oldLocation.style.color = ''
    
    newLocation.innerText = capitilizeFirstLetter(location) + ' - You are here'
    newLocation.style.backgroundColor = '#111112E5'
    newLocation.style.color = 'var(--secondary-color)'
    
    player.location = location
    
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