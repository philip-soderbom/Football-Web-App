export interface Standings {
    response: [{
        league: {
            id: number;
            name: string;
            country: string;
            logo: string;
            flag: string;
            season: number;
            standings: [[{
                rank: number;
                team: {
                    id: number;
                    name: string;
                    logo: string;
                },
                points: number;
                goalsDiff: number;
                form: string;
                all: {
                    played: number;
                    win: number;
                    draw: number;
                    lose: number;
                    goals: {
                        for: number;
                        against: number;
                    }
                },
            }]]
        }
    }]
}