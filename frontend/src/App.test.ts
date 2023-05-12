import {describe, expect, test} from 'vitest'
describe("App.tsx",() => {
    test("the meaning of life", () => {
        let result = 42;
        expect(41 +1).toEqual(result);
    })
})