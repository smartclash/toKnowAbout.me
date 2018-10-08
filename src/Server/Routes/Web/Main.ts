import {Router, Response, Request} from 'express';

class Main {
    private route: Router;

    constructor(router: Router) {
        this.route = router;
    }

    public bootstrap(): Router {
        this.index();

        return this.route;
    }

    private index(): Router {
        return this.route.get('/', (req: Request, res: Response) => {
            res.send('HELLO WORLD');
        });
    }
}

export default Main;
