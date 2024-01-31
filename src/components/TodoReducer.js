
export const initialState = {
    todos: []
}

export const TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Add_Todo":
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case "Delete_Todo":
            return {
                ...state,
                todos: [...state.todos.filter(item => item.id != action.payload)]
            }
        case 'Toggle_Todo':
            return{
                ...state,
                todos: state.todos.map((item)=>
                item.id === action.payload.id
                ?{...item, completed:action.payload.check}
                :item
                )
            }
        case "Edit_Todo":
            return {
                ...state,
                todos: state.todos.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, text: action.payload.newText }
                        : item
                ),
            };


        case "Submit":
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        default:
            return state;
    }
}
