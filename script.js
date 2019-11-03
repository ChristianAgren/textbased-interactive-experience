const   inputButton = document.querySelector('button'),
        getAdventureTitle = document.querySelector('.adventure-title h1'),
        listenPhaseOne = document.querySelector('.axe-desc h4'),
        listenPhaseTwo = document.querySelector('.livingroom'),
        listenPhaseThree = document.querySelector('.library'),
        listenPhaseFour = document.querySelector('.attic'),
        listenPhaseFive = document.querySelector('.binder-desc h4'),
        getLastPhase = document.querySelector('.last-phase-grid'),
        getActionNode = document.querySelector('.action'),
        getInventoryNode = document.querySelector('.inventory'),
        lastPhaseTitle = document.querySelector('.last-phase-grid h1'),
        lastPhaseBread = document.querySelector('.last-phase-grid p'),
        config = {
            attributes: true,
        },
        basement = {
            items: ['axe', 'heater', 'chest', 'door'],
            axe: {
                lookDescription: "Useful in a sticky situation",
                canBeTake: true,
                inventoryDesc: "Might come in handy",
                inventoryImg: "url('res/axe.svg')"
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
                lookDescription: "It's locked... And it's pretty sturdy",
                canBeTake: false,
                canBeTakeReason: "Well I don't know about that...",
                canBeChop: true,
                canBeChopReason: "Looks like there's a way out from this room"
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
                inventoryDesc: "There's an incription here, 'Ali'. I wonder who she is...",
                canBeChop: false,
                canBeChopReason: "Maybe I should try something else here...",
                inventoryImg: "url('res/painting.svg')"
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
                inventoryDesc: "There's a single letter typed on the paper, 'V'",
                canBeChop: false,
                canBeChopReason: "It feels like I should be trying something else",
                inventoryImg: "url('res/paper.svg')"
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
                inventoryDesc: "There was a picture in here, with the inscription 'E'",
                canBeChop: false,
                canBeChopReason: "I wonder if I should chop it...? Maybe not",
                inventoryImg: "url('res/picture.svg')"

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
            location: [ basement],
            acceptedLocations: [],
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

/**Returns a string without spaces
 * @param {string} string A string that needs spaces removed
 */
function removeSpaceFromString(string) {

    return string.replace(/\s/g, '').toLowerCase()

}

/** Scrolls page content when MutantObserver observes changes
 * 
 */
function listenToPhases() {
    let getWhichPhase

    if (getAdventureTitle.innerText === '[ Prologue ]') {
        getWhichPhase = document.querySelector('.phase-one')
        getWhichPhase.scrollIntoView({behavior:"smooth"})
        getAdventureTitle.innerText = '[ The Axe ]'
    }
    else if ((getAdventureTitle.innerText === '[ The Axe ]') && (player.location[0] === livingroom)) {
        getWhichPhase = document.querySelector('.phase-two')
        getWhichPhase.scrollIntoView({behavior:"smooth"})
        getAdventureTitle.innerText = '[ The Living room ]'
    }
    else if ((getAdventureTitle.innerText === '[ The Living room ]') && (player.location[0] === library)){
        getWhichPhase = document.querySelector('.phase-three')
        getWhichPhase.scrollIntoView({behavior:"smooth"})
        getAdventureTitle.innerText = '[ The Library ]'       
    }
    else if ((getAdventureTitle.innerText === '[ The Library ]') && (player.location[0] === attic)) {
        getWhichPhase = document.querySelector('.phase-four')
        getWhichPhase.scrollIntoView({behavior:"smooth"})
        getAdventureTitle.innerText = '[ The Attic ]'
    }
    else if ((getAdventureTitle.innerText === '[ The Attic ]') && (player.inventory.includes('binder'))) {
        getWhichPhase = document.querySelector('.phase-five')
        getWhichPhase.scrollIntoView({behavior:"smooth"})
        getAdventureTitle.innerText = '[ Almost there ]'
    }
}
    
/** Updates the "found items:" interface
 * @param {string} newItem Item that player took from room
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

function unlockNewLocations(string) {
    if (string === 'painting') {
        player.acceptedLocations.push('library')
    }
    else if (string === 'typewriter') {
        player.acceptedLocations.push('attic')
    }
    else if (string === 'door') {
        player.acceptedLocations.push('basement', 'livingroom')
        player.location.push('basement')
        console.log(player.acceptedLocations);
        
    }
}

/** Places item in player inventory
 * @param {string} newItem Item that player took from room
 */
function buildInventory(newItem) {

    player.inventory.push(newItem)  
    updateFoundItemsInterface(newItem)
    unlockNewLocations(newItem)
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

/** Updates player object with new location
 * 
 */
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

function activateLastPhase() {
    getLastPhase.style.display = 'grid'
    lastPhaseTitle.innerText = '[ This is it! ]'
    lastPhaseBread.innerText = 'You have everything you need in order to open the chest and get the antidote'
    getActionNode.style.zIndex = '3'
    getInventoryNode.style.zIndex = '3'

}

function activateEnding() {
    lastPhaseTitle.innerText = '[ You did it! ]'
    lastPhaseBread.innerText = 'You got the antidote!'
}
