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
                '/plugin/': sidebarPlugin(),
                '/en/guide/': sidebarGuide(),
                '/en/plugin/': sidebarPlugin()
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
        {text: 'PluginDev Tutorials', link: '/plugin/start', activeMatch: '/plugin/'},
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
            text: 'Deploy Guide',
            collapsed: false,
            items: [
                {text: 'AboutProject', link: '/guide/getting-started'},
                {text: 'Maintain&Backup', link: '/guide/service'},
            ]
        },
        {
            text: 'Usage instructions',
            collapsed: false,
            items: [
                {text: 'Command', link: '/guide/command'},
            ]
        }
    ]
}

function sidebarPlugin() {
    return [
        {
            text: 'Create Plugin',
            items: [
                {text: 'Basic Dev', link: '/plugin/basic'},
                // Use middleware
                {text: 'Use middleware', link: '/plugin/middleware'},
            ]
        }
    ]
}

