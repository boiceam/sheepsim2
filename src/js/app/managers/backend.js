import Config from '../../data/config';

// Manages all backend interactions
export default class Backend {
    constructor() {
        this.url = Config.backend.url;
        this.connected = false;
        this.state = {
            "party": {},
            "business": {},
            "dmx": {},
        }
    }

    connect() {
        if(this.connected) {
            return;
        }

        const ws = new WebSocket(this.url);
        const context = this;

        ws.onopen = (event) => {
            console.log('WebSocket Connected');
            context.connected = true;
        };

        ws.onclose = (event) => {
            console.log('WebSocket Disconnected');
            context.connected = false;
            setTimeout(() => {
                context.connect();
            }, 3000);
        };

        ws.onmessage = (event) => {
            //console.log(`WS: ${event.data}`);
            context.updateState(event.data);
        };

        ws.onerror = (event) => {
            console.log(`error=${event}`);
        };
    }

    updateState(data){
        const updates = data.split("\n");
        for(let i=0; i<updates.length; i++){
            const parts = updates[i].split(" ");
            if(parts[0] === "p") {
                const panel = Number(parts[1]);
                let rgb = parts[2].split(",");
                rgb = [Number(rgb[0]),  Number(rgb[1]),  Number(rgb[2])];
                this.state.party[panel] = rgb
            } else if(parts[0] === "b") {
                const panel = Number(parts[1]);
                let rgb = parts[2].split(",");
                rgb = [Number(rgb[0]),  Number(rgb[1]),  Number(rgb[2])];
                this.state.business[panel] = rgb
            } else if(parts[0] === "dmx") {
                const channel = Number(parts[1]);
                this.state.dmx[channel] = Number(parts[2]);
            }
        }
        console.log("got update");
    }

    getState() {
        return this.state;
    }
}