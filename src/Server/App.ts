import * as express from 'express';
import * as expressSession from 'express-session';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import Main from './Routes/Web/Main';
import { Server } from 'net';

/**
 * This is a class.
 */
class App {
    private app: express.Express;
    private router: express.Router;

    constructor() {
        this.app = express();
        this.router = express.Router();

        this.registerMiddlewares();
        this.registerRoutes();
    }

    private registerMiddlewares(): express.Express {
        let sessionConfig: expressSession.SessionOptions = {
            secret: 'i00ys3PXqczkhUURY4FmoPxP2KC2pNNj',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false
            }
        };

        if(this.app.get('env') == 'production') {
            this.app.set('trust proxy', 1);
            sessionConfig.cookie.secure = true;
        }

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser('i00ys3PXqczkhUURY4FmoPxP2KC2pNNj'));
        this.app.use(expressSession(sessionConfig));

        this.app.set('views', join(__dirname, '../..', 'src/Resources/Views'));
        this.app.set('view engine', 'twig');
        this.app.set('twig options', {
            allow_async: true,
            strict_variables: false
        });

        return this.app;
    }

    private registerRoutes(): express.Express {
        return this.app.use(new Main(this.router).bootstrap());
    }

    public startAwesomeness(port: number): Server {
        return this.app.listen(port, () => {
            console.log('Listening on port', port);
        });
    }
}

export default App;
