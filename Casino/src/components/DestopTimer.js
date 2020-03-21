import React, { Component } from 'react';




class DeskTimer extends  Component {
    socket = {};
    constructor(props) {
      super(props);
      this.state = { time: {}, seconds: null };
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
        //   this.socket = io(SOCKET,{ transport : ['websocket'] });
        //   console.log("==================",this.socket.emit('updateTime',{minute: this.state.time.m, second: this.state.time.s}))
        //   this.socket.emit('updateTime',)
        //   {minute: this.state.time.m, second: this.state.time.s})
        // console.log("=============djbwhvehfcdj=====",this.props,Date.now()-this.props.tradeExipreddAt)
  

    }
    // this.socket = io(SOCKET,{ transport : ['websocket'] });
  
    secondsToTime(secs){
        // console.log("==========iski maaa ka yh ayaayyaya======",secs)
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }
    componentWillMount(){
        // console.log("======-===============1=====t=yhhhhhh timer ka chal raha hai ya nahi=====",this.props)
        // if(this.props.start === 50 ){
            // var millis = this.props.tradeExipreddAt-this.props.currentTime
            // this.millisToMinutesAndSeconds(millis) 

            // this.startTimer()
            //     var minutes = Math.floor(millis / 60000);
            //     var seconds = ((millis % 60000) / 1000).toFixed(0);
            //     return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            //   }

        // }
        
    }
    
    componentDidMount() {
        console.log("===========99999999999999999=======startetdAt==startetdAt====",this.props.expiredAt - this.props.startetdAt)
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
      this.millisToMinutesAndSeconds(this.props.expiredAt - this.props.startetdAt) 

    }
     millisToMinutesAndSeconds(millis) {
        // var minutes = Math.floor(millis / 60000);
        var seconds = ((millis) / 1000).toFixed(0);
        // return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        // console.log("========================",seconds)
        this.setState({
            // time: this.secondsToTime(seconds),
            seconds: seconds,
          });
          this.timer = setInterval(this.countDown, 1000);


      }
    startTimer() {
      if (this.timer === 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
  
    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
    //   this.socket.emit('UPDATETIME',{minutes:this.state.time.m,seconds:this.state.time.s})
      // Check if we're at zero.
      if (seconds === 0) { 
        clearInterval(this.timer);
      }
    }
  
    render() {
      // console.log("=======timer==========",this.state)
      return(
    //     <div style={{textAlign: 'center', color: 'red', fontSize: "20px", marginTop:"-49px"}}>
    //       <button onClick={this.startTimer}>Start</button>
    //   <h3>Trade Is Locked For One Hour 
    //    <br/>Time Left-  {this.state.time.m} minutes {this.state.time.s} seconds</h3>
    // <span className="card1 card_timing" id="content-desktop">Next Game Start : {this.state.time.s}sec</span>
    <div className="bet_timing_font">{this.state.time.m} :{this.state.time.s} - SEC</div>

    //    <div style={{ display: "flex", justifyContent: "center" }}>
    //                                 <span className="card1 card_timing" id="content-mobile">Next Game Start :{this.state.time.s}sec</span>
    //                             </div>
          
        // </div>
      );
    }
  }

  export default DeskTimer
