let maqueencb: Action
let maqueenmycb: Action
let maqueene = "1"
let maqueenparam = 0
let alreadyInit = 0
let IrPressEvent = 0
let irLed = Pins.P0
const MOTER_ADDRESSS = 0x10


//% weight=10 color=#019b9b icon="\uf121" block="IR Receiver"
namespace maqueen {

    export class Packeta {
        public mye: string;
        public myparam: number;
    }

    //% advanced=true shim=maqueenIR::initIR
    function initIR(pin: Pins): void {
        return
    }
    //% advanced=true shim=maqueenIR::onPressEvent
    function onPressEvent(btn: RemoteButton, body: Action): void {
        return
    }
    //% advanced=true shim=maqueenIR::getParam
    function getParam(): number {
        return 0
    }

    function maqueenInit(): void {
        if (alreadyInit == 1) {
            return
        }
        initIR(irLed)
        alreadyInit = 1
    }

  
    /**
     *  Set the IR Receiver Pin.
     */
    //% blockId=setREC_pin block="Set IR Receiver Pin: %myPin" blockExternalInputs=false
    //% weight=85 blockGap=10
    //% myPin.fieldEditor="gridpicker" myPin.fieldOptions.columns=4
    //% myPin.fieldOptions.tooltips="false" myPin.fieldOptions.width="300"
    export function IR_callbackUser(myPin: Pins, maqueencb: (message: number) => void) {
	   irLed = myPin;
        maqueenInit();
        IR_callback(() => {
            const packet = new Packeta();
            packet.mye = maqueene;
            maqueenparam = getParam();
            packet.myparam = maqueenparam;
            maqueencb(packet.myparam);
        });
    }

    //% weight=10
    //% blockId=IR_read block="read IR"
    export function IR_read(): number {
        maqueenInit()
        return getParam()
    }
    
    function IR_callback(a: Action): void {
        maqueencb = a
        IrPressEvent += 1
        onPressEvent(IrPressEvent, maqueencb)
    }

}
