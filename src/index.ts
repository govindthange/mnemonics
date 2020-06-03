import { interval, fromEvent } from "rxjs";
import { map, filter, scan } from "rxjs/operators";

// https://resizeimage.net/
const propImages: string[] = ["00-saw.png", "01-seed.png", "02-snow.png", "03-sumo.png", "04-sierra.png", "05-soil.png", "06-sewage.png", "07-sack.png", "08-sofa.png", "09-soap.png", "10-tissue.png", "11-toad.png", "12-tin.png", "13-dome.png", "14-tyre.png", "15-doll.png", "16-dish.png", "17-deck.png", "18-tv.png", "19-tap.png", "20-news.png", "21-net.png", "22-nanny.png", "23-NEEM.png", "24-sonar.png", "25-nail.png", "26-snowshoe.png", "27-nuke.png", "28-knife.png", "29-nib.png", "30-maze.png", "31-mat.png", "32-mine.png", "33-mummy.png", "34-hammer.png", "35-mail.png", "36-match.png", "37-mug.png", "38-movie.png", "39-mop.png", "40-rice.png", "41-rod.png", "42-rain.png", "43-ram.png", "44-rar.png", "45-rail.png", "no-image.png", "47-rake.png", "48-roof.png", "49-rope.png", "50-lace.png", "51-led.png", "52-lane.png", "no-image.png", "54-lorry.png", "55-lily.png", "56-leash.png", "57-lock.png", "58-leaf.png", "59-lab.png", "60-juice.png", "61-jet.png", "62-genie.png", "63-gem.png", "64-jar.png", "65-jail.png", "66-judge.png", "67-jack.png", "68-chef.png", "69-jeep.png", "70-gas.png", "71-kite.png", "72-gun.png", "73-cam.png", "74-car.png", "75-coil.png", "76-cash.png", "77-cake.png", "78-cuff.png", "79-cup.png", "80-vace.png", "81-video.png", "82-fan.png", "83-foam.png", "84-fire.png", "85-foil.png", "86-fish.png", "87-fog.png", "88-fifa.png", "89-vip.png", "90-bus.png", "91-bed.png", "92-bin.png", "93-palm.png", "94-bar.png", "95-bell.png", "96-pouch.png", "97-bike.png", "98-buffet.png", "99-pipe.png"];
const propLabels: string[] = ["SAW","SEED","SNOWMAN","SUMO","SIERRframe","SOIL","SEWAGE pipe","SACK","SOFA","SOAP","TISSUE","TOAD","TIN","DOME","TYRE","DOLL","DISH","DECK","TV","TAP","NEWS","NET","NANNY","NEEM","SONAR sensor","NAIL","SNOWSHOE","NUKE","KNIFE","NIB","MAZE","MAT","MINE","MUMMY","HAMMER","MAIL","MATCH","MUG","MOVIE","MOP","RICE","ROD","RAIN","RAM","RAR","RAIL", "RIDGE", "RAKE","ROOF","ROPE","LACE","LED","LANE", "LOOM", "LORRY","LILY","LEASH","LOCK","LEAF","LAB","JUICE","JET","GENIE","GEM","JAR","JAIL","JUDGE","JACK","CHEF","JEEP","GAS","KITE","GUN","CAM","CAR","COIL","CASH","CAKE","CUFF","CUP","VACE","VIDEO","FAN","FOAM","FIRE","FOIL","FISH","FOGG deodorant spray","FIFA","VIP pass","BUS","BED","BIN","PALM","BAR","BELL","POUCH","BIKE","BUFFET","PIPE"];

const conditionImages: string[] = ["0-scratched.png", "1-tarred.png", "2-nailed.png", "3-muddied.png", "4-rusted.png", "5-labelled.png", "6-jagged.png", "7-glitter.png", "8-firedup.png", "9-papered.png"];
const conditionLabels: string[] = [", with a SCRATCHED surface revealing its inside ", ", covered with TAR in ", ", sealed using NAILS in ", ", in a MUDDIED ", ", RUSTED in ", ", LABELLED in ", ", with JAGGED sharp corners & edges painted in", ", decorated in GLITTERING ", ", emitting FLAMES in ", ", all PAPERED in "];

