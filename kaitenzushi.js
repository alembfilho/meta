/* There are N dishes in a row on a kaiten belt, with the i^th dish being of type D_i. Some dishes may be of the same type as one another.

    You're very hungry, but you'd also like to keep things interesting.The NN dishes will arrive in front of you, one after another in order, and for each one you'll eat it as long as it isn't the same type as any of the previous KK dishes you've eaten. You eat very fast, so you can consume a dish before the next one gets to you. Any dishes you choose not to eat as they pass will be eaten by others.

    Determine how many dishes you'll end up eating.

    Please take care to write a solution which runs within the time limit.
 */


// Timeout 1
function getMaximumEatenDishCountSlow(N, D, K) {
    let count = 0
    const lastK = []

    for (let i = 0; i < N; i++) {
        if (!lastK.includes(D[i])) {
            count++
            lastK.push(D[i])
            if (lastK.length > K) lastK.shift()
        }

    }
    return count
}

// Using pointer to avoid shift
// Timeout 2
function getMaximumEatenDishCountSlower(N, D, K) {
    const eaten = []

    const notInlastKEaten = (d) => {
        for (let i = eaten.length - K; i < eaten.length; i++)
            if (eaten[i] == d) return false

        return true
    }

    for (let i = 0; i < N; i++)
        if (notInlastKEaten(D[i]))
            eaten.push(D[i])

    return eaten.length
}

// Using a Set to speedup the search
function getMaximumEatenDishCount(N, D, K) {
    const eaten = []
    const lastK = new Set()

    for (let i = 0; i < N; i++)
        if (!lastK.has(D[i])) {
            lastK.delete(eaten[eaten.length - K])
            lastK.add(D[i])
            eaten.push(D[i])
        }

    return eaten.length
}

getMaximumEatenDishCount(6, [1, 2, 3, 3, 2, 1], 2) //Expects 4