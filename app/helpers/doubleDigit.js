const doubleDigit = function doubleDigit(digit = 0) {
    let final = digit;
    if(digit >= 0 && digit < 10) {
        final = '0' + digit;
    }
    return final;
};
export default doubleDigit;
