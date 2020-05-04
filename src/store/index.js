import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'


Vue.use(Vuex);

//set default url for API
Axios.defaults.baseURL = "http://localhost:8000/api";

export const store = new Vuex.Store({
    state: {
        todosList: [],
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
        getTodos(state, todos) {
            state.todosList = todos;
        },
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
        getTodos(context) {
            Axios.get('/todos')
                .then(response => {
                    context.commit('getTodos', response.data);
                })
                .catch(error => console.log(error));
        },
        addTodo(context, todo) {
            Axios.post('/todos', {
                    title: todo.title,
                    completed: todo.completed
                })
                .then(response => {
                    context.commit('addTodo', response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        removeTodo(context, id) {
            Axios.delete('/todos/' + id)
                .then(() => {
                    context.commit('removeTodo', id);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        updateTodo(context, todo) {
            Axios.patch('/todos/' + todo.id, {
                    title: todo.title,
                    completed: todo.completed
                })
                .then(response => {
                    context.commit('updateTodo', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        clearCompleted(context) {
            const completedTodos = context.state.todosList
                //return new array with specified condition
                .filter(todo => todo.completed)
                //return specific field from the array
                .map(todo => todo.id);
            Axios.delete('/clearCompleted', {
                    data: {
                        completedTodos: completedTodos
                    }
                })
                .then(response => {
                    console.log(response.data);
                    context.commit('clearCompleted');
                })
                .catch(error => {
                    console.log(error);
                });
        },
        checkAll(context, checked) {
            Axios.patch('/checkAll', {
                    //send completed property to make all todos (completed true)
                    completed: checked
                })
                .then(() => {
                    context.commit('checkAll', checked);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        changeFilter(context, choice) {
            context.commit('changeFilter', choice);
        }
    }
})