import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeederService } from '../utils/seeder';

async function seed() {
  const app = await NestFactory.create(AppModule);
  const seederService = app.get(SeederService);

  try {
    await seederService.seedSkills();
    await seederService.seedAdminUser();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await app.close();
  }
}

seed();
