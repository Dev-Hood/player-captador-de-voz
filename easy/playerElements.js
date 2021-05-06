export default {
    get(){
        this.cover = document.querySelector(".card-image");
        this.title = document.querySelector(".card-content h5");
        this.artist = document.querySelector(".artist");
        this.playPause = document.querySelector("#play-pause");
        this.muda = document.querySelector("#mudar");
    },
    createAudio(audio){
        this.audio = new Audio(audio)
    },
    actions(){
        this.playPause.onclick = () => this.togglePlayPause();
    },
    botao(){
        this.muda.onclick = () => this.capAud();
    }
}