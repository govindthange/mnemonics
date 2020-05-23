import { interval, fromEvent } from "rxjs";
import { map, filter, scan } from "rxjs/operators";

// https://resizeimage.net/
const propImages: string[] = ["00-saw.png", "01-seed.png", "02-snow.png", "03-sumo.png", "04-sierra.png", "05-soil.png", "06-sewage.png", "07-sack.png", "08-sofa.png", "09-soap.png", "10-tissue.png", "11-toad.png", "12-tin.png", "13-dome.png", "14-tyre.png", "15-doll.png", "16-dish.png", "17-deck.png", "18-tv.png", "19-tap.png", "20-news.png", "21-net.png", "22-nanny.png", "23-NEEM.png", "24-sonar.png", "25-nail.png", "26-snowshoe.png", "27-nuke.png", "28-knife.png", "29-nib.png", "30-maze.png", "31-mat.png", "32-mine.png", "33-mummy.png", "34-hammer.png", "35-mail.png", "36-match.png", "37-mug.png", "38-movie.png", "39-mop.png", "40-rice.png", "41-rod.png", "42-rain.png", "43-ram.png", "44-rar.png", "45-rail.png", "no-image.png", "47-rake.png", "48-roof.png", "49-rope.png", "50-lace.png", "51-led.png", "52-lane.png", "no-image.png", "54-lorry.png", "55-lily.png", "56-leash.png", "57-lock.png", "58-leaf.png", "59-lab.png", "60-juice.png", "61-jet.png", "62-genie.png", "63-gem.png", "64-jar.png", "65-jail.png", "66-judge.png", "67-jack.png", "68-chef.png", "69-jeep.png", "70-gas.png", "71-kite.png", "72-gun.png", "73-cam.png", "74-car.png", "75-coil.png", "76-cash.png", "77-cake.png", "78-cuff.png", "79-cup.png", "80-vace.png", "81-video.png", "82-fan.png", "83-foam.png", "84-fire.png", "85-foil.png", "86-fish.png", "87-fog.png", "88-fifa.png", "89-vip.png", "90-bus.png", "91-bed.png", "92-bin.png", "93-palm.png", "94-bar.png", "95-bell.png", "96-pouch.png", "97-bike.png", "98-buffet.png", "99-pipe.png"];
const propLabels: string[] = ["A SAW","A SEED","A SNOWMAN","A SUMO","A SIERRA frame","A SOIL","A SEWAGE pipe","A SACK","A SOFA","A SOAP","A TISSUE","A TOAD","A TIN","A DOME","A TYRE","A DOLL","A DISH","A DECK","A TV","A TAP","A NEWS","A NET","A NANNY","A NEEM","A SONAR sensor","A NAIL","A SNOWSHOE","A NUKE","A KNIFE","A NIB","A MAZE","A MAT","A MINE","A MUMMY","A HAMMER","A MAIL","A MATCH","A MUG","A MOVIE","A MOP","A RICE","A ROD","A RAIN","A RAM","A RAR","A RAIL", "A RIDGE", "A RAKE","A ROOF","A ROPE","A LACE","A LED","A LANE", "A LOOM", "A LORRY","A LILY","A LEASH","A LOCK","A LEAF","A LAB","A JUICE","A JET","A GENIE","A GEM","A JAR","A JAIL","A JUDGE","A JACK","A CHEF","A JEEP","A GAS","A KITE","A GUN","A CAM","A CAR","A COIL","A CASH","A CAKE","A CUFF","A CUP","A VACE","A VIDEO","A FAN","A FOAM","A FIRE","A FOIL","A FISH","A FOGG deodorant spray","A FIFA","A VIP pass","A BUS","A BED","A BIN","A PALM","A BAR","A BELL","A POUCH","A BIKE","A BUFFET","A PIPE"];

const conditionImages: string[] = ["0-scratched.png", "1-tarred.png", "2-nailed.png", "3-muddied.png", "4-rusted.png", "5-labelled.png", "6-chopped.png", "7-greased.png", "8-firedup.png", "9-papered.png"];
const conditionLabels: string[] = [", with a SCRATCHED surface revealing its inside ", ", covered with TAR in ", ", sealed using NAILS in ", ", in a MUDDIED ", ", RUSTED in ", ", LABELLED in ", ", CHOPPED to reveal its inside ", ", GREASED in ", ", emitting FLAMES in ", ", wrapped with PAPER in "];

// https://www.spycolor.com/color-index,g
const colorCodes: string[] = ["#f0f0f1", "#00f5ff", "#000080", "magenta", "red", "#ccff00", "#4f0013", "#ffd700", "white", "black"];
const colorLabels: string[] = ["SILVER color, somewhere ", "TURQUOISE color, somewhere ", "NAVY BLUE color, somewhere ", "MAROON color, somewhere ", "RED color, somewhere ", "LEMON color, somewhere ", "CHOCOLATY color, somewhere ", "GOLD color, somewhere ", "WHITE color, somewhere ", "BLACK color, somewhere "];

