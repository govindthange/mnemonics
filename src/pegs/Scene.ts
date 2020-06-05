import { Store } from "./Store";

class Scene {
    n: number;
    prop: any;
    actor: any;
    site: any;
    palace: any;
    calamity: any;
    planet: any;

    static propImages: string[];
    static propLabels: string[];
    static textureLabels: string[];
    static conditionImages: string[];
    static conditionLabels: string[];

    static roles: string[];
    static roleLabels: string[];
    static actors: string[][];
    static actorImages: string[][];
    static actorAttireImages: string[];
    static actorAttireLabels: string[];
    static actorAttireColorCodes: string[];
    static actorAttireColorLabels: string[];
    static actorAssaultLabels: string[];
    static actorBodyLabels: string[];
    static actorInjuryLabels: string[];

    static locationImages: string[];
    static locationLabels: string[];
    static weatherImages: string[];
    static weatherLabels: string[];
    static timeColorCodes: string[];
    static timeImages: string[];
    static timeLabels: string[];
    static clockLabels: string[];
    static soundLabels: string[];

    static calamityImages: string[];
    static planetImages: string[];

    constructor(n: number = 0, reverse: boolean = true) {
        this.update(n, reverse);
    }

    static init() {
        let store = new Store();

        Scene.propImages = store.getPropImages();
        Scene.propLabels = store.getPropLabels();
        Scene.textureLabels = store.getTextureLabels();
        Scene.conditionImages = store.getConditionImages();
        Scene.conditionLabels = store.getConditionLabels();

        Scene.roles = store.getRoles();
        Scene.roleLabels = store.getRoleLabels();
        Scene.actors = store.getActors();
        Scene.actorImages = store.getActorImages();
        Scene.actorAttireImages = store.getActorAttireImages();
        Scene.actorAttireLabels = store.getActorAttireLabels();
        Scene.actorAttireColorCodes = store.getActorAttireColorCodes();
        Scene.actorAttireColorLabels = store.getActorAttireColorLabels();
        Scene.actorAssaultLabels = store.getActorAssaultLabels();
        Scene.actorBodyLabels = store.getActorBodyLabels();
        Scene.actorInjuryLabels = store.getActorInjuryLabels();

        Scene.locationImages = store.getLocationImages();
        Scene.locationLabels = store.getLocationLabels();
        Scene.weatherImages = store.getWeatherImages();
        Scene.weatherLabels = store.getWeatherLabels();
        Scene.timeColorCodes = store.getTimeColorCodes();
        Scene.timeImages = store.getTimeImages();
        Scene.timeLabels = store.getTimeLabels();
        Scene.clockLabels = store.getClockLabels();
        Scene.soundLabels = store.getSoundLabels();

        Scene.calamityImages = store.getCalamityImages();
        Scene.planetImages = store.getPlanetImages();
    }

    public getPegIndex(n: number, decimalPlaceValue: number, numberOfDigitsToExtract: number): number {
        return ((n - n % decimalPlaceValue) / decimalPlaceValue) % [10, 100][numberOfDigitsToExtract - 1];
    }

