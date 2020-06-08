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

$("#showAnsButton").hide();

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
        narration += `<div class='section'><span class='badge'>${cnt}</span>`;
        let story: any = Scene.createStory(text);
        let cnt2 = 1;
        for(let plot of story.plot) {
            if (plot.scene) {
                mainTranscript += plot.key + " + ";
                narration += `<span ${ cnt2 > 1 ? 'class="section-item-prefix"' : ''}>A ${plot.scene}`;
                narration += `<span class='transcript test-controls'>| ${plot.key}</span>`;
                narration += `<span class='hint' style='display: none;'>| ${plot.hint}</span>`;
                narration += `<span class='answer'>| ${plot.script}</span>`;
                narration += `<a class="subscript hint" target='_blank' href='https://www.rhymezone.com/r/rhyme.cgi?typeofrhyme=adv&org1=syl&org2=l&org3=y&Word=${plot.script}'>1 </a>`;
                narration += `<a class="subscript hint" target='_blank' href='https://www.rhymes.net/rhyme/${plot.script}'>2 </a>`;
                narration += `<a class="subscript hint" target='_blank' href='https://www.rhymer.com/beginning-rhymes/${plot.script}.html'>3 </a>`;
                narration += "</span>";
            }
            else {
                narration += `<span>${plot.error.toString()} </span>`;
                narration += `<span class='transcript test-controls'>| ${plot.key}</span>`;
                narration += `<span class='hint' style='display: none;'>| ${plot.hint}</span>`;
                narration += `<span class='answer'>| ${plot.script}</span>`;
            }
            cnt2++;
            narration += "<br/>"
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