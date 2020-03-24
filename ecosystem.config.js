/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
    apps: [
        {
            name: 'server-dev',
            script: 'src/index.ts',
            instances: 1,
            autorestart: true,
            watch: true,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
                DATABASE_NAME: 'postgres',
                DATABASE_PORT: 5432,
                DATABASE_USER: 'postgres',
                DATABASE_SCHEMA: 'public',
                DATABASE_PASSWORD: 'postgres',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
        {
            name: 'server-prod',
            script: 'lib/index.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
