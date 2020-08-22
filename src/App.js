import React from 'react';
import './App.css';

class Drumpad extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
    window.focus()
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  
  handleKeyDown = (e) => {
    if(e.keyCode === this.props.keyCode) {
      const sound = document.getElementById(this.props.keyTrigger);
      sound.play()
      sound.currentTime = 0
      this.props.handleKey(this.props.clipId)      
    }
  }
  
  handleClick = () => {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.play()
    sound.currentTime = 0
    this.props.handleKey(this.props.clipId)
   }

  
  
  render() {
  return (
      <button className="drum-pad" onClick={this.handleClick} id={this.props.clipId}>
      <h1>{this.props.keyTrigger}</h1>
      <audio 
        ref={ref => this.sound = ref}
        className='clip' 
        id={this.props.keyTrigger} 
        src={this.props.clip}>
      </audio>
      </button>
  )
  }   
}

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      power: false, 
      bank: false,
      sliderVal: 0.3,
      display: '',
      currentPadBank: keyHeaterKit,
      currentPadBankId: 'Heater Kit'
    }
    this.handleKey = this.handleKey.bind(this)
    this.handlePower = this.handlePower.bind(this)
    this.handleBank = this.handleBank.bind(this)
    this.handleSound = this.handleSound.bind(this)
  }
  handleKey(name) {    
    this.setState({
      display: name
    });    
  }
  handlePower() {
    this.setState({
      power: !this.state.power
    });    
  }
  handleBank() {
    if (this.state.power) {
      this.state.currentPadBankId === 'Heater Kit' ?
        this.setState({
          currentPadBank: keySmoothPianoKit,
          display: 'Smooth Piano Kit',
          currentPadBankId: 'Smooth Piano Kit',
        }) :
        this.setState({
          currentPadBank: keyHeaterKit,
          display: 'Heater Kit',
          currentPadBankId: 'Heater Kit',
        });
    }
  }
  handleSound(e) {
    if (this.state.power) {
    this.setState({
      sliderVal: e.target.value,
      display: "Volume:" + Math.round(e.target.value * 100)
    });    
    }
  }
  render() {
    const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach(sound => {
      sound.volume = this.state.sliderVal
    });
    
    let padBank;
    this.state.power ?
      padBank = this.state.currentPadBank.map((key) => {
      return (
           <Drumpad 
					clipId={key.id} 
					clip={key.url}
					keyTrigger={key.keyTrigger}
					keyCode={key.keyCode}           
          power={this.state.power}
          currentPadBank={this.state.currentPadBank}
          handleKey={this.handleKey} />
      )
    }) :
      padBank = this.state.currentPadBank.map((key) => {
      return (
           <Drumpad 
					clipId=""
					clip="#"
					keyTrigger={key.keyTrigger}
					keyCode={key.keyCode}           
          power={this.state.power}
          currentPadBank={this.state.currentPadBank}
          handleKey={this.handleKey} />
      )
    })                                               
    
    return (
      <div id="drum-machine">
        <div className="drum-pad-area">          
          {padBank} 
        </div>               
        <div className="display-area">
          <Powerswitch
            onClickPower={this.handlePower}
            text="Power" />
          <Volume
            onClickVolume={this.handleSound}
            />
          <Display
            display={this.state.display} />     
          <Bankswitch
            onClickBank={this.handleBank}
            text="Bank" />         
        </div>
      </div>    
    )
  }
};



const Powerswitch = (props) => {
  return (
    <div class="switch">
      <span class="switch-title">{props.text}</span>
      <div className="select" >
      <label class="switch__label">
        <input type="checkbox" class="switch__input" onClick={props.onClickPower}/>
          <span class="switch__content"></span>
          <span class="switch__circle"></span>
      </label>
      </div>
    </div>
  )
}

const Volume = (props) => {
  return(
    <div class="volume">
      <input type="range" min="0" max="1" step="0.01" value={props.sliderVal} onChange={props.onClickVolume} />
    </div>
  )
}

const Display = (props) => {                                      
  return (
    // <div id="display">{props.display}</div>  
    <div id="display"><h3>{props.display}</h3></div>
  )
}

const Bankswitch = (props) => {
  return (
    <div className="switch" >
      <span className="switch-title">{props.text}</span>
      <div className="select" >
      <label className="switch__label" >
        <input type="checkbox" class="switch__input" onClick={props.onClickBank}/>
          <span className="switch__content"></span>
          <span className="switch__circle"></span>
      </label>
      </div>
    </div>
  )
}



const keyHeaterKit = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  }, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  }, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  }, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  }, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  }, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  }, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  }, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  }, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];

const keySmoothPianoKit = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}];

const switchBank = [
  "Heater Kit",
  "Smooth Piano Kit"
]


export default App;
