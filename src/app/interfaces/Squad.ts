export interface Squad {
    response: [{
        team: {
            id: number;
            name: string;
            logo: string;
        },
        players: [{
            id: number;
            name: string;
            age: number;
            number: number;
            position: string;
        }]
    }]
}