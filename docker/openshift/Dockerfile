FROM ghcr.io/city-of-helsinki/drupal-docker-base:8.0

COPY / /var/www/html/
WORKDIR /var/www/html
RUN composer install --no-progress --profile --prefer-dist --no-interaction --no-dev --optimize-autoloader
RUN composer dump-autoload --optimize

# Copy deploy script
COPY docker/openshift/entrypoints/20-deploy.sh /entrypoints
RUN chmod +x /entrypoints/20-deploy.sh

# Copy cron scripts
RUN mkdir /crons
COPY docker/openshift/crons/ /crons
RUN chmod +x /crons/*

# Install theme packages
WORKDIR /var/www/html/public/themes/custom/hdbt_subtheme
RUN unset NPM_CONFIG_PREFIX
RUN export NVM_DIR="/var/www/html/.nvm"
RUN curl -f -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
RUN [ -s "/var/www/html/.nvm/nvm.sh" ] && \. "/var/www/html/.nvm/nvm.sh"
RUN nvm install
RUN nvm use
RUN npm install