    process(n: number) {
        this.n = n ? n : 0;

        let propObjectIdx = this.getPegIndex(n, Place.OBJECT, 2);
        let propTextureIdx = this.getPegIndex(n, Place.TEXTURE, 1);
        let propConditionIdx = this.getPegIndex(n, Place.CONDITION, 1);

        this.prop = {
            object: {
                n: propObjectIdx,
                label: Scene.propLabels[propObjectIdx],
                image: Scene.propImages[propObjectIdx],
                imagePath: "./images/objects/"
            },
            texture: {
                n: propTextureIdx,
                label: Scene.textureLabels[propTextureIdx],
                //image: textureImages[propObjectIdx],
                //imagePath: "./images/object-texture/"
            },
            condition: {
                n: propConditionIdx,
                label: Scene.conditionLabels[propConditionIdx],
                image: Scene.conditionImages[propConditionIdx],
                imagePath: "./images/object-conditions/"
            }
        };

        let actorRoleIdx = this.getPegIndex(n, Place.ROLE, 1);
        let actorCharacterIdx = this.getPegIndex(n, Place.CHARACTER, 1);
        let actorAttireIdx = this.getPegIndex(n, Place.ATTIRE, 1);
        let actorAttireColorIdx = this.getPegIndex(n, Place.COLOR, 1);
        let actorAssaultIdx = this.getPegIndex(n, Place.ASSAULT, 1);
        let actorBodyIdx = this.getPegIndex(n, Place.BODY, 1);
        let actorInjuryIdx = this.getPegIndex(n, Place.INJURY, 1);

        this.actor = {
            role: {
                n: actorRoleIdx,
                label: Scene.roleLabels[actorRoleIdx]
            },
            character: {
                n: actorCharacterIdx,
                label: Scene.actors[actorRoleIdx][actorCharacterIdx],
                image: Scene.actorImages[actorRoleIdx][actorCharacterIdx],
                imagePath: "./images/actors"
            },
            attire: {
                n: actorAttireIdx,
                label: Scene.actorAttireLabels[actorAttireIdx],
                image: Scene.actorAttireImages[actorAttireIdx],
                imagePath: "./images/actors/attires"
            },
            attireColor: {
                n: actorAttireColorIdx,
                label: Scene.actorAttireColorLabels[actorAttireColorIdx],
                color: Scene.actorAttireColorCodes[actorAttireColorIdx]
            },
            assault: {
                n: actorAssaultIdx,
                label: Scene.actorAssaultLabels[actorAssaultIdx]
            },
            body: {
                n: actorBodyIdx,
                label: Scene.actorBodyLabels[actorBodyIdx]
            },
            injury: {
                n: actorInjuryIdx,
                label: Scene.actorInjuryLabels[actorInjuryIdx]
            }
        };

        let siteLocationIdx = this.getPegIndex(n, Place.LOCATION, 1);
        let siteWeatherIdx = this.getPegIndex(n, Place.WEATHER, 1);
        let siteTimeIdx = this.getPegIndex(n, Place.TIME, 1);
        let siteSoundIdx = this.getPegIndex(n, Place.SOUND, 1);

        this.site = {
            location: {
                n: siteLocationIdx,
                label: Scene.locationLabels[siteLocationIdx],
                image: Scene.locationImages[siteLocationIdx],
                imagePath: "./images/sites/"
            },
            weather: {
                n: siteWeatherIdx,
                label: Scene.weatherLabels[siteWeatherIdx],
                image: Scene.weatherImages[siteWeatherIdx],
                imagePath: "./images/weather/"
            },
            time: {
                n: siteTimeIdx,
                label: Scene.timeLabels[siteTimeIdx],
                clock: Scene.clockLabels[siteTimeIdx],
                image: Scene.timeImages[siteTimeIdx],
                imagePath: "./images/time/",
                color: Scene.timeColorCodes[siteTimeIdx]
            },
            sound: {
                n: siteSoundIdx,
                label: Scene.soundLabels[siteSoundIdx]
            }
        };

        let palaceLociIdx = this.getPegIndex(n, Place.LOCI, 1);
        let palaceStationIdx = this.getPegIndex(n, Place.STATION, 1);

        this.palace = {
            loci: {

            },
            station: {

            }
        };

        let calamityIdx = this.getPegIndex(n, Place.CALAMITY, 1);
        this.calamity = {
            n: calamityIdx,
            label: " [No calamity text set] ",
            image: Scene.calamityImages[calamityIdx],
            imagePath: "./images/calamities/"
        };

        let planetIdx = this.getPegIndex(n, Place.PLANET, 1);
        this.planet = {
            n: planetIdx,
            image: Scene.planetImages[planetIdx],
            imagePath: "./images/planets/"
        };
    }

    public update(n: number, reverse: boolean) {
        if (reverse) {
            let arr = n.toString().split('').reverse();
            if (arr.length >= 2) {
                let temp = arr[arr.length - 1];
                arr[arr.length - 1] = arr[arr.length - 2];
                arr[arr.length - 2] = temp;

                let reverseN = parseInt(arr.join(''));
                this.process(reverseN);
                return this;
            }
            else {
                this.process(n);
            }
        }
        else {
            this.process(n);
        }
    }

