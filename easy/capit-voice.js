window.onload = function(){
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.onresult = function(event){
        var busca = event.results[0][0].transcript.trim().toLowerCase();
        if(busca.indexOf("mudar para") > -1 ){
            busca = busca.substring(11,busca.length); 
        } 
        window.result = {
            res:busca,
        } 
    }
    recognition.start();
}