const locationLabels: string[] = ["within CITY", "within a DESERT", "at the NORTH POLE", "within MOUNTAINS", "along side the RIVER", "by the LAKE", "in the JUNGLE", "at the COAST", "in the VALLEY", "at the PARTY DESTINATION"];
const weatherLabels: string[] = [" while SNOWFALL"," in DUSTY weather"," in NORMAL weather"," in MOIST and humid weather"," under RAIN"," in heavy thunder LIGTNING"," in CHILLING weather"," under CLEAR SKY"," in FOGGY weather conditions"," POLLUTED by heavy traffic"];
const timeColorCodes: string[] = ["black", "#191D30", "#93ABB5", "#87ceeb", "#d7e8fd", "#D4FFF7", "#FEFFD4", "#d7e8fd", "#455270", "#2C3342"];
const timeImages: string[] = ["0-12am-midnight.png", "1-3am-latenight.png", "2-6am-dawn.png", "3-8am-morning.png", "4-10am-sunny-morning.png", "5-12pm-noon.png", "6-3pm-noon.png", "7-6pm-evening.png", "8-8pm-late-evening.png", "9-10pm-moonlight-dinner.png"];
const timeLabels: string[] = [" during MIDNIGHT"," during LATE NIGHT @ 3am"," at the DAWN around 6am"," during MORNING around 8am"," in the bright DAY LIGHT around 10am"," at NOON"," at AFTERNOON around 3pm"," during EVENING around 6pm"," during LATE EVENING around 8pm"," during NIGHT @ 10am"];
const soundLabels: string[] = [" in a total SILENCE.", " with a dull THUD sound.", " with the sound of people approaching closer.", " while listening to someone MOANING IN PAIN.", " while listening to heavy RAIN DROPS.", " [no sound text] ", " while listening to hushing SHH... sound of the wind.", " when a GONG was heard.", " while listening to a VIOLIN.", " while listening to a PIANO."];

const calamityImages: string[] = ["0-tsunami.png", "1-draught.png", "2-nuclear-war.png", "3-mob-lynching.png", "4-earthquake.png", "5-landslide.png", "6-jungle-fire.png", "7-comet.png", "8-volcano.png", "9-bomb.png"];

/*
* 1. Setup the PROP to map 4 digits
*/
// Picture the object (1st 2 digits)
const OBJECT_PLACE = 1;
// Picture that object's condition and the qualifying color of its condition (2nd 2 digits)
const CONDITION_PLACE = 100; // 3rd digit from right
const COLOR_PLACE = 1000; // 4th digit from right

/*
* 2. Setup the SITE to map next 3 digits
*/
// Picture the location and time of the scene (3rd 2 digits)
const LOCATION_PLACE = 10000; // 5th digit from right
const WEATHER_PLACE = 100000;
const TIME_PLACE = 1000000; // 6th digit from right
// Hear the sound
const SOUND_PLACE = 10000000; // 7th digit from right

/*
* 3. Setup ACTOR and its makeup to map next 4 digits
*/
// Picture the actor (Next 2 digits)
const ROLE_PLACE = 1000000000; // 9th digit from right
const CHARACTER_PLACE = 100000000; // 8th digit from right
// Picture the actor's injury (Next 2 digits)
const ORGAN_PLACE = 100000000000; // 11th digit from right
const INJURY_PLACE = 10000000000; // 10th digit from right

/*
* 4. Setup the PALACE to map next 2 digits
*/
// Picture the memory palace and its stations (Next 2 digits)
const LOCI_PLACE = 10000000000000; // 13th digit from right
const STATION_PLACE = 1000000000000; // 12th digit from right


const CALAMITY_PLACE = 100000000000000;

/*
* 5. Setup the PLANET to map next 2 digits
*/
const PLANET_PLACE = 1000000000000000; // 14th digit from right

let getPegIndex = (n: number, decimalPlaceValue: number, numberOfDigitsToExtract: number) => {
    return ((n - n % decimalPlaceValue) / decimalPlaceValue) % [10, 100][numberOfDigitsToExtract - 1];
}

