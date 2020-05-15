import { interval } from "rxjs";
import { map } from "rxjs/operators";

let i$ = interval(2000)
    .pipe(map((d: any) => d* 10));

i$.subscribe((d: number) => console.log(d));