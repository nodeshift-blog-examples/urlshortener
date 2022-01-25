FROM php:8.0-apache

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Mongo drivers
RUN apt update
RUN apt install -y libcurl4-openssl-dev pkg-config libssl-dev git zip unzip
RUN pecl install mongodb
RUN echo 'extension=mongodb.so' > /usr/local/etc/php/php.ini

RUN pecl config-set php_ini /usr/local/etc/php/php.ini

# Enable modules
RUN a2enmod rewrite && a2enmod headers

# Copy files and server setup
WORKDIR /var/www/html
COPY . .
RUN sed -i 's/80/8080/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf
USER www-data
EXPOSE 8080
# Start server
CMD composer install && apachectl -D FOREGROUND
