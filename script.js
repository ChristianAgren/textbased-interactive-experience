const   inputButton = document.querySelector('button'),
        player = {
            location: "basement"
        };

/**
 * Reads users action input
 * @param {EventListener} e Listens for keypress/buttonclick
 */
function inputUserAction(e) {

    if (e.charCode === 13 || e.type === 'click') {

        let userAction = document.querySelector('input'),
            userActionInput = userAction.value,
            noSpaceString = userActionInput.replace(/\s/g, '');

        if (noSpaceString === 'instructions') {
            userActionInput += " - Showing instructions"
        }
        
        else if (noSpaceString === 'help') {
            userActionInput += " - Can't help you right now..."
        }
        
        else if (noSpaceString === 'goto') {
            userActionInput += ' - Type "goto" and where you want to go. Locations are to the right.' 
        }
        
        else if (noSpaceString === 'gotolivingroom') {
            updateLocation('living room') 
            userActionInput += ' - You went to the ' + player.location 
        }
        
        else if (noSpaceString === 'gotolibrary') {
            userActionInput += ' - You went to the library.' 
        }
        
        else if (noSpaceString === 'gotoattic') {
            userActionInput += ' - You went to the attic.' 
        }
        
        else if (noSpaceString === 'gotobasement') {
            userActionInput += ' - You went to the basement.' 
        }
        
        else {
            userActionInput = 'Invalid input'
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

function updateLocation(location) {
    player.location = location
    console.log(location);
    
}


// Eventlisteners

inputButton.addEventListener('click', inputUserAction)
window.addEventListener('keypress', inputUserAction)