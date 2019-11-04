/**
 * Reads users action input and outputs accordingly
 * @param {Event} e Listens for keypress/buttonclick
 */
function parseUserInput(e) {
    if (e.charCode === 13 || e.type === 'click') {
        let userAction = document.querySelector('input'),
            userActionInput = userAction.value,
            noSpaceString = removeSpaceFromString(userActionInput),
            checkFirstFourLetters = noSpaceString.substring(0, 4),
            checkStringEnding = noSpaceString.substring(4);
            getInstructions = document.querySelector('.instructions-grid')
            shouldBuildInventory = false

        if (getLastPhaseGrid.style.display === 'grid') {
            if (noSpaceString === 'alive') {
                userActionInput = 'It clicked!'
                activateEnding()
            }
            else {
                userActionInput += " - No, that doesn't work..."
            }
            
        }
        else {
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
                userActionInput += " - You can find the available locations to the right."
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
                            if (checkStringEnding === 'chest') {
                                if (player.inventory.length === 4) {
                                    userActionInput += " - I think I have what I need to open this chest"
                                    activateLastPhase()
                                }
                                else {
                                    userActionInput += ' - ' + selectedItem['lookDescription']
                                }
                            }
                            else if ('contains' in selectedItem) {
                                let shouldDropItem = currentLocation.items.includes(selectedItem['contains']),
                                    itemInInventory = player.inventory.includes(selectedItem['contains'])
                                
                                if (shouldDropItem === false && itemInInventory === false) {
                                    currentLocation.items.push(selectedItem['contains'])
                                    userActionInput += ' - ' + selectedItem['lookDescription']
                                    loadItems();
                                }
                                else if (itemInInventory === true) {
                                    userActionInput += ' - I already did that'
                                }
                                else {
                                    userActionInput += ' - ' + selectedItem['dropDescription']
                                }
                                
                            }
                            else {
                                userActionInput += ' - ' + selectedItem['lookDescription']
                            }
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
                                if (checkFirstFourLetters === 'take') {
                                    userActionInput += ' - Took ' + checkStringEnding
                                    shouldBuildInventory = true
                                    if (checkStringEnding === 'axe') {
                                        updateListElements()
                                    }
                                }
                                else {
                                    if (checkStringEnding === 'door') {
                                        unlockNewLocations(checkStringEnding)
                                        
                                    }
                                    else if (checkStringEnding === 'boxes') {
                                        currentLocation.items.push(selectedItem['contains'])
                                        loadItems()
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

        }
        userAction.value = ""
        userAction.focus()
        newCommand = false
        updateListElements(userActionInput)
    }
}