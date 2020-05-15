import { interval, fromEvent } from "rxjs";
import { map, filter, scan } from "rxjs/operators";

const node = document.querySelector('input[type=number]');
const input$ = fromEvent(node, 'input')
                .pipe(map((evt: any) => evt.target.value));

input$.subscribe({
    next: v => {
        console.log(`Memory mapping ${v}!`)
        if (v > 0) {
            let obj = {
                object: v%100,
                color: ((v - v % 100) / 100) % 10,
                attribute: ((v - v % 1000) / 1000) % 10,
                theme: ((v - v % 10000) / 10000) % 10,
                time: ((v - v % 100000) / 100000) % 10,
                characterType: ((v - v % 1000000) / 1000000) % 10,
                character: ((v - v % 10000000) / 10000000) % 10,
            };
            console.log(obj);
        }

        },
        error: err => console.log(`Oops... ${err}`),
            complete: () => console.log(`Complete!`),
});