// @ts-ignore
import {createRequire} from 'module'
import {defineConfig} from 'vitepress'

export default defineConfig({
        lang: 'zh-CN',
        title: 'Openai Kira Org',
        base: "/Docs/",
        description: 'Kira Kira -- GPT related models.',

        lastUpdated: true,
        cleanUrls: true,
        locales: {
            root: {
                label: 'Chinese',
                lang: 'zh'
            },
            zh: {
                label: 'English',
                lang: 'en',
                link: '/en/'
            }
        },
        head: [['meta', {name: 'theme-color', content: '#3c8772'}]],
        themeConfig: {
            nav: nav(),
            sidebar: {
                '/guide/': sidebarGuide(),
                '/models/': sidebarModels()
            },
            editLink: {
                pattern: 'https://github.com/LLMKira/Docs/edit/main/docs/:path',
                text: 'Edit On GitHub'
            },

            socialLinks: [
                {icon: 'github', link: 'https://github.com/LLMKira/Openaibot'}
            ],
            footer: {
                message: 'Released under the GPL-later.',
                copyright: 'Copyright © 2023-present Kira'
            },
        },
    }
)


function nav() {
    return [
        {text: 'Deploy Guide', link: '/guide/getting-started', activeMatch: '/guide/'},
        {text: 'Dev Tutorials', link: '/models/start', activeMatch: '/models/'},
        {
            text: "About Repo",
            items: [
                {
                    text: 'Changelog',
                    link: 'https://github.com/LLMKira/Openaibot/pulls?q='
                }
            ]
        }
    ]
}

function sidebarGuide() {
    return [
        {
            text: 'Deploy',
            collapsed: false,
            items: [
                {text: 'Whats This', link: '/guide/whatskira'},
                {text: 'Getting Started', link: '/guide/getting-started'},
                {text: 'Configuration Service', link: '/guide/service'},
            ]
        },
        {
            text: 'User Guide',
            collapsed: false,
            items: [
                {text: 'Chat With Bot', link: '/guide/use'},
                {text: 'Command Use', link: '/guide/command'},
            ]
        }
    ]
}

function sidebarModels() {
    return [
        {
            text: 'Models',
            items: [
                {text: 'Api Intro', link: '/models/api_server'},
            ]
        }
    ]
}

