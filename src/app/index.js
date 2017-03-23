import calories from './calories.js';
import exercise from './exercise.js';
// import ydkjs from './ydkjs.js';

// import 'styles/global.css';
// // import 'styles/page.css';
// import 'styles/form.css';
// import 'styles/input.css';

calories.init();
exercise.init({
    url: require( '../data/exercises.json' )
});

// ydkjs.init();
