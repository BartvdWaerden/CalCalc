import calories from './module.calories.js';
import getData from './module.getData.js';
// import ydkjs from './module.ydkjs.js';

// import 'styles/global.css';
// // import 'styles/page.css';
// import 'styles/form.css';
// import 'styles/input.css';

calories.init();
getData.init({
    api: require( '../data/exercises.json' )
});

// ydkjs.init();
