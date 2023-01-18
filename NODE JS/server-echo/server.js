const WebSocket = require("ws"); // per includere un modulo usiamo
const PORT = 5000;
let  clients=[];
const wsServer = new WebSocket.Server({
    // su quale porta userà il server
    // risponderà ipComputer:portaInserita da noi
    port: PORT
}); // stiamo creando un oggetto di tipo WebSocket.Server() {} passiamo un paramatro oggetto
// uno dei comandi più importanti è on() ovvero evento
console.log("Il Server è attivo e aspetta pacchetti sulla porta " + wsServer.options.port );

wsServer.on("connection" , function(socket) 
{
    console.log("un client si è appena connesso, i dati del client sono: ");
    let operazione="";
    clients.push(socket);
    socket.on("message" , function(msg)
    {
            let res=1;
            console.log("messaggio inviato dal client: "+msg);
            if(isNaN(msg)==false)
            {
                if(operazione=="moltiplica")
                {
                    socket.send(msg*msg);
                }
                if(operazione=="raddoppia")
                {
                socket.send(msg*2);
                }
                if(operazione=="fattoriale")
                {
                    for(i=msg;i>1;i--)
                    {
                    res=res*i;
                    }
                    console.log(res);
                    socket.send(res);

                }
                
            }
            else if(msg=="fattoriale"||msg=="raddoppia"||msg=="moltiplica")
            {
                operazione=msg;
                socket.send("OPERAZIONE SCELTA: "+ operazione);
            }
            else if(operazione=="")
            {
                socket.send("SCEGLI PRIMA L'OPERAZIONE E POI INSERISCI IL NUMERO");
            }
            else
            {
                socket.send();
            }
        }
        )
});
// console.log(wsServer.options.port)
