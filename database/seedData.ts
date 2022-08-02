
interface SeedDataInterface {
    entries:seedEntryInterface[];
}

interface seedEntryInterface {
    description: string;
    createdAt: number;
    status: string;
}

export const seedData:SeedDataInterface = {
    entries:[
        {
       
        description: " Pendding: Eu minim Lorem reprehenderit est ad consectetur incididunt qui eiusmod pariatur. ",
        status: "pending",
        createdAt: Date.now(),
    },
    {
       
        description: "In-Progress:  Eu minim Lorem reprehenderit est ad consectetur incididunt qui eiusmod pariatur. ",
        status: "in-progress",
        createdAt: Date.now()-100000,
    },
    {
       
        description: "Finished: Eu minim Lorem reprehenderit est ad consectetur incididunt qui eiusmod pariatur. ",
        status: "finished",
        createdAt: Date.now()-1000000,
    },
    ]
 
}
