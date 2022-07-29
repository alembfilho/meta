/*
    You are spectating a programming contest with NN competitors, each trying to independently solve the same set of programming problems. Each problem has a point value, which is either 1 or 2.

    On the scoreboard, you observe that the iith competitor has attained a score of S_i, which is a positive integer equal to the sum of the point values of all the problems they have solved.

    The scoreboard does not display the number of problems in the contest, nor their point values. Using the information available, you would like to determine the minimum possible number of problems in the contest.
*/

function getMinProblemCount(N, S) {
    const s = [...new Set(S)].sort((a, b) => b - a)
    const max = s[0]

    //const max = Math.max(...s) //I tryed this first, but got runtime error on two cases

    if (s.every(v => v % 2 == 0)) return max / 2
    else return Math.floor(max / 2) + 1
}