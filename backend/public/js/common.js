function getSemester(sem) {
    const currYear = new Date().getFullYear();
    switch (sem) {
        case '1st':
            return currYear;
            break;
        case '2nd':
            return currYear - 1;
            break;
        case '3rd':
            return currYear - 1;
            break;
        case '4th':
            return currYear - 2;
            break;
        case '5th':
            return currYear - 1;
            break;
        case '6th':
            return currYear - 2;
            break;
        default:
            return null;
            break;
    }
}
