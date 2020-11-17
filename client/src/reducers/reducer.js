const initialState = {
    players: {},
    search: "",
    ordering: "",
    page: 1
}

export default (state = initialState, action) => {
    switch(action.type){
        case 'PLAYERS':
            return{ 
                ...state,
                players: action.players
            }
        case 'SEARCH':
            return{
                ...state,
                search: action.search,
            }
        case 'ORDERING':
            return{
                ...state,
                ordering: action.ordering,
            }
        case 'PAGE':
            return{
                ...state,
                page: action.page,
            }
        default:
            return state
    }
}