let numberToScene = (n: number) => {
    console.log("Processing %d", n);
    n = n ? n : 0;

    let propObjectIdx = getPegIndex(n, OBJECT_PLACE, 2);
    let propConditionIdx = getPegIndex(n, CONDITION_PLACE, 1);
    let propColorIdx = getPegIndex(n, COLOR_PLACE, 1);
    let siteLocationIdx = getPegIndex(n, LOCATION_PLACE, 1);
    let siteWeatherIdx = getPegIndex(n, WEATHER_PLACE, 1);
    let siteTimeIdx = getPegIndex(n, TIME_PLACE, 1);
    let siteSoundIdx = getPegIndex(n, SOUND_PLACE, 1);
    let actorRoleIdx = getPegIndex(n, ROLE_PLACE, 1);
    let actorCharacterIdx = getPegIndex(n, CHARACTER_PLACE, 1);
    let actorOrganIdx = getPegIndex(n, ORGAN_PLACE, 1);
    let actorInjuryIdx = getPegIndex(n, INJURY_PLACE, 1)
    let palaceLociIdx = getPegIndex(n, LOCI_PLACE, 1);
    let palaceStationIdx = getPegIndex(n, STATION_PLACE, 1);
    let calamityIdx = getPegIndex(n, CALAMITY_PLACE, 1);
    let planetIdx = getPegIndex(n, PLANET_PLACE, 1);
    
    return {
        n: n,
        prop: {
            object: {
                n: propObjectIdx,
                label: propLabels[propObjectIdx],
                image: propImages[propObjectIdx],
                imagePath: "./images/objects/" + propImages[propObjectIdx]
            },
            condition: {
                n: propConditionIdx,
                label: conditionLabels[propConditionIdx],
                image: conditionImages[propConditionIdx],
                imagePath: "./images/object-conditions/" + conditionImages[propConditionIdx]
            },
            color: {
                n: propColorIdx,
                label: colorLabels[propColorIdx],
                color: colorCodes[propColorIdx]
            }
        },
        site: {
            location: {
                n: siteLocationIdx,
                label: locationLabels[siteLocationIdx]
            },
            weather: {
                n: siteWeatherIdx,
                label: weatherLabels[siteWeatherIdx]
            },
            time: {
                n: siteTimeIdx,
                label: timeLabels[siteTimeIdx],
                image: timeImages[siteTimeIdx],
                imagePath: "./images/time/" + timeImages[siteTimeIdx],
                color: timeColorCodes[siteTimeIdx]
            },
            sound: {
                n: siteSoundIdx,
                label: soundLabels[siteSoundIdx]
            }
        },
        actor: {
            role: {
                
            },
            character: {
                
            },
            organ: {
                
            },
            injury: {
                
            }
        },
        palace: {
            loci: {
                
            },
            station: {
                
            }
        },
        calamity: {
            n: calamityIdx,
            label: " [No calamity text set] ",
            image: calamityImages[calamityIdx],
            imagePath: "./images/calamities/" + calamityImages[calamityIdx]
        },
        planet: {
            
        }
    };
}

let renderLabels= (scene: any, labelId: string) => {
    console.log("Rendering label for Scene %o", scene);

    let text = scene.prop.object.label
                + scene.prop.condition.label
                + scene.prop.color.label
                + scene.site.location.label
                + scene.site.weather.label
                + scene.site.time.label
                + scene.site.sound.label;
    
    text = text.replace(/(\b[A-Z][A-Z]+|\b[A-Z]\b)/g, ' <span class="keyword">$&</span> ');
    text = text.replace('<span class="keyword">A</span>', "Picture a ");
    
    let label: any = document.getElementById(labelId);
    if (label) label.innerHTML = text;
}

let renderScene = (scene: any) => {
    console.log("Rendering Scene %o", scene);

    let obj: any = document.getElementById("object");
    if (obj) obj.src = scene.prop.object.imagePath;

    let condition: any = document.getElementById("condition");
    if (condition) {
        condition.src = scene.prop.condition.imagePath;
    }

    let color: any = document.getElementById("color");
    if (color) color.style.backgroundColor = scene.prop.color.color;

    let siteContainer: any = document.getElementById("siteContainer");
    if (siteContainer) siteContainer.style.backgroundColor = scene.site.time.color;

    let time: any = document.getElementById("time");
    if (time) time.src = scene.site.time.imagePath;

    let calamity: any = document.getElementById("calamity");
    if (calamity) calamity.src = scene.calamity.imagePath;
}

const node = document.querySelector('input[type=number]');
const input$ = fromEvent(node, 'input')
                    .pipe(map((evt: any) => evt.target.value));

input$.subscribe({
    next: n => {
        console.log(`Memory mapping ${n}!`)
        let scene = numberToScene(n);
        renderLabels(scene, "label");
        renderScene(scene);
        /*
        let reverseN = parseInt(n.toString().split('').reverse().join(''));
        let reverseScene = numberToScene(reverseN);
        renderLabels(reverseScene, "reverseLabel");
        */
    },
    error: err => console.log(`Oops... ${err}`),
    complete: () => console.log(`Complete!`),
});