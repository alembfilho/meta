/*
A photography set consists of N cells in a row, numbered from 1 to N in order, and can be represented by a string C of length N. Each cell ii is one of the following types (indicated by C_iC, the i^th character of C):

    If C_i = “P”, it is allowed to contain a photographer
    If C_i = “A”, it is allowed to contain an actor
    If C_i = “B”, it is allowed to contain a backdrop
    If C_i = “.”, it must be left empty

A photograph consists of a photographer, an actor, and a backdrop, such that each of them is placed in a valid cell, and such that the actor is between the photographer and the backdrop. Such a photograph is considered artistic if the distance between the photographer and the actor is between X and Y cells (inclusive), and the distance between the actor and the backdrop is also between X and Y cells (inclusive). The distance between cells i and j is |i - j| (the absolute value of the difference between their indices).

Determine the number of different artistic photographs which could potentially be taken at the set. Two photographs are considered different if they involve a different photographer cell, actor cell, and/or backdrop cell.
*/

function getArtisticPhotographCountSlow(N, C, X, Y) {

    const countLtoR = () => {
        let count = 0
        for (let p = 0; p < N - X - X; p++) {
            if (C[p] != 'P') continue

            for (let a = p + X; a <= p + Y; a++) {
                if (C[a] != 'A') continue

                for (let b = a + X; b <= a + Y; b++) {
                    if (C[b] != 'B') continue
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

function getArtisticPhotographCountSlow2(N, C, X, Y) {

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

    const countRtoL = () => {
        let count = 0
        for (let p = N - 1; p >= X + X; p--) {
            if (C[p] != 'P') continue

            for (let a = p - X; a >= X; a--) {
                if (C[a] != 'A') continue
                if (p - a > Y) break

                for (let b = a - X; b >= 0; b--) {
                    if (C[b] != 'B') continue
                    if (a - b > Y) break
                    count++
                }
            }
        }
        return count
    }

    return countLtoR() + countRtoL()
}

function getArtisticPhotographCountSlow3(N, C, X, Y) {
    let count = 0

    for (let a = X; a < N - X; a++) {
        if (C[a] != 'A') continue
        let blcount = 0, brcount = 0, plcount = 0, prcount = 0

        for (let r = a + X; r <= a + Y; r++) {
            if (C[r] == 'B') blcount++
            if (C[r] == 'P') plcount++
        }

        for (let l = a - X; l >= a - Y; l--) {
            if (C[l] == 'B') brcount++
            if (C[l] == 'P') prcount++
        }

        count += blcount * prcount + plcount * brcount

    }

    return count

}

// Uses sliding windows to avoid recalculations
function getArtisticPhotographCount(N, C, X, Y) {
    let count = 0
    let blcount = 0, brcount = 0, plcount = 0, prcount = 0,
        slide = Y // Starts with Y so that the first A is calculated from scratch

    for (let a = X; a < N - X; a++) {
        if (C[a] != 'A') {
            slide++
            continue
        }

        // In this case it's better to recount everything since the overlap is too low
        if (slide > Y / 2) {
            blcount = 0, brcount = 0, plcount = 0, prcount = 0

            for (let r = a + X; r <= a + Y; r++) {
                if (C[r] == 'B') brcount++
                if (C[r] == 'P') prcount++
            }

            for (let l = a - X; l >= a - Y; l--) {
                if (C[l] == 'B') blcount++
                if (C[l] == 'P') plcount++
            }
        } else {
            // Slide Right window
            // Add the new
            for (let add = a + Y - slide + 1; add <= a + Y; add++) {
                if (C[add] == 'B') brcount++
                if (C[add] == 'P') prcount++
            }

            // Remove the difference
            for (let rem = a + X - slide; rem < a + X; rem++) {
                if (C[rem] == 'B') brcount--
                if (C[rem] == 'P') prcount--
            }

            // Slide Left window          
            // Add the new
            for (let add = a - X - slide + 1; add <= a - X; add++) {
                if (C[add] == 'B') blcount++
                if (C[add] == 'P') plcount++
            }

            // Remove the difference
            for (let rem = a - Y - slide; rem < a - Y; rem++) {
                if (C[rem] == 'B') blcount--
                if (C[rem] == 'P') plcount--
            }

        }

        slide = 1
        count += blcount * prcount + plcount * brcount

    }

    return count

}

console.log(getArtisticPhotographCount(8, '.PBAAP.B', 1, 3)) //expects 3
console.log(getArtisticPhotographCount(5, 'APABA', 2, 3)) //expects 0
console.log(getArtisticPhotographCount(5, 'APABA', 1, 2)) //expects 1