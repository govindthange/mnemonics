import { interval, fromEvent } from "rxjs";
import { map, filter, scan } from "rxjs/operators";

let i$ = fromEvent(document, "keydown")
        .pipe(filter((evt: any) => evt.keyCode >= 48 && evt.keyCode <= 57 ))
        .pipe(map((evt: any) => evt.key))
        .pipe(scan((str, v) => {
            str = v + str;
            return str;
        }, ""));

i$.subscribe((d: string) => console.log(d));