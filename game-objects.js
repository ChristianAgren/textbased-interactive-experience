/**
 * @type {Basement} Defines interactive objects in room Basement
    */
const basement = {
    items: ['axe', 'heater', 'chest', 'door'],
    axe: {
        lookDescription: "Maybe this could help me get out, or maybe even into that chest?",
        canBeTake: true,
        inventoryDesc: "Well weighted, ready to strike",
        inventoryImg: "url('./res/axe.svg')"
    },
    heater: {
        lookDescription: "If this was on it might've been a little warmer in here...",
        canBeTake: false,
        canBeTakeReason: "...It's bolted to the ground",
        canBeChop: false,
        canBeChopReason: "...It might blow up, don't want that"
    },
    chest: {
        lookDescription: "This looks VERY important... but it's locked. Maybe I can get into it later" ,
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
    
}

/**
 * @type {Livingroom} Defines interactive objects in room Livingroom
    */
const livingroom = {
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
        lookDescription: "Of an old woman. She looks... happy? And what is that inscription?",
        canBeTake: true,
        inventoryDesc: "There's an incription here, 'Ali'. I wonder who she is...",
        canBeChop: false,
        canBeChopReason: "Maybe I should try something else here...",
        inventoryImg: "url('./res/painting.svg')"
    },
    piano: {
        lookDescription: "I can play music when I'm out of this mess",
        canBeTake: false,
        canBeTakeReason: "Yeah... carrying around a piano. Makes sense...",
        canBeChop: false,
        canBeChopReason: "That wouldn't be fair to the piano"
    },
}

/**
 * @type {Library} Defines interactive objects in room Library
    */
const library = {
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
        canBeTake: false,
        canBeTakeReason: "Maybe I should try something else...",
        canBeChop: false,
        canBeChopReason: "It feels like I should be trying something else",
        contains: "paper",
        dropDescription: "This paper catches my eye..."
    },
    paper: {
        lookDescription: "There's a single letter printed on the paper, how odd...",
        canBeTake: true,
        canBeChop: false,
        inventoryDesc: "There's a single letter printed on the paper, 'V'",
        inventoryImg: "url('./res/paper.svg')",
    },
    
}

/**
 * @type {Attic} Defines interactive objects in room Attic
    */
const attic = {
    items: ['boxes', 'figure', 'staircase', 'window'],
    boxes: {
        lookDescription: "Boxes. Just boxes everywhere. Dusty old boxes",
        canBeTake: false,
        canBeTakeReason: "They're far too heavy",
        canBeChop: true,
        contains: "binder",
        canBeChopReason: "An binder fell out! ...and a lot of dust"
    },
    figure: {
        lookDescription: "Is that... is that a person?",
        canBeTake: false,
        canBeChop: true,
        canBeChopReason: "Oh, just a clothes rack with an old jacket hanging on it. How silly."
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
    binder: {
        lookDescription: "There's a single picture in this binder",
        canBeTake: false,
        canBeChop: false,
        canBeChopReason: "I wonder if I should chop it...? Maybe not",
        contains: "picture",
        dropDescription: "This picture is interesting",
    },
    picture: {
        lookDescription: "The picture is just black, but there's an inscription here",
        canBeTake: true,
        canBeChop: false,
        inventoryDesc: "The picture has the inscription 'E'",
        inventoryImg: "url('./res/picture.svg')"               
    }
}

/**
 * @type {Player} Defines player location, movement and inventory
    */
   const player = {
    location: [basement],
    acceptedLocations: [],
    inventory: []
}
