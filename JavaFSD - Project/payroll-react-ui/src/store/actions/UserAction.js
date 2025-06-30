export const setUserDetails = (user) => ({
    type: 'SET_USER_DETAILS',
    payload: user
});

export const deleteUserDetails = () => ({
    type: 'DELETE_USER_DETAILS'
});