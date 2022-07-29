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

getMinCodeEntryTime(10, 4, [9, 4, 4, 8]) //expects 11