FROM php:8.0-apache

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Mongo drivers
RUN apt update
RUN apt install -y libcurl4-openssl-dev pkg-config libssl-dev
RUN pecl install mongodb
RUN echo 'extension=mongodb.so' > /usr/local/etc/php/php.ini

RUN pecl config-set php_ini /usr/local/etc/php/php.ini

# Enable rewrite module
RUN a2enmod rewrite && a2enmod headers

ENTRYPOINT [ "apache2-foreground" ]