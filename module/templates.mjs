/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
    return loadTemplates([
      'systems/faserip/templates/actors/partials/actor-bio-tab.hbs',
      'systems/faserip/templates/actors/partials/actor-header.hbs',
      'systems/faserip/templates/actors/partials/hero-improve-tab.hbs',
      'systems/faserip/templates/actors/partials/actor-misc-tab.hbs',
      'systems/faserip/templates/actors/partials/actor-powers-tab.hbs'
    ]);
  };