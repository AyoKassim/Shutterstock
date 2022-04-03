const trend = require('../metrics/trendSearch.js')
const image = 'logo.png'

test('Returns valid score', async () => {
    const trendiness = +(await trend(image))
    
    expect(trendiness).toBeGreaterThanOrEqual(0)
    expect(trendiness).toBeLessThanOrEqual(1)
})