// https://www.spycolor.com/color-index,g
const colorCodes: string[] = ["#f0f0f1", "#00f5ff", "#000080", "magenta", "red", "#ccff00", "#4f0013", "#ffd700", "white", "black"];
const colorLabels: string[] = ["SILVER color, somewhere ", "TURQUOISE color, somewhere ", "NAVY-blue color, somewhere ", "MAROON color, somewhere ", "RED color, somewhere ", "LEMON color, somewhere ", "CHOCOLATY color, somewhere ", "GOLD color, somewhere ", "WHITE color, somewhere ", "BLACK color, somewhere "];

const locationImages: string[] = ["0-city.png", "1-desert.png", "2-north-pole.png", "3-mountain.png", "4-river.png", "5-lake.png", "6-jungle.png", "7-coast.png", "8-waterfall.png", "9-party.png"];
const locationLabels: string[] = ["within the CITY-center", "within a DESERT", "at the NORTH POLE", "within MOUNTAINS", "along side the RIVER", "by the LAKE", "in the JUNGLE", "at the COAST", "near the WATERFALL", "at the PARTY DESTINATION"];
const weatherImages: string[] = ["0-snowfall.png", "1-dust.png", "2-normal2.png", "3-moist.png", "4-rain.png", "5-lightning.png", "6-chilling-air.png", "7-cloud.png", "8-fog.png", "9-pollution.png"];
const weatherLabels: string[] = [" while SNOWFALL"," in DUSTY weather"," in NORMAL weather"," in MOIST and humid weather"," under RAIN"," in heavy thunder LIGTNING"," in CHILLING weather"," under CLEAR SKY"," in FOGGY weather conditions"," POLLUTED by heavy traffic"];
const timeColorCodes: string[] = ["black", "#191D30", "#93ABB5", "#87ceeb", "#d7e8fd", "#D4FFF7", "#FEFFD4", "#d7e8fd", "#455270", "#2C3342"];
const timeImages: string[] = ["0-12am-midnight.png", "1-3am-latenight.png", "2-6am-dawn.png", "3-8am-morning.png", "4-10am-sunny-morning.png", "5-12pm-noon.png", "6-3pm-noon.png", "7-6pm-evening.png", "8-8pm-late-evening.png", "9-10pm-moonlight-dinner.png"];
const timeLabels: string[] = [" at MIDNIGHT"," at LATE NIGHT around 3:40am"," at DAWN around 6am"," during MORNING around 8am"," in the bright DAY LIGHT around 10am"," at NOON"," at AFTERNOON around 3pm"," at EVENING 6pm"," at LATE EVENING around 8pm"," at NIGHT 10pm"];
const clockLabels: string[] = ["12:00 AM","3:40 AM","06:00 AM","08:00 AM","10:00 AM","12:00 PM","03:00 PM","06:00 PM","08:00 PM","10:00 PM"];
const soundLabels: string[] = [" in a total SILENCE.", " with a dull THUD sound.", " with the sound of people approaching closer.", " while listening to someone MOANING IN PAIN.", " while listening to heavy RAIN DROPS.", " [no sound text] ", " while listening to hushing SHH... sound of the wind.", " when a GONG was heard.", " while listening to a VIOLIN.", " while listening to a PIANO."];

const calamityImages: string[] = ["0-tsunami.png", "1-draught.png", "2-nuclear-war.png", "3-mob-lynching.png", "4-earthquake.png", "5-landslide.png", "6-jungle-fire.png", "7-comet.png", "8-volcano.png", "9-bomb.png"];

