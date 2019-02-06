import { createRequestParams } from './srv-request.util';

const referenceParams = JSON.stringify({ _sort: "name", id: ["1", "4", "5", "8"], name: ["test"], _start: 1, _end: 3, _limit: 2 });

describe('RequestUtils::createRequestParams', () => {
    it('should params equal to reference', () => {
        let params = JSON.stringify(createRequestParams({
            filter: [{ id: 1 }, { id: 4 }, { id: 5 }, { id: 8 }, { name: "test" }],
            sortBy: "name",
            slice: { start: 1, end: 3, limit: 2 }
        }));
        expect(params).toEqual(referenceParams)
    });
});