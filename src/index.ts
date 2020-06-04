import { DefaultPanel } from "./pegs/DefaultPanel";

import { interval, fromEvent } from "rxjs";
import { map, filter, scan } from "rxjs/operators";
import { Scene } from "./pegs/Scene";

//new DefaultPanel();

let renderLabels = (txt: any, labelId: string) => {
    console.log("Rendering label for Scene %o", txt);
    let label: any = document.getElementById(labelId);
    if (label) label.innerHTML = txt;
}

let processText = (t: any) => {
    console.log(t);
    let temp = Scene.encode(t);
    renderLabels(temp, "encodedText");

    let s: Scene = new Scene();
    let txt = "Imagine following items: <br/>";
    let arr = temp.trim().split(" ");
    for(let item of arr) {

        if (item.trim().length == 0) {
            continue;
        }
        
        try {
            if (item.length%2 != 0) {
                item += item[item.length-1];
            }
            let n = parseInt(item);
            s.update(n, true);
            txt += "<b> [" + item + "]</b> A " + s;
        } catch (error) {
            txt +=  "<b> [" + item + "]</b>" + error.toString();
        }
       
        txt += "<BR/>";
    }
    renderLabels(txt, "label");
}

let processNumber = (n: any) => {
    console.log(`Memory mapping ${n}!`);
    let scene: Scene = new Scene();
    scene.update(n, true);
    renderLabels(scene, "label");
}

const textInput = document.querySelector('#textInput');
const textInput$ = fromEvent(textInput, 'input')
                .pipe(map((evt: any) => evt.target.value));

textInput$.subscribe({
    next: t =>  processText(t),
    error: err => console.log(`Oops... ${err}`),
    complete: () => console.log(`Complete!`),
});

const numberInput = document.querySelector('input[type=number]');
const numberInput$ = fromEvent(numberInput, 'input')
                .pipe(map((evt: any) => evt.target.value));

 numberInput$.subscribe({
    next: n =>  processNumber(n),
    error: err => console.log(`Oops... ${err}`),
    complete: () => console.log(`Complete!`),
});