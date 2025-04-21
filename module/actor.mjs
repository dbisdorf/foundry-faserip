export class FaseripActor extends Actor {

    prepareData() {
        super.prepareData();
        this.system.resources.health.max =
            this.system.abilities.fighting +
            this.system.abilities.agility +
            this.system.abilities.strength +
            this.system.abilities.endurance;        
    }
}