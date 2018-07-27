import React from 'react'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

export default props => (
    <div>
        <PageHeader name='Cadastro' small='usários'></PageHeader>
        <TodoForm />
        <TodoList />
    </div>
)