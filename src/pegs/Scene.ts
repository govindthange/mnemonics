import { Store } from "./Store";

class Scene {
    n: string;
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

    constructor(n: string = "00", reverse: boolean = false) {
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

    public getPegIndex(n: string, decimalPlaceValue: number, numberOfDigitsToExtract: number): number {
        if (n.length >= (decimalPlaceValue + numberOfDigitsToExtract))
            return parseInt(n.substr(decimalPlaceValue, numberOfDigitsToExtract));
        else
            return 0;
    }

    process(n: string) {
        this.n = n ? n : "00";

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

    public update(n: string, reverse: boolean = false) {
        if (reverse) {
            let arr = n.toString().split('').reverse();
            if (arr.length >= 2) {
                let temp = arr[arr.length - 1];
                arr[arr.length - 1] = arr[arr.length - 2];
                arr[arr.length - 2] = temp;

                this.process(arr.join(''));
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

    static pronounce(str: string): string {
        str = Scene.replaceRepeatingCharacters(str).toLowerCase();
        return str.replace(/x/gi, " KS ")
                    .replace(/sch/gi, " SK ")
                    .replace(/dg/gi, " J ")
                    .replace(/[sz]|ce|cy|ci|tio/gi, " S ")
                    .replace(/[td]/gi, " Th ")
                    .replace(/[n]/gi, " N ")
                    .replace(/[m]/gi, " M ")
                    .replace(/[r]/gi, " R ")
                    .replace(/[l]/gi, " L ")
                    .replace(/([j]|ch|ge|gy)/gi, " J ")
                    .replace(/ck/gi, " K ")
                    .replace(/[ckgq]/gi, " Kh ")
                    .replace(/[fvw]/gi, " W ")
                    .replace(/[pb]/gi, " Ph ");
    }

    static encode(str: string): any {
        let transcript = str.replace(/igh/gi, "")
                            .replace(/x/gi, "70")
                            .replace(/sch/gi, "07")
                            .replace(/dg/gi, "6")
                            .replace(/[sz]|ce|cy|ci|tio/gi, "0")
                            .replace(/[td]/gi, "1")
                            .replace(/[n]/gi, "2")
                            .replace(/[m]/gi, "3")
                            .replace(/[r]/gi, "4")
                            .replace(/[l]/gi, "5")
                            .replace(/([j]|ch|ge|gy)/gi, "6")
                            .replace(/ck/gi, "7")
                            .replace(/[ckgq]/gi, "7")
                            .replace(/[fvw]/gi, "8")
                            .replace(/[pb]/gi, "9");

        let hint: string = "";
        if (transcript.length>=4) {
            hint = transcript.substring(0, 3);
        }
        transcript = transcript.replace(/[aeiouyh]/gi, "");
        return { script: str, transcript: transcript, hint: hint};
    }

    public toString(): string {

        let inputLength: number = this.n.toString().length;

        let output: string = this.tagText(this.prop.object);

        if (inputLength > 2) {
            output = this.tagText(this.prop.condition)
                    + " "
                    + this.tagText(this.prop.texture)
                    + " "
                    + this.tagText(this.prop.object);
        }

        if (inputLength > 4) {
            output += " alongside "
                //+ " a" + this.tagText(this.actor.role)
                if (parseInt(this.actor.role.n) == 2) {
                    output += this.tagText(this.actor.character);
                }
                else {
                    output += this.tagText(this.actor.character, "", true, true);
                }
        }

        if (inputLength > 6) {
            output += " in a "
                + this.tagText(this.actor.attireColor)
                + this.tagText(this.actor.attire);
        }

        if (inputLength > 8) {
            output += ", who "
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

        let text: string = obj.label.replace(/(\b[A-Z][A-Z]+|\b[A-Z]\b)/g, `$&<span class="superscript">${obj.n}</span>`);

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

    static replaceRepeatingCharacters(str: string) {
        let matches = str.match(/([a-zA-Z])\1{1,}/ig);
        if (matches) {
            for (let m of matches) {
                str = str.replace(m, m[0]);
            }
        }
        return str;
    }

    static createStory(text: string) {
        
        let encoding = Scene.encode(text);
        let plot: any[] = new Array();

        let story = {
            script: encoding.script,
            transcript: encoding.transcript,
            plot: plot
        }

        let arr = text.trim().split(" ");
        for (let item of arr) {
            
            item = item.trim();
            if (item.length == 0) {
                continue;
            }

            let isNum = new RegExp('^\\d+$').test(item);
            if (isNum && item.length % 2 != 0) {
                item = "0" + item;
            }

            if (!isNum) {
                item = Scene.replaceRepeatingCharacters(item);
            }

            let obj = Scene.encode(item);
            let transcript = obj.transcript;
            try {
                if (transcript.length % 2 != 0) {
                    transcript += transcript[transcript.length - 1];
                }
                let n = transcript;
                plot.push({
                    key: transcript.replace(/\D/g, ""),
                    script: item,
                    transcript: transcript,
                    hint: obj.hint,
                    scene: new Scene(n),
                    phonic: Scene.pronounce(item)
                });
            } catch (error) {
                plot.push({
                    key: transcript.replace(/\D/g, ""),
                    script: item,
                    transcript: transcript,
                    hint: obj.hint,
                    error: error
                });
            }
        }

        return story;
    }
}

enum Place {
    OBJECT = 0, // 1st and 2nd digit from right
    TEXTURE = 2, // 3rd digit from right
    CONDITION = 3, // 4th digit from right
    ROLE = 4, // 5th digit from right
    CHARACTER = 5, // 6th digit from right
    ATTIRE = 6, // 7th digit from right
    COLOR = 7, // 8th digit from right
    ASSAULT = 8, // 9th digit from right
    BODY = 9, // 10th digit from right
    INJURY = 10, // 11th digit from right
    LOCATION = 11, // 12th digit from right
    WEATHER = 12, // 13th digit from right
    TIME = 13, // 14th digit from right
    SOUND = 14, // 15th digit from right
    LOCI = 15, // 16th & 17th digit from right
    STATION = 16, // 18th digit from right
    CALAMITY = 17, // 19th digit from right
    PLANET = 18, // 20th digit from right
}

Scene.init();
export { Scene };