module.exports = {
    apps: [
        {
            name: 'user-management',
            script: 'dist/server.js',
            watch: false,
            instances: 'max',
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
};