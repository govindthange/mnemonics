import { interval, fromEvent } from "rxjs";
import { map, filter, scan } from "rxjs/operators";

/*
* 1. Setup the PROP to map 4 digits
*/
// Picture the object (1st 2 digits)
const OBJECT_PLACE = 1;
// Picture that object's condition and the qualifying color of its condition (2nd 2 digits)
const CONDITION_PLACE = 1000;
const COLOR_PLACE = 100;

/*
* 2. Setup the THEME to map next 2 digits
*/
// Picture the site and time of the scene (3rd 2 digits)
const SITE_PLACE = 100000;
const TIME_PLACE = 10000;

/*
* 3. Setup ACTOR and its makeup to map next 4 digits
*/
// Picture the actor (Next 2 digits)
const ROLE_PLACE = 10000000;
const CHARACTER_PLACE = 1000000;
// Picture the actor's injury (Next 2 digits)
const ORGAN_PLACE = 1000000000;
const INJURY_PLACE = 100000000;

/*
* 4. Setup the LOCATION to map next 2 digits
*/
// Picture the memory palace and its stations (Next 2 digits)
const LOCI_PLACE = 100000000000;
const STATION_PLACE = 10000000000;

/*
* 5. Setup the PLANET to map next 2 digits
*/
const PLANET_PLACE = 1000000000000;

let getPegIndex = (n: number, decimalPlaceValue: number, numberOfDigitsToExtract: number) => {
    return ((n - n % decimalPlaceValue) / decimalPlaceValue) % [10, 100][numberOfDigitsToExtract-1];
}

let numberToScene = (n: number) => {
    n = n ? n : 0;
    return {
        prop: {
            object: getPegIndex(n, OBJECT_PLACE, 2),
            condition: getPegIndex(n, CONDITION_PLACE, 1),
            color: getPegIndex(n, COLOR_PLACE, 1)
        },
        theme: {
            site: getPegIndex(n, SITE_PLACE, 1),
            time: getPegIndex(n, TIME_PLACE, 1)
        },
        actor: {
            role: getPegIndex(n, ROLE_PLACE, 1),
            character: getPegIndex(n, CHARACTER_PLACE, 1),
            organ: getPegIndex(n, ORGAN_PLACE, 1),
            injury: getPegIndex(n, INJURY_PLACE, 1)
        },
        location: {
            loci: getPegIndex(n, LOCI_PLACE, 1),
            station: getPegIndex(n, STATION_PLACE, 1)
        },
        planet: getPegIndex(n, PLANET_PLACE, 1)
    };
}

let renderScene = (scene: any) => {
    console.log(scene);
}

const node = document.querySelector('input[type=number]');
const input$ = fromEvent(node, 'input')
                    .pipe(map((evt: any) => evt.target.value));

input$.subscribe({
    next: n => {
        console.log(`Memory mapping ${n}!`)
        let scene = numberToScene(n);
        renderScene(scene);
    },
    error: err => console.log(`Oops... ${err}`),
    complete: () => console.log(`Complete!`),
});