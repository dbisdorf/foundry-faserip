export class FaseripActorSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ['faserip', 'sheet', 'actor'],
            width: 800,
            height: 600,
            tabs: [
            {
                navSelector: '.sheet-tabs',
                contentSelector: '.sheet-body',
                initial: 'powers',
            },
            ],
        });
    }

    /** @override */
    get template() {
        const path = "systems/faserip/templates/actors";
        return `${path}/actor-sheet.hbs`;
    }    

  /** @override */
  async getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();

    // Use a safe clone of the actor data for further operations.
    const actorData = this.document.toObject(false);

    // Add the actor's data to context.data for easier access, as well as flags.
    context.system = actorData.system;
    context.flags = actorData.flags;

    context.dropdownRanks = CONFIG.FASERIP.dropdownRanks;
    context.isHero = (this.actor.type == "hero");

    return context;
  }    

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // if (!this.isEditable) return;

    // power management
    html.on('click', '.power-control', (ev) => {
      let powers = this.actor.system.powers.slice();
      switch (ev.currentTarget.dataset.action) {
        case 'create':
          const power = this.actor.system.schema.getField('powers.element').initial();
          powers.push(power);
          this.actor.update({'system.powers': powers});
          break;
        case 'delete':
          powers.splice(ev.currentTarget.dataset.key, 1);
          this.actor.update({'system.powers': powers});
       }
    });
  
    // improvement management
    html.on('click', '.improve-control', (ev) => {
      let improvements = this.actor.system.improvements.slice();
      switch (ev.currentTarget.dataset.action) {
        case 'create':
          const improvement = this.actor.system.schema.getField('improvements.element').initial();
          improvements.push(improvement);
          this.actor.update({'system.improvements': improvements});
          break;
        case 'delete':
          improvements.splice(ev.currentTarget.dataset.key, 1);
          this.actor.update({'system.improvements': improvements});
      }
    });

    // update health
    //html.on('change', '.ability-control', (ev) => {

    //});

    // rollable abilities.
    html.on('click', '.rollable', this._onRoll.bind(this));
  }

  _onRoll(event) {
    const data = this.actor.system;
    const element = event.currentTarget;
    const dataset = element.dataset;    

    this.rollFeat(this.actor, dataset.rank, dataset.source);
  }

  async rollFeat(actor, rankValue, source) {
    let text = "";

    let roll = await new Roll("d100", actor.getRollData()).evaluate();

    if (roll) {
      let total = roll.total;

      const rankColumn = CONFIG.FASERIP.rollResults[rankValue];
      let result = "FASERIP.feat.white";
      if (total >= rankColumn[2]) {
        result = "FASERIP.feat.gold";
      } else if (total >= rankColumn[1]) {
        result = "FASERIP.feat.silver";
      } else if (total > rankColumn[0]) {
        result = "FASERIP.feat.bronze";
      }

      text = `<div class='roll-message'>`;
      //`<div>Feat of ${source}</div>`
      text += `<div class='roll-feat'>Feat of ${game.i18n.localize(source)}</div>`;
      text += `<div class='roll-result'>${game.i18n.localize(result)}</div>`;
      text += `</div>`;
    
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({actor: this.actor}),
        flavor: text,
        rollMode: game.settings.get("core", "rollMode")
      });    
    }
  }

  /*
  onManagePower(event, owner) {
    event.preventDefault();
    const a = event.currentTarget;
    const li = a.closest('li');
    const power = li.dataset.powerId
      ? owner.powers.get(li.dataset.powerId)
      : null;
    switch (a.dataset.action) {
      case 'create':
        let powers = this.actor.system.powers;
        const newPower = {name: "", value: 0};
        powers.push(newPower);
        this.actor.update({'system.powers': this.actor.system.powers});
      case 'delete':
        return power.delete();
    }
  } 
  */

}