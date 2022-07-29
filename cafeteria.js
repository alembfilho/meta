/*
    A cafeteria table consists of a row of N seats, numbered from 1 to N from left to right.
    Social distancing guidelines require that every diner be seated such that K seats to their left and K seats to their right (or all the remaining seats to that side if there are fewer than K) remain empty.

    There are currently M diners seated at the table, the i^th of whom is in seat S_i.
    No two diners are sitting in the same seat, and the social distancing guidelines are satisfied.

    Determine the maximum number of additional diners who can potentially sit at the table without social distancing guidelines being violated for any new or existing diners, assuming that the existing diners cannot move and that the additional diners will cooperate to maximize how many of them can sit down.

    Please take care to write a solution which runs within the time limit.
*/

// Timeout on 2/32
function getMaxAdditionalDinersCountSlow(N, K, M, S) {
    S.sort((a, b) => a - b)
    let i = 1, t = 0, count = 0

    while (i <= N) {
        if (t >= M || i + K < S[t]) {
            count++
            i += K + 1
        } else {
            i = S[t] + K + 1
            t++
        }

    }
    return count;
}

// Solves for all
function getMaxAdditionalDinersCount(N, K, M, S) {
    S.sort((a, b) => a - b)
    let i = 0, count = 0, start = 1, end = 1

    // Number of people who can sit before the first            and after the last person already sitting
    count += Math.max(Math.ceil((S[0] - K - 1) / (K + 1)), 0) + Math.max(Math.ceil((N - (S[M - 1] + K + 1) + 1) / (K + 1)), 0)

    // Calculate for all the allowed spaces between people
    while (i < M - 1) {
        start = S[i] + K + 1
        end = S[++i] - K - 1
        count += Math.ceil((end - start + 1) / (K + 1))
    }

    return count;
}

getMaxAdditionalDinersCount(10, 1, 2, [2, 6]) // Expect 3