const planetImages: string[] = ["0-sun.png", "1-mercury.png", "2-venus.png", "3-earth.png", "4-mars.png", "5-jupiter.png", "6-saturn.png", "7-neptune.png", "8-uranus.png", "9-pluto.png"];

const roles: string[] = ["SUPERHEROES", "TYCOONS", "ANIMALS", "The senior manager ", "RELATIVES", "LEADERS", "CHACHA", "COLLEAGUES", "WORSHIP (god)", "BIRDS"];
const roleLabels: string[] = ["The POWERFUL ", "The business TYCOON Mr. ", "The wild ", "The senior MANAGER Mr. ", "My close RELATIVE Mr. ", "The nation LEADER Mr. ", "The CHACHA dancer ", "My helping COLLEAGUE ", "The most WORSHIPED almighty ", "A small BIRD "];

const actors: string[][] = [
                        ["SUPERMAN", "THOR", "ANTMAN", "captain MARVEL", "IRONMAN", "HULK", "JAMES bond", "CAPTAIN america", "WONDERWOMAN", "BATMAN"],
                        ["SANJAY leela bhansali (films)", "DONALD TRUMP - BUSINESS", "NARAYAN murthi (software services)", "MUKESH ambani (business)", "RATAN tata (industrialist)", "LAKHANI", "?", "EKTA kapoor (tv)", "VIJAY mallya (liquor king)", "BILL gates (software)"],
                        ["ZEBRA", "DEER", "NEWT", "MONKEY", "RHINO", "LION", "GIRAFFE", "KANGAROO", "FOX", "BEAR (grizzly)"],
                        ["SHRIRAM", "TODD", "NIRMAL", "AMIT", "RYAN", "ALESSANDRO", "AJIT", "CHRIS", "VIKAS", "PRASAD"],
                        ["SAUTADEKAR", "THANGE", "NARAWADE", "MOHITE", "R?", "LOKHANDE", "SHELKE", "GUJAL", "WALKE", "BAHIRAT patil"],
                        ["XI-jinping", "DONALD-trump", "NARENDRA-modi", "MAHATMA-gandhi", "RAHUL-gandhi", "LAL-bahadur-shastri", "JAWAHARLAL-nehru", "KIM-jong-un", "FAROOQ-abdullah", "BARAK-obama"],
                        ["SALMAN", "Tiger shroff", "NANA patekar", "MJ", "HRITIK", "HELEN", "SHAHID kapoor", "GOVINDA", "VARUN dhawan", "PRABHU deva"],
                        ["SHREEYASH", "THOMAS", "ANIL", "MANISH", "ARUN", "ALI", "CHANDRA", "GANESH", "AVINASH", "BASAV"],
                        ["SAI baba", "TIRUPATI BALAJI", "NATRAJ", "MARUTI", "RAM", "LAXMI", "CHAMUNDA", "GANESHA", "VISHNU", "BHRAMMA"],
                        ["OSTRICH", "DUCK", "NIGHTINGALE", "HUMMINGBIRD", "ROBIN (eurpean)", "LARK", "CHICKEN", "KINGFISHER", "FLAMINGO", "PEACOCK"]
                    ];
    const actorImages: string[][] = [
                        [],
                        [],
                        ["/2-animals/0-zebra.png", "/2-animals/1-deer.png", "/2-animals/2-newt.png", "/2-animals/3-monkey.png", "/2-animals/4-rhino.png", "/2-animals/5-lion.png", "/2-animals/6-giraffe.png", "/2-animals/7-kangaroo.png", "/2-animals/8-fox.png", "/2-animals/9-bear-grizzly.png" ],
                        [],
                        [],
                        ["/5-leaders/0-xi-jinping.png", "/5-leaders/1-donald-trump.png", "/5-leaders/2-narendra-modi.png", "/5-leaders/3-mahatma-gandhi.png", "/5-leaders/4-rahul-gandhi.png", "/5-leaders/5-lal-bahadur-shastri.png", "/5-leaders/6-jawaharlal-nehru.png", "/5-leaders/7-kim-jong-un.png", "/5-leaders/8-farooq-abdullah.png", "/5-leaders/9-barak-obama.png"],
                        [],
                        [],
                        [],
                        ["/9-birds/0-ostrich.png", "/9-birds/1-duck.png", "/9-birds/2-nightingale.png", "/9-birds/3-hummingbird.png", "/9-birds/4-robin-eurpean.png", "/9-birds/5-lark.png", "/9-birds/6-chicken.png", "/9-birds/7-kingfisher.png", "/9-birds/8-flamingo.png", "/9-birds/9-peacock.png"]
                    ];

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
const ROLE_PLACE = 100000000; // 9th digit from right
const CHARACTER_PLACE = 1000000000; // 8th digit from right
// Picture the actor's injury (Next 2 digits)
const ORGAN_PLACE = 10000000000; // 11th digit from right
const INJURY_PLACE = 100000000000; // 12th digit from right
const FEELINGS_PLACE = 1000000000000; // 13th digit from right

