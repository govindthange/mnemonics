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

$("#hideHintButton").hide();

$('#showHintButton').click({}, event => {
    $(".hint").show();
    $("#hideHintButton").show();
    $("#showHintButton").hide();
});

$('#hideHintButton').click({}, event => {
    $(".hint").hide();
    $("#hideHintButton").hide();
    $("#showHintButton").show();
});

$("#hideAnsButton").hide();

$('#showAnsButton').click({}, event => {
    $(".answer").show();
    $("#hideAnsButton").show();
    $("#showAnsButton").hide();
});

$('#hideAnsButton').click({}, event => {
    $(".answer").hide();
    $("#hideAnsButton").hide();
    $("#showAnsButton").show();
});

let renderLabels = (txt: any, labelId: string) => {
    let label: any = document.getElementById(labelId);
    if (label) label.innerHTML = txt;
}

let processText = (str: string) => {

    let narration = "";

    let mainTranscript = "";
    let topStoryline = str.split(",");
    let cnt = 1;
    for (let text of topStoryline) {
        narration += `<div class='section'><div class='badge'>${cnt}</div>`;
        let story: any = Scene.createStory(text);
        let cnt2 = 1;
        for(let plot of story.plot) {
            if (plot.scene) {
                mainTranscript += plot.key + " + ";
                narration += `<div class='section-item'>A ${plot.scene} <span class='transcript test-controls'>| ${plot.key}</span><span class='hint' style='display: none;'>| ${plot.hint}</span><span class='answer' style='display: none;'>| ${plot.script}</span></div>`;
            }
            else {
                narration +=  `<div>${plot.key} ${plot.error.toString()}</div>`;
            }
            cnt2++;
        }
        cnt++;
        narration += "</div>";
    }

    renderLabels(Scene.encode(str).transcript, "transcript");
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