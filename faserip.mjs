import { FaseripActor } from "./module/actor.mjs";
import { FaseripActorSheet } from "./module/actor-sheet.mjs"
import { HeroDataModel, VillainDataModel } from "./module/data-models.mjs";
import { preloadHandlebarsTemplates } from './module/templates.mjs';
import { FASERIP } from "./module/config.mjs";

Hooks.once("init", () => {
  // Constants.
  CONFIG.FASERIP = FASERIP;

  // Configure custom Document implementations.
  CONFIG.Actor.documentClass = FaseripActor;

  // Configure System Data Models.
  CONFIG.Actor.dataModels = {
    hero: HeroDataModel,
    villain: VillainDataModel,
  };

  // Configure trackable attributes.
  CONFIG.Actor.trackableAttributes = {
    hero: {
      bar: ["resources.health"],
      value: []
    }
  };

  // Configure initiative.
  CONFIG.Combat.initiative = {
    formula: "1d100",
    decimals: 0
  };

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("faserip", FaseripActorSheet, {
    types: ["hero", "villain"],
    makeDefault: true,
    label: "FASERIP.SheetClassHero"
  });  

  return preloadHandlebarsTemplates();
});

/*
Hooks.on("preUpdateActor", (actor, data, options, userId) => {
  let health = 
    actor.system.abilities.fighting +
    actor.system.abilities.agility +
    actor.system.abilities.strength +
    actor.system.abilities.endurance;
  //actor.system.resources.health.max = health;
  //actor.update({'system.resources.health.max': health});
});
*/