export default [
    // {
    //     key: '1',
    //     icon: 'home',
    //     content: '主页',
    //     link: '/home'
    // },
    {
        key: 'blog',
        icon: 'book',
        content: '博客管理',
        link: '/blog'
    },
    {
        key: 'tag',
        icon: 'tag',
        content: '标签管理',
        link: '/tag'
    },
    {
        key: 'comment',
        icon: 'message',
        content: '留言管理',
        link: '/comment'
    },
    {
        key: 'appstore',
        icon: 'appstore',
        content: '更多应用',
        subMenu: [
            {
                key: 'ext/book',
                content: '我的书籍',
                link: '/ext/book'
            },
            {
                key: 'ext/video',
                content: '短片管理',
                link: '/ext/video'
            },
            {
                key: 'ext/mood',
                content: '时间轴',
                link: '/ext/mood'
            }
        ]
    }
    // {
    //     key: 'module2',
    //     icon: 'dashboard',
    //     content: '模块2',
    //     subMenu: [
    //         {
    //             key: '2',
    //             content: '子模块1',
    //             link: '/module2/sub1'
    //         },
    //         {
    //             key: '3',
    //             content: '子模块2',
    //             link: '/module2/sub2'
    //         },
    //         {
    //             key: '4',
    //             content: '子模块3',
    //             link: '/module2/sub3'
    //         }
    //     ]
    // }
];