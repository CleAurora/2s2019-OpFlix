import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
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
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado';

const PrivateRouting = ({ component: Component }) => (
    <Route
        render={props =>
            localStorage.getItem("usuario-opflix") !== null ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{ pathname: "/login", state: { from: props.location } }}
                    />
                )
        }
    />
);

const AdminPrivateRouting = ({ component: Component }) => (
    <Route
        render={props =>
            localStorage.getItem("usuario-opflix") !== null && localStorage.getItem("isAdmin-opflix") == "true" ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{ pathname: "/404", state: { from: props.location } }}
                    />
                )
        }
    />
);

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={App} />
                <AdminPrivateRouting path='/administrador' component={Administrador} />
                <AdminPrivateRouting path='/admCategoria' component={AdmCategoria} />
                <AdminPrivateRouting path='/admLancamento' component={AdmLancamento} />
                <AdminPrivateRouting path='/admTipo' component={AdmTipo} />
                <AdminPrivateRouting path='/admUsuario' component={AdmUsuario} />
                <AdminPrivateRouting path='/admVeiculo' component={AdmVeiculo} />
                <Route path='/cadastroUsuario' component={CadastroUsuario} />
                <Route path='/login' component={Login} />
                <PrivateRouting path='/telaDetalhesFilmes' component={TelaDetalhesFilmes} />
                <PrivateRouting path='/telaInicialUsuario' component={TelaInicialUsuario} />
                <Route component={NaoEncontrado} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