    static encode(str: string): string {
        return str.replace(/[sz]|ce|cy|ci|tio/gi, "0")
                    .replace(/[td]/gi, "1")
                    .replace(/[n]/gi, "2")
                    .replace(/[m]/gi, "3")
                    .replace(/[r]/gi, "4")
                    .replace(/[l]/gi, "5")
                    .replace(/([j]|ch|ge)/gi, "6")
                    .replace(/[ckgqx]/gi, "7")
                    .replace(/[fvw]/gi, "8")
                    .replace(/[pb]/gi, "9")
                    .replace(/[aeiouyh]/gi, "");
    }

    public toString(): string {

        let inputLength: number = this.n.toString().length;

        let output: string = this.tagText(this.prop.object);

        if (inputLength > 2) {
            output += " "
                + this.tagText(this.prop.texture)
                + this.tagText(this.prop.condition);
        }

        if (inputLength > 4) {
            output += ". Along side a"
                + this.tagText(this.actor.role)
                + this.tagText(this.actor.character, "", true, true);
        }

        if (inputLength > 6) {
            output += " in a "
                + this.tagText(this.actor.attireColor)
                + this.tagText(this.actor.attire);
        }

        if (inputLength > 8) {
            output += " who "
                + this.tagText(this.actor.assault);
        }

        if (inputLength > 9) {
            output += " on the "
                + this.tagText(this.actor.body)
                + " "
                + this.tagText(this.actor.injury);
        }

        if (inputLength > 11) {
            output += ". S/he escapes and hides "
                + this.tagText(this.site.location)
                + this.tagText(this.site.weather)
                + this.tagText(this.site.time)
                + this.tagText(this.site.sound);
        }

        return output + ".";
    }

    tagText(obj: any, cls: any = "", format: boolean = true, sentenceCase: boolean = false) {

        if (!format) return obj.label;

        if (!obj.label) return " [ No label defined ] ";

        let capTexts: string[] = obj.label.match(/(\b[A-Z][A-Z]+|\b[A-Z]\b)/g);

        let text: string = obj.label.replace(/(\b[A-Z][A-Z]+|\b[A-Z]\b)/g, `$&<span class="number-tag">${obj.n}</span>`);

        for (let txt of capTexts) {
            let regex = new RegExp(txt, "gi");
            if (sentenceCase) {
                text = text.replace(regex, `<b>${this.capitalizeText(txt)}</b>`);
            }
            else {
                text = text.replace(regex, `<b>${txt.toLowerCase()}</b>`);
            }
        }

        return text;
    }

    capitalizeText(str: any) {
        if (typeof str !== 'string') return ''
        return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
    }

    static createStory(text: string) {
        
        let encoding = Scene.encode(text);
        let plot: any[] = new Array();

        let story = {
            script: text,
            transcript: encoding,
            plot: plot
        }

        let arr = encoding.trim().split(" ");
        for (let item of arr) {
            if (item.trim().length == 0) {
                continue;
            }

            try {
                if (item.length % 2 != 0) {
                    item += item[item.length - 1];
                }
                let n = parseInt(item);
                plot.push({key: item, scene: new Scene(n, true)});
            } catch (error) {
                plot.push({key: item, error: error});
            }
        }

        return story;
    }
}

enum Place {
    OBJECT = 1, // 1st and 2nd digit from right
    TEXTURE = 100, // 3rd digit from right
    CONDITION = 1000, // 4th digit from right
    ROLE = 10000, // 5th digit from right
    CHARACTER = 100000, // 6th digit from right
    ATTIRE = 1000000, // 7th digit from right
    COLOR = 10000000, // 8th digit from right
    ASSAULT = 100000000, // 9th digit from right
    BODY = 1000000000, // 10th digit from right
    INJURY = 10000000000, // 11th digit from right
    LOCATION = 100000000000, // 12th digit from right
    WEATHER = 1000000000000, // 13th digit from right
    TIME = 10000000000000, // 14th digit from right
    SOUND = 100000000000000, // 15th digit from right
    LOCI = 1000000000000000, // 16th & 17th digit from right
    STATION = 10000000000000000, // 18th digit from right
    CALAMITY = 100000000000000000, // 19th digit from right
    PLANET = 1000000000000000000, // 20th digit from right
}

Scene.init();
export { Scene };