import React, {Component} from 'react';


export default class MusicMobile extends React.Component {
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
                                             <div  className="noDecoration NavigationItem_navigationItem__1D2Oq NavigationItem_navigationItemNoRightBorder__1_2jI NavigationItem_navigationItemSidebar__18WmY" href="/">
                                        <div className="NavigationItem_iconAndTextContainer__2mSnT">
                                            <div>
                                                <span className="isvg loaded">
                                                    <img src="../images/music.svg" style={{ marginTop: "-10px", width: "53px" }}></img>

                                                    {/* <svg viewBox="0 0 17 15" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.341 10.36c-.536-.286-.25-.823 0-1.073.322-.322.716-1.431.716-1.431.644-.286.716-.751.787-1.073.286-.93-.43-1.074-.43-1.074s.573-1.538.108-2.719c-.609-1.538-3.077-2.11-3.507-.68-2.933-.643-2.325 3.4-2.325 3.4s-.715.142-.429 1.073c.072.322.143.787.787 1.073 0 0 .394 1.11.716 1.431.25.25.536.787 0 1.074-1.074.572-4.294.716-4.294 3.22h12.165c0-2.504-3.22-2.647-4.293-3.22z"></path></svg> */}
                                                </span>

                                            </div>
                                            <div>
                                            {/* <span className="NavigationItem_name__CwRCo" onClick={this.play}>Play</span> */}
                                                {this.state.pause ?(<span className="NavigationItem_name__CwRCo" onClick={this.play}>Play</span>):(<span className="NavigationItem_name__CwRCo" onClick={this.pause}>Pause</span>)}
                                                {/* <span className="NavigationItem_name__CwRCo" onClick={this.play}>Music</span> */}
                                                </div>
                                        </div>
                                    </div>
                        {/* <li> <button class="dropbtn" style={{ background: "transparent", border: "0px", paddingTop: "7px" }}><img style={{ width: "38px" }} src="../images/music.svg"></img></button>
                                            <span className="NavigationItem_name__CwRCo" style={{ color: "#fa2b2b" }}> 
                                            
                                            {this.state.pause ? (<span className="NavigationItem_name__CwRCo" onClick={this.play} style={{ color: "#fa2b2b" }}>Play </span>
                                            ):( <span className="NavigationItem_name__CwRCo" onClick={this.pause} style={{ color: "#fa2b2b" }}>Pause </span>)}
                                            </span>
                                            <span className="NavigationItem_subtext__20smw ">
                                            </span></li> */}

    </div>
    );
  }
}