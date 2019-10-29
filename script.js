const inputButton = document.querySelector('button')

/**
 * Reads users action input
 * @param {EventListener} e Listens for keypress/buttonclick
 */
function inputUserAction(e) {

    if (e.charCode === 13 || e.type === 'click') {

        let userAction = document.querySelector('input'),
        userActionInput = userAction.value

        if (userActionInput === 'instructions') {
            console.log('Show help commands')
        }

        else if (userActionInput === 'help') {
            userActionInput += " - Can't help you right now..."
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

// Eventlisteners

inputButton.addEventListener('click', inputUserAction)
window.addEventListener('keypress', inputUserAction)