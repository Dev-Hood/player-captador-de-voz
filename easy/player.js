import {path, secondsToMinutes} from "./utils.js";
import audios from "./data.js";
import elements from "./playerElements.js"
export default {
    audioData: audios,
    result1:{},
    currentAudio: {},
    currentPlaying: 0,
    isPlaying: false,
    start(){
        elements.get.call(this);
        elements.botao.call(this);
        this.update();
    },
    play(){
        this.isPlaying = true;
        this.audio.play();
        this.playPause.innerText = "pause"
    },
    pause(){
        this.isPlaying = false;
        this.audio.pause();
        this.playPause.innerText = "play_arrow";
    },
    togglePlayPause(){
        console.log('startou')
        if(this.isPlaying){
            this.pause();
        }else{
            this.play();
        }
    },
    toggleMute(){
        this.audio.muted = !this.audio.muted;
        this.mute.innerText = this.audio.muted ? "volume_down" : "volume_up"
    },
    next(){
        this.currentPlaying++;
        if(this.currentPlaying == this.audioData.length) this.restart();
        this.update();
        this.audio.play();
    },
    setVolume(value){
        this.audio.volume = value / 100;
    },
    setSeek(value){
        this.audio.currentTime = value;
    },
    timeUpdate(){
        this.currentDuration.innerText = secondsToMinutes(this.audio.currentTime);
        this.seekbar.value = this.audio.currentTime;
    },
    update(){
       
        this.currentAudio = this.audioData[this.currentPlaying];
        this.cover.style.background = `url('${path(
            this.currentAudio.cover
        )}') no-repeat center center / cover`;
        this.title.innerText = this.currentAudio.title[0].toUpperCase()+this.currentAudio.title.slice(1).toLowerCase();
        this.artist.innerText = "-"+this.currentAudio.artist;
        elements.createAudio.call(this, path(this.currentAudio.file))
        this.audio.onloadeddata = () => {
            elements.actions.call(this);
        }
    },
    restart(){
        this.currentPlaying = 0; 
        this.update();
    },
    capAud(){
        var recognition = new webkitSpeechRecognition();
        recognition.lang = "pt-BR";
        recognition.onresult = (event) => {
            var busca = event.results[0][0].transcript.trim().toLowerCase();
            if(busca.indexOf("mudar para") > -1 ){
                busca = busca.substring(11,busca.length); 
                    console.log(busca);
                    for (var i = 0; i < this.audioData.length; i++) {
                        if(this.audioData[i].title==busca){
                            this.currentPlaying=i;
                            this.update();
                            
                        }
                    }
            }
        }
        this.pause();
        recognition.start();
        recognition.onend = ()=>{
            this.play();
        }
    }
}; 