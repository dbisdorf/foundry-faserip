const { HTMLField, NumberField, SchemaField, StringField, ArrayField, FilePathField } = foundry.data.fields;

/* -------------------------------------------- */
/*  Actor Models                                */
/* -------------------------------------------- */

class ActorDataModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
        abilities: new SchemaField({
            fighting: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            agility: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            strength: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            endurance: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            reason: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            intuition: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            psyche: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        }),        
        resources: new SchemaField({
            health: new SchemaField({
                value: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
                max: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
            }),
            karma: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
        }),
        secondary: new SchemaField({
            wealth: new NumberField({ required: true, integer: true, min: 0, initial: 0 }),
            fame: new NumberField({ required: true, integer: true, min: 0, initial: 0 })    
        }),
        contacts: new ArrayField(new StringField()),
        specialties: new ArrayField(new StringField()),
        weaknesses: new ArrayField(new StringField()),
        powers: new ArrayField(new SchemaField({
            name: new StringField({ required: true, blank: true}),
            modifiers: new StringField({ required: true, blank: true}),
            value: new NumberField({ required: true, integer: true, min: 0, initial: 0 })
        })),
        improvements: new ArrayField(new SchemaField({
            name: new StringField({ required: true, blank: true}),
            successes: new NumberField({ required: true, integer: true, min: 0, max: 3, initial: 0 })
        })),
        background: new SchemaField({
            realName: new StringField({ required: true, blank: true }),
            heroType: new StringField({ required: true, blank: true }),
            biography: new HTMLField({ required: true, blank: true }),
            fullPortrait: new FilePathField({ categories: ["IMAGE"], required: false, initial: data => 'icons/svg/mystery-man.svg' })
        })
    };
  }
}

export class HeroDataModel extends ActorDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      improvements: new ArrayField(new SchemaField({
        name: new StringField({ required: true, blank: true}),
        successes: new NumberField({ required: true, integer: true, min: 0, max: 3, initial: 0 })
      })),      
    };
  }
}

export class VillainDataModel extends ActorDataModel {
  static defineSchema() {
    return {
      ...super.defineSchema()
    };
  }
}
