const isProd = process.env.NODE_ENV === 'production';
const rootDir = isProd ? 'dist' : 'src';
module.exports = {
  type: 'postgres',
  url: isProd ? process.env.DATABASE_URL : 'postgres://postgres:postgres@localhost:5432/test',
  synchronize: isProd,
  logging: !isProd,
  ssl: isProd,
  extra: isProd && {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: [rootDir + '/entity/**/*.{js,ts}'],
  migrations: [rootDir + '/migration/*.{js,ts}'],
  subscribers: [rootDir + '/subscriber/**/*.{js,ts}'],
  seeds: [rootDir + '/migration/seeds/**/*.{js,ts}'],
  factories: [rootDir + '/migration/factories/**/*.{js,ts}'],
};