/*
* 4. Setup the PALACE to map next 2 digits
*/
// Picture the memory palace and its stations (Next 2 digits)
const LOCI_PLACE = 10000000000000; // 14th digit from right
const STATION_PLACE = 100000000000000; // 15th digit from right


const CALAMITY_PLACE = 1000000000000000; // 16th digit from right

/*
* 5. Setup the PLANET to map next 2 digits
*/
const PLANET_PLACE = 10000000000000000; // 17th digit from right

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
    let actorInjuryIdx = getPegIndex(n, INJURY_PLACE, 1);
    let actorFeelingsIdx = getPegIndex(n, FEELINGS_PLACE, 1);
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
                imagePath: "./images/objects/"
            },
            condition: {
                n: propConditionIdx,
                label: conditionLabels[propConditionIdx],
                image: conditionImages[propConditionIdx],
                imagePath: "./images/object-conditions/"
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
                label: locationLabels[siteLocationIdx],
                image: locationImages[siteLocationIdx],
                imagePath: "./images/sites/"
            },
            weather: {
                n: siteWeatherIdx,
                label: weatherLabels[siteWeatherIdx],
                image: weatherImages[siteWeatherIdx],
                imagePath: "./images/weather/"
            },
            time: {
                n: siteTimeIdx,
                label: timeLabels[siteTimeIdx],
                clock: clockLabels[siteTimeIdx],
                image: timeImages[siteTimeIdx],
                imagePath: "./images/time/",
                color: timeColorCodes[siteTimeIdx]
            },
            sound: {
                n: siteSoundIdx,
                label: soundLabels[siteSoundIdx]
            }
        },
        actor: {
            role: {
                n: actorRoleIdx,
                label: roleLabels[actorRoleIdx]
            },
            character: {
                n: actorCharacterIdx,
                label: actors[actorRoleIdx][actorCharacterIdx],
                image: actorImages[actorRoleIdx][actorCharacterIdx],
                imagePath: "./images/actors"
            },
            organ: {
                
            },
            injury: {
                
            },
            feelings: {
                
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
            imagePath: "./images/calamities/"
        },
        planet: {
            n: planetIdx,
            image: planetImages[planetIdx],
            imagePath: "./images/planets/"
        }
    };
}

let tagText = (obj: any) => {

    if (!obj.label) return " [ No label defined ] ";

    let text: string = obj.label.replace(/(\b[A-Z][A-Z]+|\b[A-Z]\b)/g, ` <span class="keyword">$&<span class="keyword-tag">${obj.n}</span></span> `);
    return text;
}

let renderLabels= (scene: any, labelId: string) => {
    console.log("Rendering label for Scene %o", scene);

    let text = tagText(scene.prop.object)
                + tagText(scene.prop.condition)
                + tagText(scene.prop.color)
                + tagText(scene.site.location)
                + tagText(scene.site.weather)
                + tagText(scene.site.time)
                + tagText(scene.site.sound)
                + tagText(scene.actor.role)
                + " "
                + tagText(scene.actor.character)
                + " enters the scene. ";
    
    let label: any = document.getElementById(labelId);
    if (label) label.innerHTML = "Picture a " + text;
}

