const RIS = require('../metrics/reverse-image-search.js')
const image = 'logo.png'

test('Returns valid number of results', async () => {
    const ris = await RIS(image)
    expect(ris).toBeGreaterThanOrEqual(0)
})