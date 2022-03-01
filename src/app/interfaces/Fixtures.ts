import { Time } from "@angular/common"

export interface Fixtures {
    response: [{
        fixture: {
            id: number,
            referee: string,
            timezone: string,
            date: Date,
            timestamp: number,
            periods: {
                first: number,
                second: number
            },
            venue: {
                id: 551,
                name: string,
                city: string
            },
            status: {
                long: string,
                short: string,
                elapsed: Time
            }
        },
        league: {
            id: number,
            name: string,
            country: string,
            logo: string,
            flag: string,
            season: number,
            round: string
        },
        teams: {
            home: {
                id: number,
                name: string,
                logo: string,
                winner: boolean
            },
            away: {
                id: number,
                name: string,
                logo: string,
                winner: boolean
            }
        },
        goals: {
            home: number,
            away: number
        },
        score: {
            halftime: {
                home: number,
                away: number
            },
            fulltime: {
                home: number,
                away: number
            },
            extratime: {
                home: number,
                away: number
            },
            penalty: {
                home: number,
                away: number
            }
        }
    }]
}