export const sum = (a: number, b: number): number => {
    return a + b
}

describe('sum module', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3)
    })
})

describe('test common matcher', () => {
    test('add 2 + 2 to equal 4', () => {
        expect(2 + 2).toBe(4)
    })
})

describe('test to be true or false', () => {
    test('1 toBe true, 0 toBe false', () => {
        expect(1).toBeTruthy()
        expect(0).toBeFalsy()
    })
})

describe('test number battle', () => {
    test('4 > 3, 5 < 6', () => {
        expect(4).toBeGreaterThan(3)
        expect(5).toBeLessThan(6)
    })
})

describe('test object', () => {
    test('add 2 + 2 to equal 4', () => {
        expect({name: 'viking'}).toEqual({name:'viking'})
    })
})