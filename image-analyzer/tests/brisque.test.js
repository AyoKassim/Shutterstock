const brisque = require('../metrics/brisque.js')
const image = 'logo.png'

jest.setTimeout(20000)  //this could take a while

test('Returns a valid score', async () => {
    let score = await brisque(image)
    //at time of writing, should look like "Brisque score = some_number"
    score = score.split(' ') //the string for the score number is hte last element of this array
    score = +score[score.length-1] //interpret the score string as a number
    expect(score).toBeGreaterThanOrEqual(0)
    expect(score).toBeLessThanOrEqual(100)
})