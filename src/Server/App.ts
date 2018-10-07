import * as express from 'express';
import * as expressSession from 'express-session';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import {join} from 'path';

export default class App {
    private app: express.Express;

    constructor() {
        this.app = express();

        this.registerMiddlewares();
        this.registerRoutes();
    }

    private registerMiddlewares(): express.Express {
        let sessionConfig: expressSession.SessionOptions = {
            secret: 'eO404&98Fij7z96574MsAO330E535WfG',
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
        this.app.use(cookieParser('eO404&98Fij7z96574MsAO330E535WfG'));
        this.app.use(expressSession(sessionConfig));

        this.app.set('views', join(__dirname, '../..', 'src/Resources/Views'));
        this.app.set('view engine', 'twig');
        this.app.set('twig options', {
            allow_async: true,
            strict_variables: false
        });

        return this.app;
    }

    private registerRoutes() {

    }

    public startAwesomeness() {
        return this.app.listen(8080, () => {
            console.log('Listening on port 8080');
        });
    }
}
