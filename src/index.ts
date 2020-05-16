import { interval, fromEvent } from "rxjs";
import { map, filter, scan } from "rxjs/operators";

const propImages = ["00-saw.png", "01-seed.png", "02-snow.png", "03-sumo.png", "04-sierra.png", "05-soil.png", "06-sewage.png", "07-sack.png", "08-sofa.png", "09-soap.png", "10-tissue.png", "11-toad.png", "12-tin.png", "13-dome.png", "14-tyre.png", "15-doll.png", "16-dish.png", "17-deck.png", "18-tv.png", "19-tap.png", "20-news.png", "21-net.png", "22-nanny.png", "23-NEEM.png", "24-sonar.png", "25-nail.png", "26-snowshoe.png", "27-nuke.png", "28-knife.png", "29-nib.png", "30-maze.png", "31-mat.png", "32-mine.png", "33-mummy.png", "34-hammer.png", "35-mail.png", "36-match.png", "37-mug.png", "38-movie.png", "39-mop.png", "40-rice.png", "41-rod.png", "42-rain.png", "43-ram.png", "44-rar.png", "45-rail.png", "no-image.png", "47-rake.png", "48-roof.png", "49-rope.png", "50-lace.png", "51-led.png", "52-lane.png", "no-image.png", "54-lorry.png", "55-lily.png", "56-leash.png", "57-lock.png", "58-leaf.png", "59-lab.png", "60-juice.png", "61-jet.png", "62-genie.png", "63-gem.png", "64-jar.png", "65-jail.png", "66-judge.png", "67-jack.png", "68-chef.png", "69-jeep.png", "70-gas.png", "71-kite.png", "72-gun.png", "73-cam.png", "74-car.png", "75-coil.png", "76-cash.png", "77-cake.png", "78-cuff.png", "79-cup.png", "80-vace.png", "81-video.png", "82-fan.png", "83-foam.png", "84-fire.png", "85-foil.png", "86-fish.png", "87-fog.png", "88-fifa.png", "89-vip.png", "90-bus.png", "91-bed.png", "92-bin.png", "93-palm.png", "94-bar.png", "95-bell.png", "96-pouch.png", "97-bike.png", "98-buffet.png", "99-pipe.png"];
const conditionImages = [];
const colorCodes = ["#87ceeb", "#00f5ff", "neon", "maroon", "red", "#ccff00", "#36454f", "green", "white", "black"];


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

    let obj: any = document.getElementById("object");
    if (obj) obj.src = "./images/objects/" + propImages[scene.prop.object];

    let color: any = document.getElementById("color");
    if (color) color.style.backgroundColor = colorCodes[scene.prop.color];
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