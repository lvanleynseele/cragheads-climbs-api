import sanitizeHtml from 'sanitize-html';

export default {
  DATABASE_TIMEOUT: 30000,
  PDF_MAX_SIZE: 16777216, // 16 MB, this can be updated to values deemed to be enough for PDF
  LOGO_MAX_SIZE: 5242880, // 5 MB
  TEMP_UPLOAD_FOLDER: 'data/temp_uploads/',
  EVENT_DOCUMENT_S3_ROOT_FOLDER: 'event_documents',
  SCHEDULER_UPLOAD_FOLDER_CLEANUP_TASK_ID: 'SchedulerUploadFolderCleanup',
  SCHEDULER_UPLOAD_FOLDER_CLEANUP_INTERVAL: 600, // seconds
  SCHEDULER_UPLOAD_FOLDER_CLEANUP_INACTIVITY_PERIOD: 300, // seconds
  DEFAULT_PHRF_TOT_A_FACTOR: 650,
  DEFAULT_PHRF_TOT_B_FACTOR: 550,
  KG_TO_LBS_CONVERSION: 2.204,

  // # Image Dimensions Configurations #
  IMAGE_LINK_LOGO_MAX_WIDTH: 500,
  IMAGE_LINK_LOGO_MAX_HEIGHT: 150,
  IMAGE_SPONSOR_LOGO_MAX_WIDTH: 256,
  IMAGE_SPONSOR_LOGO_MAX_HEIGHT: 256,
  IMAGE_EVENT_LOGO_MAX_WIDTH: 800,
  IMAGE_EVENT_LOGO_MAX_HEIGHT: 100,
  // # Image Dimensions Configurations #

  // # Image File Types #
  ALLOWED_LOGO_TYPE: ['.jpg', '.png', '.gif'],
  HTML_SANITIZE_CONFIG: {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      a: ['href', 'name', 'target', 'class'],
      img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
      '*': [
        'style',
        'alt',
        'title',
        'width',
        'height',
        'loading',
        'class',
        'cellpadding',
        'cellspacing',
        'colspan',
        'border',
        'data-*',
        'autocomplete',
        'autofocus',
        'background',
        'bgcolor',
        'color',
        'cols',
        'decoding',
        'disabled',
        'for',
        'headers',
        'id',
        'label',
        'lang',
        'role',
        'scope',
        'size',
        'sizes',
        'slot',
        'spellcheck',
        'srcset',
        'start',
        'target',
        'title',
        'translate',
        'type',
        'value',
      ],
    },
  } as unknown as sanitizeHtml.IOptions,
  API_URL: process.env.API_URL ?? '',
  API_STRIPE_CONNECT_REFRESH_PATH: 'refresh-connect',
  S3_STATIC_ASSET_BASE_URL: process.env.S3_STATIC_ASSET_BASE_URL ?? '',
  DEFAULT_PAGINATION_VALUES: {
    page: 1,
    size: 10,
    sort: 'default',
  },
  TEMPORARY_ACCESS_TOKEN_LIFETIME_MS: 12 * 60 * 60 * 1000,
  DEFAULT_EMAIL_REPLY_TO: 'liamvanleynseele@cragheads.com',
};
