export interface Player {
    response: [{
        player: {
            id: number;
            name: string;
            firstname: string;
            lastname: string;
            age: number;
            birth: {
                date: string;
                place: string;
                country: string;
            };
            nationality: string;
            height: string;
            weight: string;
            injured: boolean;
            photo: string;
        },
        statistics: [{
            team: {
                id: number;
                name: string;
                logo: string;
            },
            games: {
                appearences: number;
                minutes: number;
            },
            goals: {
                total: number;
                conceded: number;
                assists: number;
                saves: number;
            },
            cards: {
                yellow: number;
                red: number;
            },
            league: {
                id: number;
                name: string;
                logo: string;
            }
        },
        {
            team: {
                id: number;
                name: string;
                logo: string;
            },
            games: {
                appearences: number;
                minutes: number;
            },
            goals: {
                total: number;
                conceded: number;
                assists: number;
                saves: number;
            },
            cards: {
                yellow: number;
                red: number;
            },
            league: {
                id: number;
                name: string;
                logo: string;
            }
        },
        {
            team: {
                id: number;
                name: string;
                logo: string;
            },
            games: {
                appearences: number;
                minutes: number;
            },
            goals: {
                total: number;
                conceded: number;
                assists: number;
                saves: number;
            },
            cards: {
                yellow: number;
                red: number;
            },
            league: {
                id: number;
                name: string;
                logo: string;
            }
        },
    ]
    }]
}