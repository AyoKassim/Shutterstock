const size = require('../metrics/size.js')
const image = 'logo.png'

test('Returns a valid size', () => {
    expect(size(image)).toBeGreaterThanOrEqual(0)
})