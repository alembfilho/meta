/*
    You're trying to open a lock. The lock comes with a wheel which has the integers from 1 to N arranged in a circle in order around it (with integers 1 and NNadjacent to one another). The wheel is initially pointing at 1.

    For example, the following depicts the lock for N = 10 (as is presented in the second sample case).

    It takes 1 second to rotate the wheel by 1 unit to an adjacent integer in either direction, and it takes no time to select an integer once the wheel is pointing at it.

    The lock will open if you enter a certain code. The code consists of a sequence of MM integers, the iith of which is C_i
    ​
    Determine the minimum number of seconds required to select all MM of the code's integers in order.
*/

function getMinCodeEntryTime(N, M, C) {
    let ini = 1, sum = 0
    for (let n of C) {
        sum += Math.min(Math.abs(ini - n), N - Math.abs(ini - n))
        ini = n
    }
    return sum
}

// getMinCodeEntryTime(10, 4, [9, 4, 4, 8]) //expects 11

// Chapter 2 with two wheels, and you can rotate any
// This try fails 30/32 because it's greedy and fails to get the global optimal
function getMinCodeEntryTimeWrong(N, M, C) {
    let w1 = 1, w2 = 1, sum = 0
    for (let n of C) {
        const minW1 = Math.min(Math.abs(w1 - n), N - Math.abs(w1 - n))
        const minW2 = Math.min(Math.abs(w2 - n), N - Math.abs(w2 - n))
        if (minW1 < minW2) {
            sum += minW1
            w1 = n
        } else {
            sum += minW2
            w2 = n
        }

    }
    return sum
}

// console.log(getMinCodeEntryTimeWrong(7, 6, [4, 3, 5, 4, 3, 4])) // Expects 7

// This atempt uses recursion to generate the whole tree of possibilities and returns the best path, but it is slow
function getMinCodeEntryTime(N, M, C) {
    const minRotation = (ini, end) => Math.min(Math.abs(ini - end), N - Math.abs(ini - end))

    const tree = (w1, w2, sum, i) => {
        if (i == M) return sum
        if (w1 == w2) return tree(C[i], w2, sum + minRotation(w1, C[i]), i + 1) // Avoids path mirroring
        else return Math.min(
            tree(C[i], w2, sum + minRotation(w1, C[i]), i + 1),
            tree(w1, C[i], sum + minRotation(w2, C[i]), i + 1)
        )
    }

    return tree(1, 1, 0, 0)
}


// console.log(getMinCodeEntryTime(7, 6, [4, 3, 5, 4, 3, 4])) // Expects 7

console.log(getMinCodeEntryTime(10, 3, [7, 9, 7]))