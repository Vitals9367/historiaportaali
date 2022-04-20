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
ENV NVM_DIR /var/www/html/.nvm
RUN mkdir -p /var/www/html/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh nvm install && source $NVM_DIR/nvm.sh nvm use && source $NVM_DIR/nvm.sh npm install"
