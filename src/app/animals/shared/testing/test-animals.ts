import { Animal } from '../animal.model';

export function getTestAnimals(): Animal[] {
    return [
        {
            name: 'dog',
            sound: 'bau',
        },
        {
            name: 'cat',
            sound: 'myau',
        },
        {
            name: 'pig',
            sound: 'oink',
        },
    ];
}
