import { spreader } from "../spreader";

const itemNames = ["Sword", "Shield", "Potion"];
const inventory = [{}, { durability: 50 }, []]; // Sword empty, Shield valid, Potion empty array

const activeItems = spreader(itemNames, inventory, 0);

console.log(activeItems.name); // "Shield"
