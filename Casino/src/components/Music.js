import React, {Component} from 'react';


export default class Music extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      play: true,
      pause: true,
    }
    this.url = "http://streaming.tdiradio.com:8000/house.mp3";
    this.audio = new Audio(this.url);
    this.play = this.play.bind(this)
  }

  play = () => {
// console.log("===========yha aaayaaa=====", this.audio.play())
  this.setState({ play: true, pause: false })
    this.audio.play();

  }
  
  pause = () => {

  this.setState({ play: false, pause: true })
    this.audio.pause();
  }
  
  // componentDidMount(){
  //   this.audio.addEventListener('ended', () => this.setState({ play: true }));

  //     console.log("=============yh chal rahaha===========99999======", this.audio.play())
  //     this.play()
  //   //   this.audio.play();

  // }
  render() {
    
  return (
    <div>
         {/* <div className="noDecoration NavigationItem_navigationItem__1D2Oq NavigationItem_navigationItemShrinkable__1uf6v" style={{ marginRight: "-13px" }}>
                            <div className="NavigationItem_iconAndTextContainer__2mSnT">
                                <div>
                                    <span className="isvg loaded" style={{ marginLeft: "-37px" }}>
                                        <img style={{ width: "53px", borderRadius: "10px", marginLeft: "11px" }} src="../images/casinoProfile.png"></img>


                                    </span>

                                </div>
                                <div>
                                    <span className="NavigationItem_name__CwRCo" style={{ color: "#fa2b2b" }}> 
                                    <button onClick={this.play}>Play</button>
                                     <button onClick={this.pause}>Pause</button></span><span className="NavigationItem_subtext__20smw ">
                                    </span>
                                </div>
                            </div>
                        </div> */}
                        <li> <button class="dropbtn" style={{ background: "transparent", border: "0px", paddingTop: "7px" }}><img style={{ width: "38px" }} src="../images/music.svg"></img></button>
                                            <span className="NavigationItem_name__CwRCo" style={{ color: "#fa2b2b" }}> 
                                            
                                            {this.state.pause ? (<span className="NavigationItem_name__CwRCo" onClick={this.play} style={{ color: "#fa2b2b" }}>Play </span>
                                            ):( <span className="NavigationItem_name__CwRCo" onClick={this.pause} style={{ color: "#fa2b2b" }}>Pause </span>)}
                                            </span>
                                            <span className="NavigationItem_subtext__20smw ">
                                            </span></li>

    </div>
    );
  }
}