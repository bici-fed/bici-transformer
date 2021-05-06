import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './assets/css/resetNormalize.css'
import './assets/css/basic.css'
import './assets/css/property.css'
import './assets/css/resetAntD.css'
import './assets/css/g6/g6Basic.css'
import './assets/css/g6/g6Topology.css'

moment.locale('zh-cn');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