let renderSite = (scene: any, suffix: string, path: string) => {

    let site: any = document.getElementById("site" + suffix);
    if (site) site.style.backgroundColor = scene.site.time.color;

    let location: any = document.getElementById("location" + suffix);
    if (location) location.src = scene.site.location.imagePath + path + scene.site.location.image;

    let weather: any = document.getElementById("weather" + suffix);
    if (weather) weather.src = scene.site.weather.imagePath + scene.site.weather.image;

    let time: any = document.getElementById("time" + suffix);
    if (time) time.src = scene.site.time.imagePath + scene.site.time.image;

    let clock: any = document.getElementById("clock" + suffix);
    if (clock) clock.innerHTML = scene.site.time.clock;
}

let renderScene = (scene: any) => {
    console.log("Rendering Scene %o", scene);

    let obj: any = document.getElementById("object");
    if (obj) obj.src = scene.prop.object.imagePath + scene.prop.object.image;

    let condition: any = document.getElementById("condition");
    if (condition) {
        condition.src = scene.prop.condition.imagePath + scene.prop.condition.image;
    }

    let color: any = document.getElementById("color");
    if (color) color.style.backgroundColor = scene.prop.color.color;

    renderSite(scene, "", "clip-art/");
    renderSite(scene, "Real", "real/");

    let role: any = document.getElementById("role");
    if (role) role.innerHTML = scene.actor.role;

    let character: any = document.getElementById("character");
    if (character) character.src = scene.actor.character.imagePath + scene.actor.character.image;

    let characterLabel: any = document.getElementById("characterLabel");
    if (characterLabel) characterLabel.text = scene.actor.character;

    let calamity: any = document.getElementById("calamity");
    if (calamity) calamity.src = scene.calamity.imagePath + scene.calamity.image;

    let planet: any = document.getElementById("planet");
    if (planet) planet.src = scene.planet.imagePath + scene.planet.image;
}

let processNumber = (n: any) => {

    console.log(`Memory mapping ${n}!`);

    let reverseElement: any = document.getElementById("leftToRightCheckbox");
    let shouldReverse = reverseElement.checked;
    let scene;

    if (shouldReverse) {
        let arr = n.toString().split('').reverse();
        if (arr.length >= 2) {
            let temp = arr[arr.length-1];
            arr[arr.length-1] = arr[arr.length-2];
            arr[arr.length-2] = temp;

            let reverseN = parseInt(arr.join(''));
            scene = numberToScene(reverseN);
        }
        else {
            scene = numberToScene(n);
        }
    }
    else {
        scene = numberToScene(n);
    }
    renderLabels(scene, "label");
    renderScene(scene);
}

// .replace(/[sz]|ce|tio/gi,0).replace(/[td]/gi,1).replace(/[n]/gi,2).replace(/[m]/gi, 3).replace(/[r]/gi,4).replace(/[l]/gi, 5).replace(/([j]|ch|ge)/gi, 6).replace(/[ckg]/gi, 7).replace(/[fvw]/gi,8).replace(/[pb]/gi,9).replace(/[aeiouy]/gi,"");

const node = document.querySelector('input[type=number]');
const input$ = fromEvent(node, 'input')
                    .pipe(map((evt: any) => evt.target.value));


let checkbox: any = document.getElementById("leftToRightCheckbox");
checkbox.addEventListener('change', (event: any) => {
    let numberElement: any = document.querySelector('input[type=number]');
    processNumber(numberElement.value);
  })

input$.subscribe({
    next: n => {
        processNumber(n);
    },
    error: err => console.log(`Oops... ${err}`),
    complete: () => console.log(`Complete!`),
});