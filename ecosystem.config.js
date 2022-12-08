module.exports = {
    apps: [
        {
            name: 'combocurve-api',
            script: './index.js',
            env_staging: {
                DEBUG: 'combocurve-api:*',
                ENV_PATH: '/home/ubuntu/.env',
            },
            env_production: {
                DEBUG: 'combocurve-api:*',
                ENV_PATH: '/home/ubuntu/.env',
            },
        },
    ],
};
