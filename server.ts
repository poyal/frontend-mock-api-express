import 'reflect-metadata';
import cors from 'cors';
import express, {Application} from 'express';
import {attachControllers} from '@decorators/express';
import bodyParser from 'body-parser';

import {Controllers} from '@/main';

const app: Application = express();

attachControllers(app, Controllers);
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({origin: '*'}));
app.use('/uploads/images', express.static('public/upload'));

const PORT: number = 8080;
app
  .listen(PORT, 'localhost', function () {
    const server: string = `http://localhost:${PORT}`;
    console.log(`SERVER: ${server}`);
    console.log(`IMAGE UPLOAD: ${server}/uploads/images`);
  })
  .on('error', (error: any) => {
    if (error.code === 'EADDRINUSE') {
      console.log('Error: address already in use');
    } else {
      console.error(error);
    }
  });
