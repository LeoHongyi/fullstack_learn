/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
        'postcss-import': {},
        'postcss-nesting': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
        'postcss-mixins': {},
    },
};

export default config;
