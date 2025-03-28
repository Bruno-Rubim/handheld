import { player } from "../game-objects.js";

export class Room {
    constructor({name='', playerStartPos={posX:0, posY:0}, loadObjects: loadObjects=()=>{}}){
        this.name = name;
        this.objectList = []
        this.leftRoom = null
        this.rightRoom = null
        this.upRoom = null
        this.downRoom = null
        this.colorNets={}
        this.playerStartPos = playerStartPos
        this.objectList.push(player)
        this.loaded = false
        this.loadObjects = loadObjects
    }
    spawnPlayer(){
        player.disc = null
        player.posX = this.playerStartPos.posX
        player.posY = this.playerStartPos.posY
    }
    loadRoom(){
        localStorage.setItem('lastRoom', this.name)
        this.objectList = [player]
        this.spawnPlayer()
        this.loaded = true
        this.loadObjects()
    }
    addLineToObjectList(buildFn, orientation, posStart, posEnd, fixedAxis){
        for(let i = posStart; i <= posEnd; i++){
            const obj = buildFn();
            if (orientation == 'x'){
                obj.posY = fixedAxis;
                obj.posX = i;
            } else {
                obj.posX = fixedAxis;
                obj.posY = i;
            }
            this.objectList.push(obj)
        }
    }
    forEachGameObject(funct, order){
        if (order && order == 'reversed') {
            for(let i = this.objectList.length -1; i >= 0; i--){
                funct(this.objectList[i])
            }
            return
        }
        for(let i = 0; i < this.objectList.length; i++){
            funct(this.objectList[i])
        }
    }
    findObjectByPosition(posX, posY, tags){
        for(let i = 0; i < this.objectList.length; i++){
            if (this.objectList[i].posX == posX &&
                this.objectList[i].posY == posY) {
                let hasTag = false
                for (let j = 0; j < tags.length; j++){
                    if (this.objectList[i].tags.includes(tags[j])){
                        hasTag = true
                        break
                    }
                }
                if (hasTag){
                    let object = this.objectList[i]
                    return object
                }
            }
        }
        return null
    }
    takeObjectByPosition(posX, posY, tags){
        for(let i = 0; i < this.objectList.length; i++){
            if (this.objectList[i].posX == posX &&
                this.objectList[i].posY == posY) {
                let hasTag = false
                for (let j = 0; j < tags.length; j++){
                    if (this.objectList[i].tags.includes(tags[j])){
                        hasTag = true
                        break
                    }
                }
                if (hasTag){
                    let object = this.objectList[i]
                    this.objectList.splice(i, 1);
                    return object
                }
            }
        }
        return null
    }
}