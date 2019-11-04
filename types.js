/**
 * Tells MutantObserver what conditions to observe
 * @typedef {{attributes: Boolean}}Config
 */

/**
 * Defines player location, movement and inventory
 * @typedef {{ location: Array, acceptedLocations: String[], inventory: String[]}} Player
 */

/**
 * General interactive object
 * @typedef {{ lookDescription: String, canBeTake: Boolean, canBeTakeReason?: String, canBeChop: Boolean, canBeChopReason?: String }} RegularObject
 */

/**
 * Item that can be picked up and placed in inventory
 * @typedef {{lookDescription: String, canBeTake: Boolean, canBeChop?: Boolean, canBeChopReason?: String, inventoryDesc: String, inventoryImg: String}} InventoryObject
 */

/**
 * Item that contains additional items when interacted with
 * @typedef {{lookDescription: String, canBeTake: Boolean, canBeTakeReason?: String, canBeChop: Boolean, canBeChopReason: String, contains: String, dropDescription?: String}} ContainerObject
 */

/**
 * Defines interactive objects in room Basement
 * @typedef{{items: String[], axe: InventoryObject, heater: RegularObject, chest: RegularObject, door: RegularObject  }} Basement
 */

/**
 * Defines interactive objects in room Livingroom
 * @typedef{{items: String[], table: RegularObject, drawer: RegularObject, painting: InventoryObject, piano: RegularObject  }} Livingroom
 */

/**
 * Defines interactive objects in room Library
 * @typedef{{items: String[], book: RegularObject, bookshelf: RegularObject, globe: RegularObject, typewriter: ContainerObject, picture: InventoryObject}} Library
 */

/**
 * Defines interactive objects in room Attic
 * @typedef{{items: String[], boxes: ContainerObject, figure: RegularObject, staircase: RegularObject, window: RegularObject, binder: ContainerObject, picture: InventoryObject}} Attic
 */