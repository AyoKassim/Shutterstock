const tags = require('../metrics/tags.js')
const image = 'logo.png'

test('Returns expected results structure', async () => {
    const results = await tags(image)
    expect(results).toMatchObject({
        "result": expect.objectContaining({
            "tags": expect.arrayContaining([{
                "confidence": expect.any(Number),
                "tag": expect.objectContaining({
                "en": expect.any(String)
                })
            }])
        })
    })
})