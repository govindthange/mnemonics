class Store {

    // https://resizeimage.net/
    propImages: string[] = ["00-saw.png", "01-seed.png", "02-snow.png", "03-sumo.png", "04-sierra.png", "05-soil.png", "06-sewage.png", "07-sack.png", "08-sofa.png", "09-soap.png", "10-tissue.png", "11-toad.png", "12-tin.png", "13-dome.png", "14-tyre.png", "15-doll.png", "16-dish.png", "17-deck.png", "18-tv.png", "19-tap.png", "20-news.png", "21-net.png", "22-nanny.png", "23-NEEM.png", "24-sonar.png", "25-nail.png", "26-snowshoe.png", "27-nuke.png", "28-knife.png", "29-nib.png", "30-maze.png", "31-mat.png", "32-mine.png", "33-mummy.png", "34-hammer.png", "35-mail.png", "36-match.png", "37-mug.png", "38-movie.png", "39-mop.png", "40-rice.png", "41-rod.png", "42-rain.png", "43-ram.png", "44-rar.png", "45-rail.png", "no-image.png", "47-rake.png", "48-roof.png", "49-rope.png", "50-lace.png", "51-led.png", "52-lane.png", "no-image.png", "54-lorry.png", "55-lily.png", "56-leash.png", "57-lock.png", "58-leaf.png", "59-lab.png", "60-juice.png", "61-jet.png", "62-genie.png", "63-gem.png", "64-jar.png", "65-jail.png", "66-judge.png", "67-jack.png", "68-chef.png", "69-jeep.png", "70-gas.png", "71-kite.png", "72-gun.png", "73-cam.png", "74-car.png", "75-coil.png", "76-cash.png", "77-cake.png", "78-cuff.png", "79-cup.png", "80-vace.png", "81-video.png", "82-fan.png", "83-foam.png", "84-fire.png", "85-foil.png", "86-fish.png", "87-fog.png", "88-fifa.png", "89-vip.png", "90-bus.png", "91-bed.png", "92-bin.png", "93-palm.png", "94-bar.png", "95-bell.png", "96-pouch.png", "97-bike.png", "98-buffet.png", "99-pipe.png"];
    propLabels: string[] = ["SAW", "SEED", "SNOWMAN", "SUMO", "SIERRframe", "SOIL", "SEWAGE pipe", "SACK", "SOFA", "SOAP", "TISSUE", "TOAD", "TIN", "DOME", "TYRE", "DOLL", "DISH", "DECK", "TV", "TAP", "NEWS", "NET", "NANNY", "NEEM", "SONAR sensor", "NAIL", "SNOWSHOE", "NUKE", "KNIFE", "NIB", "MAZE", "MAT", "MINE", "MUMMY", "HAMMER", "MAIL", "MATCH", "MUG", "MOVIE", "MOP", "RICE", "ROD", "RAIN", "RAM", "RAR", "RAIL", "RIDGE", "RAKE", "ROOF", "ROPE", "LACE", "LED", "LANE", "LOOM", "LORRY", "LILY", "LEASH", "LOCK", "LEAF", "LAB", "JUICE", "JET", "GENIE", "GEM", "JAR", "JAIL", "JUDGE", "JACK", "CHEF", "JEEP", "GAS", "KITE", "GUN", "CAM", "CAR", "COIL", "CASH", "CAKE", "CUFF", "CUP", "VACE", "VIDEO", "FAN", "FOAM", "FIRE", "FOIL", "FISH", "FOGG deodorant spray", "FIFA", "VIP pass", "BUS", "BED", "BIN", "PALM", "BAR", "BELL", "POUCH", "BIKE", "BUFFET table ", "PIPE"];
    textureLabels: string[] = ["having SANDY texture", "having TRANSLUCENT surface", "covered in NYLON clothing", "having MOSAIC surface", "having ROCKY surface", "having LEATHERY texture", "having a JELLIFIED thin membrane ", "having GLASSY exterior", "having WOODEN surface", "having PAPERED exterior"];
    conditionImages: string[] = ["0-scratched.png", "1-tarred.png", "2-nailed.png", "3-muddied.png", "4-rusted.png", "5-labelled.png", "6-jagged.png", "7-glitter.png", "8-firedup.png", "9-papered.png"];
    conditionLabels: string[] = [" with deep SCRATCHES.", " with deep [DENTS/DAMP] body.", " very NEW, novel and neat.", " with MUDDIED parts.", " with RUSTED parts.", " being ELECTROCUTED for safety.", " with JAGGED sharp corners & edges.", , " decorated all over in GLITTERS.", " but FLAKY.", "and PUFFED out."];

    roles: string[] = ["SUPERHEROE", "TYCOON", "NATURELOVER", "MOVIESTAR", "ROCKSTAR", "LEGEND", "CHACHA", "CRICKETER", "VILLAIN", "POLITICIAN"];
    roleLabels: string[] = [" POWERFUL ", " rich TYCOON Mr. ", " wildly NATURE lover ", " famous bollowood MOVIE star Mr. ", "n international ROCK star ", " bollywood's LEGEND Mr. ", " famous Indian CHACHA dancer ", " world famous Indian CRICKETER Mr. ", " famous bolloywood VILLAIN ", "n international POLITICAL figure Mr. "];
    actors: string[][] = [
        ["SUPERMAN", "THOR", "ANTMAN", "captain MARVEL", "IRONMAN", "HULK", "JAMES bond", "CAPTAIN america", "WONDERWOMAN", "BATMAN"],
        ["SANJAY leela bhansali (films)", "DONALD TRUMP - BUSINESS", "NARAYAN murthi (software services)", "MUKESH ambani (business)", "RATAN tata (industrialist)", "LAKHANI", "?", "EKTA kapoor (tv)", "VIJAY mallya (liquor king)", "BILL gates (software)"],
        ["ZEBRA", "DEER", "NEWT", "MONKEY", "RHINO", "LION", "GIRAFFE", "KANGAROO", "FOX", "BEAR (grizzly)"],
        ["SS", "DHARMENDRA", "NANA Patekar", "MADHURI Dixit", "RANVEER Kapoor", "L", "JOHN Abrhim", "KARTRINA Kaif", "VIVEK Oberoi", "BAMAN Irani"],
        ["SHAKIRA", "TAYLOR Swift", "NICOLE Scherzinger", "MICHAEL Jackson", "ARIANA Grande", "LADY Gaga", "JENIFER Lopez", "KATY Perry", "WHITNEY Houston", "BEYONCE"],
        ["SALMAN Khan", "DEVANAND", "N", "AMITABH Bachhan", "RAJ Kapoor", "LATA Mangeshkar", "CHIMPU (Rishikapoor)", "K", "V", "P"],
        ["SHAHID Kapoor", "TIGER Shroff", "N?", "MITHUN Chakraborty", "HRITIK Roshan", "HELEN", "JACQUELINE Fernandez", "GOVINDA", "VARUN Dhawan", "PRABHU Deva"],
        ["SACHIN", "DHONI", "NAVJOT Singh Sidhu", "MOHAMMAD Azharuddin", "ROHIT Sharma", "LAXMAN", "JAVAGAL Srinath", "KAPIL", "VIRAT", "BUMRAH"],
        ["OSAMA", "DAWOOD", "NASEERUDDIN Shah", "MOGAMBO", "RANJEET", "LANGDA Tyagi", "JOKER", "GABBAR", "VIRAPPAN", "BHAIRONATH (Nagina) / BAKHTAWAR Singh"],
        ["XI Jinping", "DONALD Trump", "NARENDRA Modi", "MK Gandhi", "RAHUL Gandhi", "LALBAHADUR Shastri", "JAWAHARLAL Nehru", "KIM Jong Un", "FAROOQ Abdulla", "BARAK Obama"]
    ];
    actorImages: string[][] = [
        [],
        [],
        ["/2-animals/0-zebra.png", "/2-animals/1-deer.png", "/2-animals/2-newt.png", "/2-animals/3-monkey.png", "/2-animals/4-rhino.png", "/2-animals/5-lion.png", "/2-animals/6-giraffe.png", "/2-animals/7-kangaroo.png", "/2-animals/8-fox.png", "/2-animals/9-bear-grizzly.png"],
        [],
        [],
        ["/5-leaders/0-xi-jinping.png", "/5-leaders/1-donald-trump.png", "/5-leaders/2-narendra-modi.png", "/5-leaders/3-mahatma-gandhi.png", "/5-leaders/4-rahul-gandhi.png", "/5-leaders/5-lal-bahadur-shastri.png", "/5-leaders/6-jawaharlal-nehru.png", "/5-leaders/7-kim-jong-un.png", "/5-leaders/8-farooq-abdullah.png", "/5-leaders/9-barak-obama.png"],
        [],
        [],
        [],
        ["/9-birds/0-ostrich.png", "/9-birds/1-duck.png", "/9-birds/2-nightingale.png", "/9-birds/3-hummingbird.png", "/9-birds/4-robin-eurpean.png", "/9-birds/5-lark.png", "/9-birds/6-chicken.png", "/9-birds/7-kingfisher.png", "/9-birds/8-flamingo.png", "/9-birds/9-peacock.png"]
    ];

    actorAttireImages: string[] = ["no-image.png", "no-image.png", "no-image.png", "no-image.png", "no-image.png", "no-image.png", "no-image.png", "no-image.png", "no-image.png", "no-image.png"];
    actorAttireLabels: string[] = ["SUITE", "DHOTI Kurta", "KNICKERS & T Shirt", "MILITARY Uniform", "RAINCOAT", "LEATHER Jacket & Jeans", "JEANS & T-Shirt", "KURTA Pyjama", "FIREFIGHTER Uniform / Vest", "BATHROBE"];

    // https://www.spycolor.com/color-index,g
    actorAttireColorCodes: string[] = ["#f0f0f1", "#00f5ff", "#000080", "magenta", "red", "#ccff00", "#4f0013", "#ffd700", "white", "black"];
    actorAttireColorLabels: string[] = ["SILVER ", "TURQUOISE ", "NAVY-blue ", "MAROON ", "RED ", "LEMON ", "CHOCOLATY ", "GOLDEND ", "WHITE ", "BLACK "];

    actorAssaultLabels: string[] = ["is shot by a double barrel SHOTGUN", "is attacked by a TROOP", "is attacked by a NINJA", "is shot by a MACHINE Gun", "is shot by a REVOLVER", "falls on a ELECTROCUTED barbedwire", "is attacked by a CHOPPER", "is hit by a GRENADE", "is attacked by a FIGHTER Plane", "is attacked by a BAZOOKA"];
    actorBodyLabels: string[] = ["STOMACH", "TOES", "NECK", "MOUTH", "WRIST", "LEGS", "CHEST", "GROIN", "WAIST", "BACK"];
    actorInjuryLabels: string[] = ["SWELLING", "TRAUMA ", "NUMBED", "MAULED", "RASHES due to bacterial infection", "LIMP", "SHACKLED", "CUT", "FRACTURED", "PUNCTURED"];

    locationImages: string[] = ["0-city.png", "1-desert.png", "2-north-pole.png", "3-mountain.png", "4-river.png", "5-lake.png", "6-jungle.png", "7-coast.png", "8-waterfall.png", "9-party.png"];
    locationLabels: string[] = ["within the CITY-center", "within a DESERT", "at the NORTH POLE", "within MOUNTAINS", "along side the RIVER", "by the LAKE", "in the JUNGLE", "at the COAST", "near the WATERFALL", "at the PARTY DESTINATION"];
    weatherImages: string[] = ["0-snowfall.png", "1-dust.png", "2-normal2.png", "3-moist.png", "4-rain.png", "5-lightning.png", "6-chilling-air.png", "7-cloud.png", "8-fog.png", "9-pollution.png"];
    weatherLabels: string[] = [" while SNOWFALL", " in DUSTY weather", " in NORMAL weather", " in MOIST and humid weather", " under RAIN", " in heavy thunder LIGTNING", " in CHILLING weather", " under CLEAR SKY", " in FOGGY weather conditions", " POLLUTED by heavy traffic"];
    timeColorCodes: string[] = ["black", "#191D30", "#93ABB5", "#87ceeb", "#d7e8fd", "#D4FFF7", "#FEFFD4", "#d7e8fd", "#455270", "#2C3342"];
    timeImages: string[] = ["0-12am-midnight.png", "1-3am-latenight.png", "2-6am-dawn.png", "3-8am-morning.png", "4-10am-sunny-morning.png", "5-12pm-noon.png", "6-3pm-noon.png", "7-6pm-evening.png", "8-8pm-late-evening.png", "9-10pm-moonlight-dinner.png"];
    timeLabels: string[] = [" at MIDNIGHT", " at LATE NIGHT around 3:40am", " at DAWN around 6am", " during MORNING around 8am", " in the bright DAY LIGHT around 10am", " at NOON", " at AFTERNOON around 3pm", " at EVENING 6pm", " at LATE EVENING around 8pm", " at NIGHT 10pm"];
    clockLabels: string[] = ["12:00 AM", "3:40 AM", "06:00 AM", "08:00 AM", "10:00 AM", "12:00 PM", "03:00 PM", "06:00 PM", "08:00 PM", "10:00 PM"];
    soundLabels: string[] = [" in a total SILENCE.", " with a dull THUD sound.", " with the sound of people approaching closer.", " while listening to someone MOANING IN PAIN.", " while listening to heavy RAIN DROPS.", " [no sound text] ", " while listening to hushing SHH... sound of the wind.", " when a GONG was heard.", " while listening to a VIOLIN.", " while listening to a PIANO."];

    calamityImages: string[] = ["0-tsunami.png", "1-draught.png", "2-nuclear-war.png", "3-mob-lynching.png", "4-earthquake.png", "5-landslide.png", "6-jungle-fire.png", "7-comet.png", "8-volcano.png", "9-bomb.png"];
    planetImages: string[] = ["0-sun.png", "1-mercury.png", "2-venus.png", "3-earth.png", "4-mars.png", "5-jupiter.png", "6-saturn.png", "7-neptune.png", "8-uranus.png", "9-pluto.png"];

    birds: string[] = ["OSTRICH", "DUCK", "NIGHTINGALE", "HUMMINGBIRD", "ROBIN (eurpean)", "LARK", "CHICKEN", "KINGFISHER", "FLAMINGO", "PEACOCK"];
    birdImages: string[] = ["/9-birds/0-ostrich.png", "/9-birds/1-duck.png", "/9-birds/2-nightingale.png", "/9-birds/3-hummingbird.png", "/9-birds/4-robin-eurpean.png", "/9-birds/5-lark.png", "/9-birds/6-chicken.png", "/9-birds/7-kingfisher.png", "/9-birds/8-flamingo.png", "/9-birds/9-peacock.png"]

    public getPropImages() {
        return this.propImages;
    }
    public getPropLabels() {
        return this.propLabels;
    }
    public getTextureLabels() {
        return this.textureLabels;
    }
    public getConditionImages() {
        return this.conditionImages;
    }
    public getConditionLabels() {
        return this.conditionLabels;
    }

    public getRoles() {
        return this.roleLabels;
    }
    public getRoleLabels() {
        return this.roleLabels;
    }
    public getActors() {
        return this.actors;
    }
    public getActorImages() {
        return this.actorImages;
    }
    public getActorAttireImages() {
        return this.actorAttireImages;
    }
    public getActorAttireLabels() {
        return this.actorAttireLabels;
    }
    public getActorAttireColorCodes() {
        return this.actorAttireColorCodes;
    }
    public getActorAttireColorLabels() {
        return this.actorAttireColorLabels;
    }
    public getActorAssaultLabels() {
        return this.actorAssaultLabels;
    }
    public getActorBodyLabels() {
        return this.actorBodyLabels;
    }
    public getActorInjuryLabels() {
        return this.actorInjuryLabels;
    }

    public getLocationImages() {
        return this.locationImages;
    }
    public getLocationLabels() {
        return this.locationLabels;
    }
    public getWeatherImages() {
        return this.weatherImages;
    }
    public getWeatherLabels() {
        return this.weatherLabels;
    }
    public getTimeColorCodes() {
        return this.timeColorCodes;
    }
    public getTimeImages() {
        return this.timeImages;
    }
    public getTimeLabels() {
        return this.timeLabels;
    }
    public getClockLabels() {
        return this.clockLabels;
    }
    public getSoundLabels() {
        return this.soundLabels;
    }
    
    public getCalamityImages() {
        return this.calamityImages;
    }
    public getPlanetImages() {
        return this.planetImages;
    }
 }

 export { Store };