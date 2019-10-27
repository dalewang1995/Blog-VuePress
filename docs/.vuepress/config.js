
// const path = require('path')
// console.log('adwdawd',path.join(__dirname, './public'))

module.exports = {
    title: "dale's blog",
    head: [
        ['meta', { 'http-equiv': 'cache-control', content: 'no-cache, no-store, must-revalidate' }],
        ['meta', { 'http-equiv': 'pragma', content: 'no-cache' }],
        ['meta', { 'http-equiv': 'expires', content: '0' }],
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    description: '汪小鱼的个人站点',
    base: '/Blog-VuePress/',
    dest: 'site',
    configureWebpack: {
        resolve: {
          alias: {
            '@img': '../images'
          }
        }
    },
    themeConfig: {
        sidebarDepth: 0,
        repo: 'https://github.com/dalewang1995/Blog-VuePress',
        docsRepo: 'https://github.com/dalewang1995/Blog-VuePress',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: '帮助我改进页面内容！',
        lastUpdated: '最后更新时间',
        nav: [
            { text: "Home", link: "/" }
        ],
        sidebar: [
            {
                key: 'project',
                title: 'Project',
                collapsable: true,
                children: [
                    'project/cookie.md',
                    'project/canvas-image-compression.md',
                    'project/H5-msg-tel.md',
                    'project/H5-return-btn.md',
                    'project/input-autofill.md',
                    'project/UI-mp.md',
                    'project/css-animation.md'
                ]
            },
            {
                key: 'js',
                title: 'JS',
                collapsable: true,
                children: [
                    'js/ES5.md',
                    'js/fetch.md',
                    'js/JavaScript-types.md',
                    'js/airbnb-javascript-study.md'
                ]
            },
            {
                key: 'server',
                title: 'Server',
                collapsable: true,
                children: [
                    'server/ssr-readme.md',
                ]

            },
            {
                key: 'vue',
                title: 'VUE',
                collapsable: true,
                children: [
                    'vue/vue-components.md',
                    'vue/vue-data-binding.md'
                ]

            },
            {
                key: 'devTools',
                title: '效率工具',
                collapsable: true,
                children: [
                    'devTools/fontend-tools.md'
                ]

            },
            {
                key: 'essay',
                title: '随笔',
                collapsable: true,
                children: [
                    'essay/2048web.md',
                    'essay/blog-history.md',
                    'essay/about-me.md'
                ]

            }
        ]
    }
}
