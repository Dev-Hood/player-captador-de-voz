import {path} from "./utils.js";
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
        elements.actions.call(this);
        elements.botao.call(this);
        this.update();
        this.audio.onended = () => this.next();
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
    next(){
        this.currentPlaying++;
        if(this.currentPlaying == this.audioData.length) this.restart();
        this.update();
    },
    update(){
       
        this.currentAudio = this.audioData[this.currentPlaying];
        this.cover.style.background = `url('${path(
            this.currentAudio.cover
        )}') no-repeat center center / cover`;
        this.title.innerText = this.currentAudio.title;
        this.artist.innerText = this.currentAudio.artist;
        elements.createAudio.call(this, path(this.currentAudio.file))
        console.log(this.currentPlaying);
    },
    restart(){
        this.currentPlaying = 0; 
        this.update();
    },
    capAud(){
        console.log("boooo");
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
                        }
                    }
                } 
            }
            recognition.start();
            recognition.onend = ()=>{
                this.update();
                this.play();
            }
            
    }
}; 