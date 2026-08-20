from pathlib import Path
from dotenv import load_dotenv
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / '.env')
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/6.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY') or os.environ.get('SECRET_KEY') or 'dev-secret-key-change-me'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    #mes applications
    'store.apps.StoreConfig',
    'customer.apps.CustomerConfig',
    'vendeur.apps.VendeurConfig',
    'base.apps.BaseConfig',
    #
    'cities_light',
]

AUTH_USER_MODEL = 'base.User'


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'iit_store.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'iit_store.wsgi.application'


# Database
# https://docs.djangoproject.com/en/6.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': os.environ.get('ENGINE', 'django.db.backends.postgresql'),
        'NAME': os.environ.get('NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('PASSWORD'),
        'HOST': os.environ.get('HOST'),
        'PORT': os.environ.get('PORT'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/6.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/6.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/6.0/howto/static-files/

STATIC_URL = 'static/'

STATICFILES_DIRS = [
    BASE_DIR / "static",
]

STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_ROOT = BASE_DIR / "media"
MEDIA_URL = '/media/'
#configurer cities-light

LANGUES_DE_TRANSLATION_LÉGÈRE_DES_VILLES = ['fr', 'en']
CITIES_LIGHT_INCLUDE_CITY_TYPES = ['PPL', 'PPLA', 'PPLA2', 'PPLA3', 'PPLA4', 'PPLC', 'PPLF', 'PPLG', 'PPLL', 'PPLR', 'PPLS', 'STLMT',]
# CITIES_LIGHT_INCLUDE_COUNTRIES = [
#     'CI',
#     'FR',
#     'DZ', # Algérie
#     'AO', # Angola
#     'BJ', # Bénin
#     'BW', # Botswana
#     'BF', # Burkina Faso
#     'BI', # Burundi
#     'CM', # Cameroun
#     'CV', # Cap-Vert
#     'CF', # Centrafrique
#     'TD', # Tchad
#     'KM', # Comores
#     'CG', # Congo
#     'CD', # RDC
#     'DJ', # Djibouti
#     'EG', # Égypte
#     'GQ', # Guinée équatoriale
#     'ER', # Érythrée
#     'SZ', # Eswatini
#     'ET', # Éthiopie
#     'GA', # Gabon
#     'GM', # Gambie
#     'GH', # Ghana
#     'GN', # Guinée
#     'GW', # Guinée-Bissau
#     'KE', # Kenya
#     'LS', # Lesotho
#     'LR', # Liberia
#     'LY', # Libye
#     'MG', # Madagascar
#     'MW', # Malawi
#     'ML', # Mali
#     'MR', # Mauritanie
#     'MU', # Maurice
#     'MA', # Maroc
#     'MZ', # Mozambique
#     'NA', # Namibie
#     'NE', # Niger
#     'NG', # Nigeria
#     'RW', # Rwanda
#     'ST', # Sao Tomé-et-Principe
#     'SN', # Sénégal
#     'SC', # Seychelles
#     'SL', # Sierra Leone
#     'SO', # Somalie
#     'ZA', # Afrique du Sud
#     'SS', # Soudan du Sud
#     'SD', # Soudan
#     'TZ', # Tanzanie
#     'TG', # Togo
#     'TN', # Tunisie
#     'UG', # Ouganda
#     'ZM', # Zambie
#     'ZW', # Zimbabwe,
#     ]