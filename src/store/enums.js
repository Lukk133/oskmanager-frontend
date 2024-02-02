export const UserType = Object.freeze({
    STUDENT: 'STUDENT',
    INSTRUCTOR: 'INSTRUCTOR',
    USER: 'USER'
});

export const UserTypeNames = Object.freeze({
    [UserType.STUDENT]: 'Kursant',
    [UserType.INSTRUCTOR]: 'Instruktor',
    [UserType.USER]: 'Administrator',
});