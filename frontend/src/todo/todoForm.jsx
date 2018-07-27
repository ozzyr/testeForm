import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { add, changeName, changeEmail, changeCity, search, clear } from './todoActions'

class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.search()
    }
    // atalho de teclado shift+enter - busca
    // atalho de teclado Enter - adiciona
    // atalho de teclado Escape - Limpa os campos.

    keyHandler(e) {
        const { add, clear, search, name, email, city } = this.props
        if (e.key === 'Enter') {
            e.shiftKey ? search() : add({ name, city, email })
        } else if (e.key === 'Escape') {
            clear()
        }
    }

    render() {
        const { add, search, name, email, city } = this.props
        return (
            <div role='form' className='todoForm'>
                <Grid cols='12 9 10'>
                    <label>Nome</label>
                    <input id='Name' className='form-control'
                        placeholder='Adicione um nome'
                        onChange={this.props.changeName}
                        onKeyUp={this.keyHandler}
                        value={this.props.name}></input>
                    <label>E-mail:</label>
                    <input id='Email' 
                        type='email' required
                        title="Must be a globex.com email address"
                        className='form-control'
                        placeholder='Adicione um email'
                        onChange={this.props.changeEmail}
                        onKeyUp={this.keyHandler}
                        value={this.props.email}
                        ></input>
                    <label>Cidade:</label>
                    <select id='City' className='form-control'
                        placeholder='Escolha uma cidade'
                        onChange={this.props.changeCity}
                        onKeyUp={this.keyHandler}
                        value={this.props.city}
                    >  
                        <option value='Amsterdam'>Amsterdam </option>
                        <option value='New York'>New Yourk</option>
                        <option value='São Paulo'>São Paulo</option>
                    </select>
                </Grid>
                <Grid cols='12 3 2'>
                    <IconButton style='primary' icon='plus'
                        onClick={() => add({ name, email, city })}></IconButton>
                    <IconButton style='info' icon='search'
                        onClick={search}></IconButton>
                    <IconButton style='default' icon='close'
                        onClick={this.props.clear}></IconButton>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    name: state.todo.name,
    email: state.todo.email,
    city: state.todo.city,
})
const mapDispatchToProps = dispatch =>
    bindActionCreators({ add, changeName, changeEmail, changeCity, search, clear }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)
