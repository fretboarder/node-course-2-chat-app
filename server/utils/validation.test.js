const expect = require('expect')

const {isRealString} = require('./validation')

describe('isRealString', () => {
    it('should be true for a correct string', () => {
        const res = isRealString("  correct string  ")
        expect(res).toBeTruthy()
    })

    it('should be false for an empty string', () => {
        const res = isRealString("    ")
        expect(res).toBeFalsy()
    })

    it('should be false for non-string objects', () => {
        const res = isRealString([1,2,3])
        expect(res).toBeFalsy()
    })
})