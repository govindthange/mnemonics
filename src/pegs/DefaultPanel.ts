
import { interval, fromEvent } from "rxjs";
import { map, filter, scan } from "rxjs/operators";
import { Scene } from "./Scene";

class DefaultPanel {
    constructor() {
        let renderLabels = (scene: any, labelId: string) => {
            console.log("Rendering label for Scene %o", scene);
            let label: any = document.getElementById(labelId);
            if (label) label.innerHTML = scene;
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
            if (color) color.style.backgroundColor = scene.actor.attireColor.color;

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
            let scene: Scene = new Scene();
            scene.update(n, shouldReverse);
            renderLabels(scene, "label");
            renderScene(scene);
        }

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
    }
}

export { DefaultPanel };