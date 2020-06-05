import { DefaultPanel } from "./pegs/DefaultPanel";

import { interval, fromEvent } from "rxjs";
import { map, filter, scan } from "rxjs/operators";
import { Scene } from "./pegs/Scene";

//new DefaultPanel();

$("#showButton").hide();
$('#hideButton').click({}, event => {
    $(".test-controls").hide();
    $("#showButton").show();
});

$('#showButton').click({}, event => {
    $(".test-controls").show();
    $("#showButton").hide();
});

let renderLabels = (txt: any, labelId: string) => {
    let label: any = document.getElementById(labelId);
    if (label) label.innerHTML = txt;
}

let processText = (text: any) => {

    let story: any = Scene.createStory(text);
    let cnt = 1;
    let narration = "Imagine following items: <br/>";
    for(let plot of story.plot) {
        if (plot.scene) {
            narration += `<p>${cnt++}. A ${plot.scene} <span class='number-span test-controls'>| ${plot.key}</span></p>`;
        }
        else {
            narration +=  `<p><span class='number-err'>${plot.key}</span>${plot.error.toString()}</p>`;
        }
    }

    renderLabels(story.transcript, "transcript");
    renderLabels(narration, "narration");
}

const textInput = document.querySelector('#textInput');
const textInput$ = fromEvent(textInput, 'input')
                    .pipe(map((evt: any) => evt.target.value));

textInput$.subscribe({
    next: t =>  processText(t),
    error: err => console.log(`Oops... ${err}`),
    complete: () => console.log(`Complete!`),
});