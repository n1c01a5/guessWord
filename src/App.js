import React, { Component} from 'react';
import './App.css';

const toutesLesLettres = [
  'A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

const phrases = [
  'CHAT',
  'MAISON',
  'CHUCK NORRIS'
]

class App extends Component {
  state = {
    phrase: this.genererPhrase(),
    lettresTrouves: [],
    essais: 0,
    gagne: false
  }

  genererPhrase() {
    return phrases[Math.floor(Math.random() * phrases.length)]
  }

  verifier(lettre) {
    const phrase = this.state.phrase.replace(/ /g, '');
    let lettresTrouves = this.state.lettresTrouves;

    if (!lettresTrouves.includes(lettre))
      for(var i=0; i<phrase.length; i++)
        if(phrase[i] === lettre)
          lettresTrouves.push(lettre);

    this.setState({ lettresTrouves })

    if(lettresTrouves.length === phrase.length)
      this.setState({gagne: true});

    this.setState({ essais: this.state.essais + 1 });
  }

  rejouer() {
    this.setState({
      phrase: this.genererPhrase(),
      lettresTrouves: [],
      essais: 0,
      gagne: false
    });
  }

  render() {
    const { gagne, phrase, lettresTrouves, essais } = this.state;

    return (
      <div className="App">
        <h1>Jeu du pendu</h1>
        <div>Essais: {essais}</div>
        <div className="App-phrase">
        {
          phrase.split('').map((lettre, index) => (
            <span key={index}>
            {
              lettre === ' ' 
                ? <span className="App-espaceBlanc"> </span>
                : lettresTrouves.includes(lettre)
                  ? <span className="App-lettre">{lettre}</span>  
                  : <span className="App-lettre">_</span>
            }
            </span>
          ))
        }
        </div>
        <div className="App-lettres">
        {
          gagne 
            ? <button className="App-buttonRejouer" onClick={() => this.rejouer()}>
                Rejouer
              </button>
            : toutesLesLettres.map((lettre, index) => (
              <span key={index}>
              {
                lettresTrouves.includes(lettre)
                  ? <span className="App-lettreTrouvee">{lettre}</span>  
                  : <span>
                      <button 
                        className="App-buttonLettre"
                        onClick={() => this.verifier(lettre)}
                      >
                        {lettre}
                      </button>
                    </span>
              }
              </span>
            ))
        }
        </div>
      </div>
    );
  }
}

export default App;
