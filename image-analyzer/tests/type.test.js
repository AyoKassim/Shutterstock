const type = require('../metrics/type.js')
const image = 'logo.png'

test('Returns a valid size', async () => {
    expect(typeof (await type(image))).toBe('string')
})