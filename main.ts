enum Y {
    //% block="Year"
    Year,
    //% block="Month"
    Month,
    //% block="Day"
    Day,
    //% block="Hour"
    Hour,
    //% block="Minute"
    Minute,
    //% block="Second"
    Second,
}
enum DSOWA {
    //% block="Monday"
    Monday, 
    //% block="Tuesday"
    Tuesday, 
    //% block="Wednesday"
    Wednesday, 
    //% block="Thursday"
    Thursday, 
    //% block="Friday"
    Friday, 
    //% block="Saturday"
    Saturday,
    //% block="Sunday" 
    Sunday,
}
enum Operation {
    //% block="Continue"
    Continue, 
    //% block="Pause"
    Pause, 
}
//% color=#000000 weight=0 icon="\uf017" block="Clock"
namespace clock {
    //% block="$oper clock"
    //% advanced=true
    export function cp_clock (oper: Operation) {
        if (oper == Operation.Pause) {
            paused = true
        } else if (oper == Operation.Continue) {
            paused = false
        }
    }
    //% block="$thing"
    export function _get (thing: Y) {
        return stuff[details2.indexOf(thing)]
    }
    //% block="wait in background| $HH hour(s) | $MM minute(s) | $SS second(s)"
    //% HH.fieldOptions.precision=1 MM.fieldOptions.precision=1 SS.fieldOptions.precision=1
    export function timer (HH: number, MM: number, SS: number) {
        HH = (HH * 3.6e+6) + (MM * 60000) + (SS * 1000)
        MM = control.millis()
        while(HH > SS) {
            SS = Math.round((control.millis() - MM))
        }
    }
    //% block="set $thing to $to"
    export function _set (thing: Y, to: number) {
        stuff[details2.indexOf(thing)] = to
    }
    //% block="set start of the week to $to"
    export function __set (to: DSOWA) {
        DOW_difference = DSOW_details.indexOf(to)
    }
    //% block="set day of the week to $to"
    export function ___set (to: DSOWA) {
        DOW = DSOW_details.indexOf(to)
    }
    //% block="day of the week"
    export function DOWW () {
        return DSOW[DOW + DOW_difference]
    }
    let DOW_difference = 0
    let paused = false
    let DSOW_details: any[] = [DSOWA.Monday, DSOWA.Tuesday, DSOWA.Wednesday, DSOWA.Thursday, DSOWA.Friday, DSOWA.Saturday, DSOWA.Sunday]
    let DSOW: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let DOW = 0
    let details2: any[] = [Y.Year, Y.Month, Y.Day, Y.Hour, Y.Minute, Y.Second]
    let stuff: number[] = [0, 0, 0, 0, 0, 0]
    let details: string[] = ["Year", "Month", "Day", "Hour", "Minute", "Second"]
    let month_days: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    while(true) {
        if (!(paused)) {
            let i = control.millis()
            while (i + 1000 >= control.millis()) {}
            stuff[details.indexOf("Second")] = (stuff[details.indexOf("Second")] + 1) % 60
            if (stuff[details.indexOf("Second")] == 0) {
                stuff[details.indexOf("Minute")] = (stuff[details.indexOf("Minute")] + 1) % 60
                if (stuff[details.indexOf("Minute")] == 0) {
                    stuff[details.indexOf("Hour")] = (stuff[details.indexOf("Hour")] + 1) % 24
                    if (stuff[details.indexOf("Hour")] == 0) {
                        if (stuff[details.indexOf("Year")] % 4 == 0 && stuff[details.indexOf("Year")] % 100 != 0) {
                            month_days[1] = 29
                        }
                        stuff[details.indexOf("Day")] = (stuff[details.indexOf("Day")] + 1) % month_days[stuff[details.indexOf("Month")] - 1]
                        month_days[1] = 28
                        if (stuff[details.indexOf("Day")] == 0) {
                            stuff[details.indexOf("Month")] = (stuff[details.indexOf("Month")] + 1) % 12
                            if (stuff[details.indexOf("Month")] == 0) {
                                stuff[details.indexOf("Year")] = (stuff[details.indexOf("Year")] + 1)
                            }
                        }
                    }
                }
            }
        }
    }
}
clock.timer(0, 0, 10)
basic.showString(":D")
//if (thing == Y.Year) {
//    stuff[0]
//} else if (thing == Y.Month) {
//    stuff[1]
//} else if (thing == Y.Day) {
//    stuff[2]
//} else if (thing == Y.Hour) {
//    stuff[3]
//} else if (thing == Y.Minute) {
//    stuff[4]
//} else if (thing == Y.Second) {
//    stuff[5]
//}