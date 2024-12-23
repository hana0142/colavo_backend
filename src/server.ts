import App from './index';
import IndexRoute from './routes/index.route';

const app = new App([new IndexRoute()]);

app.listen();