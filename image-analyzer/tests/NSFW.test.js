const NSFW = require('../metrics/NSFW.js')
const image = 'logo.png'

test('Returns expected results structure', async () => {
    const scores = await NSFW(image)
    expect(scores).toMatchObject({
        "isAdultContent": expect.any(Boolean),
        "isRacyContent": expect.any(Boolean),
        "isGoryContent": expect.any(Boolean),
        "adultScore": expect.any(Number),
        "racyScore": expect.any(Number),
        "goreScore": expect.any(Number)
    })
})