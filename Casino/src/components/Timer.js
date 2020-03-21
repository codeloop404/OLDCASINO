import React, { Component } from 'react';




class Timer extends  Component {
    socket = {};
    constructor(props) {
      super(props);
      this.state = { time: {}, seconds: null,timer:false };
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
   
  

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
        console.log("======-===============1=====t=yhhhhhh timer ka chal raha hai ya nahi=====",this.props)
        // if(this.props.start === 50 ){
            if(this.props.gameStatus){
                this.setState({time:true})
            }
            var millis = this.props.tradeExipreddAt-this.props.currentTime
            this.millisToMinutesAndSeconds(this.props.expiredAt - this.props.startetdAt) 
             
            // this.startTimer()
            //     var minutes = Math.floor(millis / 60000);
            //     var seconds = ((millis % 60000) / 1000).toFixed(0);
            //     return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            //   }

        // }
        
    }
    
    componentDidMount() {
        console.log("======-===============1=====90000000=yhhhhhh timer ka chal raha hai ya nahi=====",this.props.gameStatus)
        if(this.props.gameStatus){
            this.setState({time:true})
        }
        this.millisToMinutesAndSeconds(this.props.expiredAt - this.props.startetdAt) 
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });

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
      console.log(this.state.time.s == 0)
   
      return(
   
     
    
                                  <div className="bet_timing_font">{this.state.time.m}:{this.state.time.s} - SEC</div>
          
      
      );
    }
  
  }

  export default Timer
