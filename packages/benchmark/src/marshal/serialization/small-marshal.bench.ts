import {f, plainSerializer} from '@super-hornet/marshal';
import {BenchSuite} from '@super-hornet/core';

class Model {
    @f ready?: boolean;

    @f.array(String) tags: string[] = [];

    @f priority: number = 0;

    constructor(
        @f public id: number,
        @f public name: string
    ) {
    }
}
const ModelSerializer = plainSerializer.for(Model);

export async function main() {
    const suite = new BenchSuite('marshal');
    const plain = {
        name: 'name',
        id: 2,
        tags: ['a', 'b', 'c'],
        priority: 5,
        ready: true,
    };

    suite.add('deserialize', () => {
        ModelSerializer.deserialize(plain);
    });

    const item = plainSerializer.for(Model).deserialize(plain);
    suite.add('serialize', () => {
        ModelSerializer.serialize(item);
    });

    suite.run();
}