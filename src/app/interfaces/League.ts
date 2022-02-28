export interface League {
    response: [{
        league: {
            id: number;
            name: string;
            type: string;
            logo: string;
        },
        country: {
            name: string;
            code: string;
            flag: string;
        },
    }]
}