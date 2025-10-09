export class Controllers {

    static Controllers = [];
    static name;

    static addController(controller) {
        this.Controllers[controller.name] = controller;
    }

    static init(controller){
        this.addController(controller);
    }
}