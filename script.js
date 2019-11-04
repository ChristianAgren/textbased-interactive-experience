const   inputButton = document.querySelector('button'),
        getAdventureTitle = document.querySelector('.adventure-title h1'),
        listenPhaseOne = document.querySelector('.axe-desc h4'),
        listenPhaseTwo = document.querySelector('.livingroom'),
        listenPhaseThree = document.querySelector('.library'),
        listenPhaseFour = document.querySelector('.attic'),
        listenPhaseFive = document.querySelector('.picture-desc h4'),
        getActionNode = document.querySelector('.action'),
        getInventoryNode = document.querySelector('.inventory'),
        getLastPhaseGrid = document.querySelector('.last-phase-grid'),
        lastPhaseTitle = document.querySelector('.last-phase-grid h1'),
        lastPhaseBread = document.querySelector('.last-phase-grid p'),
        getChestBox = document.querySelector('.last-phase'),
        openChestEnding = document.querySelector('.opening');
        
        /**
         * @type {Config} Tells MutantObserver what conditions to observe
         */
        const config = {
            attributes: true,
        }

let     getRoomItems = document.querySelectorAll('#room-item-list li'),
        currentLocation = player.location[0];

/**
 * Returns a capitilized string
 * @param {String} string A string that is to be capitilized
 */ 
function capitilizeFirstLetter(string) {

    return string.charAt(0).toUpperCase() + string.slice(1)
    
 } 

/**
 * Returns a string without spaces
 * @param {String} string A string that needs spaces removed
 */
function removeSpaceFromString(string) {

    return string.replace(/\s/g, '').toLowerCase()

}

/** 
 * Scrolls page content when MutantObserver observes changes
 */
function listenToPhases() {
    let getWhichPhase

    if (getAdventureTitle.innerText === '[ Prologue ]') {
        getWhichPhase = document.querySelector('.phase-one')
        getWhichPhase.scrollIntoView({behavior:"smooth"})
        getAdventureTitle.innerText = '[ The Axe ]'
    }
    else if (player.location[0] === livingroom) {
        getWhichPhase = document.querySelector('.phase-two')
        getWhichPhase.scrollIntoView({behavior:"smooth"})
        getAdventureTitle.innerText = '[ The Living room ]'
    }
    else if (player.location[0] === library){
        getWhichPhase = document.querySelector('.phase-three')
        getWhichPhase.scrollIntoView({behavior:"smooth"})
        getAdventureTitle.innerText = '[ The Library ]'       
    }
    else if (player.location[0] === attic) {
        getWhichPhase = document.querySelector('.phase-four')
        getWhichPhase.scrollIntoView({behavior:"smooth"})
        getAdventureTitle.innerText = '[ The Attic ]'
    }
    else if (player.location[0] === basement) {
        getWhichPhase = document.querySelector('.phase-five')
        getWhichPhase.scrollIntoView({behavior:"smooth"})
        getAdventureTitle.innerText = '[ The Basement ]'
    }
}
    
/** 
 * Updates the "found items:" interface
 * @param {String} newItem Item that player took from room
 */
function updateFoundItemsInterface(newItem) {

    const   buildSearchImage = "."+newItem+"-img",
            buildSearchTitle = "."+newItem+"-desc h4",
            buildSearchDesc = "."+newItem+"-desc p",
            selectedImage = document.querySelector(buildSearchImage),
            selectedTitle = document.querySelector(buildSearchTitle),
            selectedDesc = document.querySelector(buildSearchDesc),
            selectedItem = currentLocation[newItem];
            
        selectedImage.style.backgroundImage = selectedItem['inventoryImg']
        selectedTitle.innerText = capitilizeFirstLetter(newItem)
        selectedTitle.style.backgroundColor = "var(--secondary-color)"

        selectedDesc.innerText = selectedItem['inventoryDesc']
        selectedDesc.style.backgroundColor = "var(--secondary-color)"
            
}

/** 
 * Places item in player inventory
 * @param {String} newItem Item that player took from room
 */
function buildInventory(newItem) {
    player.inventory.push(newItem)  
    updateFoundItemsInterface(newItem)
}
    
/**
 * Loads items into the interface when called
 * @param {Number} itemNameIndex Index of item in array
 * @param {Array} itemArray Item array of current location
 * @param {String} itemString String of inputed item
 * @param {Boolean} shouldBuildInventory Checks if item should be placed in inventory
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

/**
 * Function for managing element lists
 * @param {String} assignedAction   User inputs assigned action. If undefined it updates the commands list
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
                                'look *item*',
                                'take *item*',
                                'chop *item*',
                            ];
    }

    
    for (i = 0; i < getElementsList.length; i++) {
        getElementsList[i].innerText = buildElementsArray[i]
        getElementsList[i].style.backgroundColor = 'white'
    }
}

/**
 * Unlocks all rooms
 * @param {String} string string based off user's input
 */
function unlockNewLocations(string) {
    if (string === 'door') {
        player.acceptedLocations.push('basement', 'livingroom', 'library', 'attic')
        player.location.push('basement')
        updateLocationGraphic(string)    
    }
}

/**
 * Updates new location for logic
 * @param {String} location String based off user's input
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
 * Updates new location interface it based off input
 * @param {String} location String based off user's input
 */
function updateLocationGraphic(location) {
    if (location === 'door') {
        let updateAllLocations,
            updateAllgraphics = document.querySelector('.locations');

        updateAllgraphics.style.backgroundColor = 'var(--secondary-color)'

        location = 'basement'

        for (i=0; i<player.acceptedLocations.length;i++) {
            updateAllgraphics = document.querySelector('.'+player.acceptedLocations[i])
            updateAllLocations = player.acceptedLocations[i]

            updateAllgraphics.innerText = capitilizeFirstLetter(updateAllLocations)
        }
    }

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
 * Builds last phase
 */
function activateLastPhase() {
    getLastPhaseGrid.style.display = 'grid'
    lastPhaseTitle.innerText = '[ This is it! ]'
    lastPhaseBread.innerText = 'You have everything you need in order to open the chest and get the antidote'
    
    getChestBox.lastChild.previousSibling.innerHTML = 'The chest is locked with a combination lock. <br> The combination lock needs 5 letters in order to unlock. <br> <br> Type the combination in the input field in order to unlock the chest.'
    getActionNode.style.zIndex = '3'
    getInventoryNode.style.zIndex = '3'

}

/** 
 * Builds game ending
 */
function activateEnding() {
    getActionNode.style.zIndex = ''
    getInventoryNode.style.zIndex = ''
    lastPhaseTitle.innerText = '[ You did it! ]'
    lastPhaseBread.innerText = ''
    getChestBox.lastChild.previousSibling.classList.add('text-animation-fadein')
    getChestBox.lastChild.previousSibling.style.top = '55%'
    getChestBox.lastChild.previousSibling.style.opacity = '0'
    getChestBox.lastChild.previousSibling.style.fontSize = '3rem'
    getChestBox.lastChild.previousSibling.innerHTML = 'You got the antidote!'
    openChestEnding.className += ' opening-animation'
    getChestBox.className += ' last-phase-animation'
}
