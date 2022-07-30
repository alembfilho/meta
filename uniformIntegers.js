/*
    A positive integer is considered uniform if all of its digits are equal. For example, 222 is uniform, while 223 is not.
    Given two positive integers A and B, determine the number of uniform integers between A and B, inclusive.
*/

function getUniformIntegerCountInInterval(A, B) {
    let count = 0, n = 0

    // Receives a UI and returns the next
    const nextUI = ui => {
        ui = ui.toString()

        if (ui[0] == '9') return +Array(ui.length + 1).fill(1).join('')
        else return +ui.replace(new RegExp(ui[0], 'g'), 1 + +ui[0])
    }

    // Transforms A into the next UI
    const a = A.toString()
    n = +Array(a.length).fill(a[0]).join('')
    if (n < A) n = nextUI(n)
    if (n <= B) count++
    if (n == B) return count

    while (n <= B) {
        n = nextUI(n)
        count++
    }

    // Subtracts 1 if counted after the limits
    return n > B ? --count : count
}

console.log(getUniformIntegerCountInInterval(75, 300)) //Expects 5