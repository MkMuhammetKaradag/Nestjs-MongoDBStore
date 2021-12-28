import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as connectMongo from 'connect-mongodb-session';
const MongoDBStore = connectMongo(session);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  var store = new MongoDBStore({
    uri: 'mongodb://localhost/nestEgitim',
    collection: 'Session',
    expires: 1000 * 6,
  });
  store.on('error', function (error) {
    console.log(error);
  });

  app.use(
    session({
      name: 'NESTJS_SESSION_ID',
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 6000,
      },
      store: store,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
