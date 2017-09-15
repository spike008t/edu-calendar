import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import moment from 'moment';
import 'moment/locale/fr';

import 'bootstrap/dist/css/bootstrap.css';

// force local fr
moment.locale('fr');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
