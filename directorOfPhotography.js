/*
A photography set consists of N cells in a row, numbered from 1 to N in order, and can be represented by a string C of length N. Each cell ii is one of the following types (indicated by C_iC, the i^th character of C):

    If C_i = “P”, it is allowed to contain a photographer
    If C_i = “A”, it is allowed to contain an actor
    If C_i = “B”, it is allowed to contain a backdrop
    If C_i = “.”, it must be left empty

A photograph consists of a photographer, an actor, and a backdrop, such that each of them is placed in a valid cell, and such that the actor is between the photographer and the backdrop. Such a photograph is considered artistic if the distance between the photographer and the actor is between X and Y cells (inclusive), and the distance between the actor and the backdrop is also between X and Y cells (inclusive). The distance between cells i and j is |i - j| (the absolute value of the difference between their indices).

Determine the number of different artistic photographs which could potentially be taken at the set. Two photographs are considered different if they involve a different photographer cell, actor cell, and/or backdrop cell.
*/

function getArtisticPhotographCount(N, C, X, Y) {

    const countLtoR = () => {
        let count = 0
        for (let p = 0; p < N - X - X; p++) {
            if (C[p] != 'P') continue

            for (let a = p + X; a < N - X; a++) {
                if (C[a] != 'A') continue
                if (a - p > Y) break

                for (let b = a + X; b < N; b++) {
                    if (C[b] != 'B') continue
                    if (b - a > Y) break
                    count++
                }
            }
        }
        return count
    }

    const LtoR = countLtoR()
    C = [...C].reverse().join('')
    const RtoL = countLtoR()

    return LtoR + RtoL
}

getArtisticPhotographCount(8, '.PBAAP.B', 1, 3) //expects 3