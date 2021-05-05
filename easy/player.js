window.player = {
    cover: document.querySelector(".card-image"),
    title: document.querySelector(".card-content h5"),
    artist: document.querySelector(".artist"),
    audio: document.querySelector("audio"),
    audioData: audios,
    result1:{},
    currentAudio: {},
    currentPlaying: 0,
    start(){
        this.update();
        this.audio.onended = () => this.next();
    },
    next(){
        this.currentPlaying++;
        if(this.currentPlaying == this.audioData.length) this.restart();
        this.update();
    },
    update(){
        this.capAud();
        this.currentAudio = this.audioData[this.currentPlaying];
        this.cover.style.background = `url('${path(
            this.currentAudio.cover
        )}') no-repeat center center / cover`;
        this.title.innerText = this.currentAudio.title;
        this.artist.innerText = this.currentAudio.artist;
        this.audio.src = path(this.currentAudio.file);
        console.log(this.currentPlaying);
    },
    restart(){
        this.currentPlaying = 0; 
        this.update();
    },
    capAud(){
        document.querySelector(".mudar").addEventListener("click",()=> {
            var recognition = new webkitSpeechRecognition();
            recognition.lang = "pt-BR";
            recognition.onresult = function(event){
                var busca = event.results[0][0].transcript.trim().toLowerCase();
                if(busca.indexOf("mudar para") > -1 ){
                    busca = busca.substring(11,busca.length); 
                    console.log(busca);
                    for (var i = 0; i < player.audioData.length; i++) {
                        if(player.audioData[i].title==busca){
                            player.currentPlaying=i;
                        }
                    }
                } 
            }
            recognition.start();
           recognition.onend = ()=>{
                this.update();
            }
            
        });
    }
}; 