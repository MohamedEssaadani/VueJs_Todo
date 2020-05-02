import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        todosList: [{
                id: 1,
                title: "Complete Schop Refactoring",
                completed: true,
                editing: false
            },
            {
                id: 2,
                title: "Create Todos List Vue Js",
                completed: true,
                editing: false
            },
            {
                id: 3,
                title: "Practice ELOQUENT",
                completed: false,
                editing: false
            },
            {
                id: 4,
                title: "Do Axios Get Request",
                completed: false,
                editing: false
            }
        ],
        filter: "all",
    },
    getters: {
        remaining(state) {
            return state.todosList.filter(todo => !todo.completed).length;
        },
        anyRemaining(state, getters) {
            return getters.remaining == 0;
        },
        todosListFiltered(state) {
            if (state.filter == "active") {
                return state.todosList.filter(todo => !todo.completed);
            }
            if (state.filter == "completed") {
                return state.todosList.filter(todo => todo.completed);
            }
            return state.todosList;
        },
        showClearCompleted(state) {
            //create new array for the completed todos
            let todosCompleted = state.todosList.filter(
                todo => todo.completed
            );

            //return true if there is completed todos & false if not
            return todosCompleted.length > 0;
        }
    },
    mutations: {
        addTodo(state, todo) {
            state.todosList.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                editing: false
            });
        },
        removeTodo(state, id) {
            const index = state.todosList.findIndex(
                todo => todo.id == id
            );
            state.todosList.splice(index, 1);
        },
        updateTodo(state, todo) {
            //get index of updated item by id passed from todo-item component
            const index = state.todosList.findIndex(
                item => item.id == todo.id
            );
            //remove old todo & replace it with new todo
            state.todosList.splice(index, 1, todo);
        },
        clearCompleted(state) {
            state.todosList = state.todosList.filter(
                todo => !todo.completed
            );
        },
        checkAll(state, checked) {
            state.todosList.forEach(
                todo => (todo.completed = checked)
            );
        },
        changeFilter(state, choice) {
            state.filter = choice;
        }
    },
    actions: {
        addTodo(context, todo) {
            context.commit('addTodo', todo);
        },
        removeTodo(context, id) {
            context.commit('removeTodo', id);
        },
        updateTodo(context, todo) {
            context.commit('updateTodo', todo);

        },
        clearCompleted(context) {
            context.commit('clearCompleted');
        },
        checkAll(context, checked) {
            context.commit('checkAll', checked);
        },
        changeFilter(context, choice) {
            context.commit('changeFilter', choice);
        }
    }
})