import React, { Component } from 'react';
import Axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import GoogleMapReact from 'google-map-react';
import PinIcon from "../../assets/img/pin.jpg";

const Pin = ({ lancamento }) =>
  <div className="pin">
    <img scr={PinIcon} alt="Pin" className="pin-icon" />
    <p className="TituloPin">{lancamento.titulo}</p>
  </div>

export default class Mapa extends Component {
  constructor() {
    super();
    this.state = {
      localizacoes: [],
      carregarMapa: false,
    }
  }

  componentDidMount() {
    this.carregarLocalizaçoesLancamento();
    setTimeout(console.log(this.state.localizacoes), 1000)
  }

  carregarLocalizaçoesLancamento() {
    Axios.get('http://localhost:5000/api/localizacoes', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("usuario-opflix")
      }
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({ localizacoes: response.data });
        }
      })
      .then(this.setState({carregarMapa : true}));
  }

  createMapOptions(maps) {
    return {
      zoomControlOptions: {
        position: maps.ControlPositions.TOP_LEFT,
        style: maps.zoomControlStyle.SMALL
      },
      mapTypeControlOptions: {
        position: maps.ControlPositions.TOP_RIGHt
      },
    };
  }

  render() {
    console.log(this.state.localizacoes)
    return (
      <div>
        <Header funcao={this.logout} />
        <main>
          <h2>OpFlix pelo mundo!</h2>




          {this.state.carregarMapa === false ? <span /> :
            <div style={{
              height: '70vh',
              width: '100%',
            }}>
              <GoogleMapReact
                defaultCenter={{ lat: 25.7358492, lng: 42.1957196 }}
                defaultZoom={0}
                // options={this.createMapOptions}
              >

                {this.state.localizacoes.map(item => {
                  return (
                    <Pin
                      key={item.lancamento.titulo}
                      lat={item.latitude}
                      lng={item.longitude}
                      lancamento={item.lancamento}
                    />
                  )
                })}
              </GoogleMapReact>
            </div>
          }
        </main>
        <Footer />
      </div>
    )
  }
}