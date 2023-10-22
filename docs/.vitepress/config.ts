// @ts-ignore
import {createRequire} from 'module'
import {defineConfig} from 'vitepress'

// @ts-ignore
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
                lang: 'zh',
                link: '/'
            },
            en: {
                label: 'English',
                lang: 'en',
                link: '/en/'
            }
        },
        head: [['meta', {name: 'theme-color', content: '#3c8772'}]],
        themeConfig: {
            nav: navBar(),
            siteTitle: 'LLMKira',
            logo: 'https://avatars.githubusercontent.com/u/124290462?s=200&v=4',
            sidebar: {
                '/guide/': sidebarGuide(),
                '/dev/': sidebarDev(),
                '/en/guide/': sidebarGuideEn(),
                '/en/dev/': sidebarDevEn()
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
            lastUpdated: {
                text: 'Updated at',
                formatOptions: {
                  dateStyle: 'full',
                  timeStyle: 'medium'
                },
            },
            outline: [ 1, 3 ],
        },
    }
)


function navBar() {
    return [
        {text: 'Deploy Guide', link: '/guide/getting-started', activeMatch: '/guide/'},
        {text: 'Dev Tutorials', link: '/dev/basic', activeMatch: '/dev/'},
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
            text: '部署指南',
            collapsed: false,
            items: [
                {text: '开始部署', link: '/guide/getting-started'},
                {text: '子服务部件', link: '/guide/service'},
                {text: '维护服务', link: '/guide/maintain'},
            ]
        },
        {
            text: '使用指南',
            collapsed: false,
            items: [
                {text: '交互命令', link: '/guide/command'},
            ]
        }
    ]
}


function sidebarDev() {
    return [
        {
            text: '插件开发指南',
            items: [
                {text: '快速开发', link: '/dev/basic'},
                {text: '中间件使用', link: '/dev/middleware'},
            ]
        },
        {
            text: '平台开发指南',
            items: [
                {text: '架构介绍', link: '/dev/arch'},
                {text: '收发端', link: '/dev/client'},
            ]
        }
    ]
}

function sidebarGuideEn() {
    return [
        {
            text: 'Deploy Guide',
            collapsed: false,
            items: [
                {text: 'Deploy', link: '/en/guide/getting-started'},
                {text: 'Component', link: '/en/guide/service'},
                {text: 'Maintain', link: '/en/guide/maintain'},
            ]
        },
        {
            text: 'Usage instructions',
            collapsed: false,
            items: [
                {text: 'Command', link: '/en/guide/command'},
            ]
        }
    ]
}

function sidebarDevEn() {
    return [
        {
            text: 'Plugin System',
            items: [
                {text: 'Fast Dev', link: '/en/dev/basic'},
                // Use middleware
                {text: 'Middleware', link: '/en/dev/middleware'},
            ]
        },
        {
            text: 'Platform Dev',
            items: [
                {text: 'Arch', link: '/en/dev/arch'},
                {text: 'Client', link: '/en/dev/client'},
            ]
        }
    ]
}

