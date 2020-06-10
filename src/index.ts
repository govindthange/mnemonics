import { DefaultPanel } from "./pegs/DefaultPanel";

import { interval, fromEvent } from "rxjs";
import { map, filter, scan } from "rxjs/operators";
import { Scene } from "./pegs/Scene";

//new DefaultPanel();

let toggleControl = (cls: string, flag: boolean) => {
    $(cls).toggle(flag);
};

let testChecked: boolean = false;
$('#testCheck').change((e: any) => {
    testChecked = e.currentTarget.checked;
    toggleControl("input:text", e.currentTarget.checked);
});

let inputChecked: boolean = true;
$('#inputCheck').change((e: any) => {
    inputChecked = e.currentTarget.checked;
    toggleControl("textarea", e.currentTarget.checked);
});

let sceneChecked: boolean = false;
$('#sceneCheck').change((e: any) => {
    sceneChecked = e.currentTarget.checked;
    toggleControl(".scene", e.currentTarget.checked);
});

let plotChecked: boolean = true;
$('#plotCheck').change((e: any) => {
    plotChecked = e.currentTarget.checked;
    toggleControl(".plot", e.currentTarget.checked);
});

let tagChecked: boolean = false;
$('#tagCheck').change((e: any) => {
    tagChecked = e.currentTarget.checked;
    toggleControl(".superscript", e.currentTarget.checked);
});

let transChecked: boolean = false;
$('#transCheck').change((e: any) => {
    transChecked = e.currentTarget.checked;
    toggleControl(".transcript", e.currentTarget.checked);
});

let hintChecked: boolean = false;
$('#hintCheck').change((e: any) => {
    hintChecked = e.currentTarget.checked;
    toggleControl(".hint", e.currentTarget.checked);
});

let ansChecked: boolean =  false;
$('#ansCheck').change((e: any) => {
    ansChecked = e.currentTarget.checked;
    toggleControl(".answer", e.currentTarget.checked);
});

let phonicsChecked: boolean =  false;
$('#phonicsCheck').change((e: any) => {
    phonicsChecked = e.currentTarget.checked;
    toggleControl(".phonics", e.currentTarget.checked);
});

let rhymesChecked: boolean = false;
$('#rhymeCheck').change((e: any) => {
    rhymesChecked = e.currentTarget.checked;
    toggleControl(".rhyme", e.currentTarget.checked);
});

let renderLabels = (txt: any, labelId: string) => {
    let label: any = document.getElementById(labelId);
    if (label) label.innerHTML = txt;
}

let processText = (str: string) => {
    let narration = "";
    let topStoryline = str.split(",");
    let cnt = 1;
    for (let text of topStoryline) {
        narration += `<div class='section'><span class='badge'>${cnt}</span>`;
        let story: any = Scene.createStory(text);
        let cnt2 = 1;
        for(let plot of story.plot) {
            if (plot.scene) {
                narration += `<span ${ cnt2 > 1 ? 'class="section-item-prefix"' : ''}>`;
                narration += `<input type='text'></span>`;
                narration += `<span class='plot'>A ${plot.scene.getPlot()} </span>`;
                narration += `<span class='scene'>A ${plot.scene} </span>`;
                narration += `<span class='transcript'>| ${plot.key}</span>`;
                narration += `<span class='hint' style='display: none;'>| ${plot.hint}</span>`;
                narration += `<span class='answer'>| ${plot.text} = ${plot.script}</span>`;
                narration += `<span class='phonics'>| ${plot.phonic}</span>`;
                narration += `<a class="subscript rhyme" target='_blank' href='https://www.rhymezone.com/r/rhyme.cgi?typeofrhyme=adv&org1=syl&org2=l&org3=y&Word=${plot.script}'>1 </a>`;
                narration += `<a class="subscript rhyme" target='_blank' href='https://www.rhymes.net/rhyme/${plot.script}'>2 </a>`;
                narration += `<a class="subscript rhyme" target='_blank' href='https://www.rhymer.com/beginning-rhymes/${plot.script}.html'>3 </a>`;
                narration += "</span>";
            }
            else {
                narration += `<span>${plot.error.toString()} </span>`;
                narration += `<span class='transcript'>| ${plot.key}</span>`;
                narration += `<span class='hint' style='display: none;'>| ${plot.hint}</span>`;
                narration += `<span class='answer'>| ${plot.text} = ${plot.script}</span>`;
            }
            cnt2++;
            narration += "<br/>"
        }
        cnt++;
        narration += "</div>";
    }

    renderLabels(Scene.encode(str).transcript, "transcript");
    renderLabels(narration, "narration");

    toggleControl("textarea", inputChecked);
    toggleControl("input:text", testChecked);
    toggleControl(".scene", sceneChecked);
    toggleControl(".plot", plotChecked);
    toggleControl(".superscript", tagChecked);
    toggleControl(".transcript", transChecked);
    toggleControl(".hint", hintChecked);
    toggleControl(".answer", ansChecked);
    toggleControl(".phonics", phonicsChecked);
    toggleControl(".rhyme", rhymesChecked);
}

const textInput = document.querySelector('#textInput');
const textInput$ = fromEvent(textInput, 'input')
                    .pipe(map((evt: any) => evt.target.value));

textInput$.subscribe({
    next: t =>  processText(t),
    error: err => console.log(`Oops... ${err}`),
    complete: () => console.log(`Complete!`),
});