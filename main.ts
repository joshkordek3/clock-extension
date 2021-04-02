enum Y {
    //% block="Year"
    Year,
    //% block="Month"
    Month,
    //% block="Day of the week"
    DOW,
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
//% color=#000 weight=0 icon="\uf017" block="Clock"
namespace clock {
    //% block="pause clock"
    export function pause_clock () {
        paused = true
    }
    //% block="continue clock"
    export function continue_clock () {
        paused = false
    }
    //% block="$thing"
    export function _get (thing: Y) {
        if (thing != Y.DOW) {
            return stuff[details2.indexOf(thing)]
        } 
        return 0
    }
    //% block="set $thing to $to"
    export function _set (thing: Y, to: number|string) {
        if (typeof to == 'number' && thing != Y.DOW) {
            stuff[details2.indexOf(thing)] = to
        }
        if (typeof to == 'string') {
            DOW = DSOW.indexOf(to)
        }
    }
    //% block="set start of the week to $to"
    export function __set (to: DSOWA) {
        DOW_difference = DSOW_details.indexOf(to)
    }
    //% block="day of the week"
    export function DOWW () {
        return DSOW[DOW + DOW_difference]
    }
    let DOW_difference = 0
    let paused = true
    let DSOW_details: any[] = [DSOWA.Monday, DSOWA.Tuesday, DSOWA.Wednesday, DSOWA.Thursday, DSOWA.Friday, DSOWA.Saturday, DSOWA.Sunday]
    let DSOW: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let DOW = 0
    let details2: any[] = [Y.Year, Y.Month, Y.Day, Y.Hour, Y.Minute, Y.Second]
    let stuff: number[] = [0, 0, 0, 0, 0, 0]
    let details: string[] = ["Year", "Month", "Day", "Hour", "Minute", "Second"]
    let month_days: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    basic.forever(function () {
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
    })
}
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