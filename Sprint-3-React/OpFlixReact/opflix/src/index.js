import {Route, Link, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App';
import * as serviceWorker from './serviceWorker';
import Administrador from './pages/Administrador/Administrador';
import CadastroUsuario from './pages/CadastroUsuarioComum/CadastroUsuario';
import Login from './pages/Login/Login';
import TelaDetalhesFilmes from './pages/TelaDetalhesFilmes/TelaDetalhesFilmes';
import TelaInicialUsuario from './pages/TelaInicialUsuario/TelaInicialUsuario';

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/administrador' component={Administrador}/>
                <Route path='/cadastroUsuario' component={CadastroUsuario}/>
                <Route path='/login' component={Login}/>
                <Route path='/telaDetalhesFilmes' component={TelaDetalhesFilmes}/>
                <Route path='/telaInicialUsuario' component={TelaInicialUsuario}/>
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
