import { serve, ServeOnRequestArgs } from 'esbuild';
import process from 'node:process';
import { baseBuildOptions } from './shared';
import http from 'node:http';

const rewritePaths = ['/signin', '/authcomplete'];

const logRequest = ({
    method,
    path,
    remoteAddress,
    status,
}: ServeOnRequestArgs) =>
    console.log(`${method} ${remoteAddress} ${path} ${status}`);

serve(
    { host: 'localhost', servedir: 'public', onRequest: logRequest },
    {
        ...baseBuildOptions,
        outfile: 'public/bundle.js',
    }
)
    .then(({ host, port }) => {
        console.log(`Running at http://${host}:3002`);

        http.createServer((req, res) => {
            console.log(`--->> ${req.url}`);
            if (rewritePaths.includes(req.url!)) {
                console.log(`REWRITE ${req.url} -----> /`);
                req.url = '';
            }

            if (req.url?.startsWith('/authcomplete')) {
                console.log(`REWRITE ${req.url} -----> /`);
                req.url = '';
            }

            const options: http.RequestOptions = {
                hostname: host,
                port,
                path: req.url,

                method: req.method,
                headers: req.headers,
            };

            const proxyReq = http.request(options, (proxyRes) => {
                res.writeHead(proxyRes.statusCode!, proxyRes.headers);
                proxyRes.pipe(res, { end: true });
            });

            req.pipe(proxyReq, { end: true });
        }).listen(3002);
    })
    .catch(() => process.exit(1));
