module.exports = {
  apps: [
    {
      name: 'psychika-api',
      script: './dist/bin/www.js', // Entry point of your application
      instances: 1, // Number of instances to run
      exec_mode: 'fork', // Can be 'fork' or 'cluster'
      watch: true, // Enable watch and restart the app on changes
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        // Add any other environment variables here
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 80,
        // Add any production-specific environment variables here
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z', // Log date format
    },
  ],
};
