import { _decorator, Component, Node, Label, Color, Button, log } from 'cc';
import Web3 from 'web3';

const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('sayHello')
// @executeInEditMode(true)
export class sayHello extends Component {

    @property(Label)
    public label

    @property(Label)
    public btnLabel

    @property(Button)
    public btn

    public address: string = '';


    async start() {
        this._textInit()
        this.btnLabel = this.btn.getComponentInChildren(Label);

        this.btn.node.on(Node.EventType.TOUCH_START, this.clickStart, this);
    }

    _textInit() {
        this.label.fontSize = 40;
        this.label.color = new Color(255, 255, 255);
        this.label.string = 'Not connected';
    }

    async clickStart() {
        if(this.address !== '' && this.address !== 'no ethereum') {
            this._disconnect();
            return 
        }
        await this._connect();

        this.label.string = this.address;
    }

    async _connect() {
        if ((window as any).ethereum === undefined) {
            console.log('no ethereum');
            this.address = 'no ethereum';
            return;
        }
        try {
            const res = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
            this.address = res[0];

            this.btnLabel.string = 'Disconnect';
        } catch (error) {
            console.log(error)
            this.address = 'no ethereum';
        }

    }

    // metamask disconnect
    _disconnect() {
        console.log('disconnect click')
        this.address = '';
        this.label.string = 'Not connected';
        this.btnLabel.string = 'Connect';
    }


    async onLoad() {
        // if (!(window as any).ethereum) {
        //     console.log('no ethereum');
        //     return;
        // }
        // console.log((window as any).ethereum);
        // const res = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        // console.log(res);
    }

    update(deltaTime: number) {

    }
}

