import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserController } from './controllers/user.controller';
import { SwapController } from './controllers/swap.controller';
import { RatingController } from './controllers/rating.controller';
import { SkillController } from './controllers/skill.controller';
import { AdminController } from './controllers/admin.controller';

import { UserService } from './services/user.service';
import { SwapService } from './services/swap.service';
import { RatingService } from './services/rating.service';
import { SkillService } from './services/skill.service';
import { SeederService } from './utils/seeder';

import { User, UserSchema } from './schemas/user.schema';
import { Swap, SwapSchema } from './schemas/swap.schema';
import { Rating, RatingSchema } from './schemas/rating.schema';
import { Skill, SkillSchema } from './schemas/skill.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/skill-link',
    ),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Swap.name, schema: SwapSchema },
      { name: Rating.name, schema: RatingSchema },
      { name: Skill.name, schema: SkillSchema },
    ]),
  ],
  controllers: [
    AppController,
    UserController,
    SwapController,
    RatingController,
    SkillController,
    AdminController,
  ],
  providers: [
    AppService,
    UserService,
    SwapService,
    RatingService,
    SkillService,
    SeederService,
  ],
})
export class AppModule {}
