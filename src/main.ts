import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'c',
      saveUninitialized: false,
      resave: false,
      cookie: { maxAge: 86400000 }
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(PORT, () => {
    console.log(`Server started, port: ${PORT}`)
  });
}
bootstrap();
