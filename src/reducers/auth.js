// By default user is not authenticated and by default there is no error message

const INITIAL_STATE = { // all caps because it is a truly constant variable
    authenticated: '',
    errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
    return state;
}
