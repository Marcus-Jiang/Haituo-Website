/**
 * 国际化(i18n)类
 * 负责处理网站的多语言切换、文本翻译和语言偏好存储等功能
 */
class I18n {
    /**
     * 构造函数
     * 初始化国际化相关的属性和方法
     */
    constructor() {
        // 当前选中的语言
        this.currentLang = null;
        // 存储翻译数据
        this.translations = {};
        // 默认语言
        this.defaultLang = 'zh-CN';
        // 支持的语言列表
        this.supportedLangs = ['zh-CN', 'ja', 'en'];
        // 初始化方法
        this.init();
    }

    /**
     * 初始化方法
     * 加载语言偏好并绑定事件
     */
    init() {
        // 优先从localStorage加载语言偏好
        const savedLang = this.loadLanguagePreference();
        // 如果没有保存的偏好，则检测浏览器语言
        const langToUse = savedLang || this.detectBrowserLang();
        // 设置当前语言
        this.currentLang = langToUse;
        // 加载语言文件
        this.loadLanguage(langToUse);
        // 绑定语言切换器事件
        this.bindLanguageSwitchers();
    }

    /**
     * 检测浏览器语言
     * @returns {string} 检测到的语言代码
     */
    detectBrowserLang() {
        // 获取浏览器语言
        const userLang = navigator.language || navigator.userLanguage;
        // 提取语言代码（如从zh-CN提取zh）
        const langCode = userLang.split('-')[0];
        
        // 检查是否支持该语言
        if (this.supportedLangs.includes(userLang)) {
            return userLang;
        } else if (this.supportedLangs.includes(langCode)) {
            return langCode;
        } else {
            return this.defaultLang;
        }
    }

    /**
     * 加载语言文件
     * @param {string} lang 语言代码
     */
    async loadLanguage(lang) {
        try {
            // 请求语言JSON文件
            const response = await fetch(`locales/${lang}.json`);
            // 检查请求是否成功
            if (!response.ok) {
                throw new Error(`Failed to load language file: ${lang}`);
            }
            // 解析JSON数据
            this.translations = await response.json();
            // 更新当前语言
            this.currentLang = lang;
            // 渲染翻译内容
            this.renderTranslations();
            // 更新语言切换器状态
            this.updateLanguageSwitchers();
            // 更新文档语言属性
            this.updateDocumentLang();
            // 保存语言偏好
            this.saveLanguagePreference(lang);
        } catch (error) {
            // 捕获并输出错误
            console.error('Error loading language:', error);
            // 加载失败时使用默认语言
            if (lang !== this.defaultLang) {
                this.loadLanguage(this.defaultLang);
            }
        }
    }

    /**
     * 渲染所有翻译内容
     */
    renderTranslations() {
        // 渲染页面标题
        this.renderTitle();
        
        // 渲染带data-i18n属性的元素
        this.renderElementsWithDataAttr();
        
        // 渲染导航栏
        this.renderNavigation();
        
        // 渲染页脚
        this.renderFooter();
    }

    /**
     * 渲染页面标题
     */
    renderTitle() {
        // 获取当前页面名称
        const page = this.getPageName();
        // 检查是否有对应页面的标题翻译
        if (this.translations.pages && this.translations.pages[page] && this.translations.pages[page].title) {
            // 更新文档标题
            document.title = this.translations.pages[page].title;
        }
    }

    /**
     * 渲染带data-i18n属性的元素
     */
    renderElementsWithDataAttr() {
        // 获取所有带有data-i18n属性的元素
        const elements = document.querySelectorAll('[data-i18n]');
        // 遍历元素并翻译
        elements.forEach(element => {
            // 获取翻译键
            const key = element.getAttribute('data-i18n');
            // 获取翻译文本
            const text = this.translate(key);
            // 如果有翻译文本，则更新元素内容
            if (text) {
                element.textContent = text;
            }
        });
    }

    /**
     * 渲染导航栏
     */
    renderNavigation() {
        // 获取当前页面名称
        const page = this.getPageName();
        // 获取所有导航链接
        const navLinks = document.querySelectorAll('.nav-link');
        // 导航项数组
        const navItems = ['home', 'about', 'business', 'contact'];
        
        // 遍历导航链接并翻译
        navLinks.forEach((link, index) => {
            // 构建翻译键
            const key = `pages.${page}.navigation.${navItems[index]}`;
            // 获取翻译文本
            const text = this.translate(key);
            // 如果有翻译文本，则更新链接内容
            if (text) {
                link.textContent = text;
            }
        });

        // 渲染移动端菜单
        const mobileLinks = document.querySelectorAll('#mobile-menu a:not(.lang-switcher a)');
        mobileLinks.forEach((link, index) => {
            // 确保索引不超出导航项数组范围
            if (index < navItems.length) {
                // 构建翻译键
                const key = `pages.${page}.navigation.${navItems[index]}`;
                // 获取翻译文本
                const text = this.translate(key);
                // 如果有翻译文本，则更新链接内容
                if (text) {
                    link.textContent = text;
                }
            }
        });
    }

    /**
     * 渲染页脚
     */
    renderFooter() {
        // 页脚公司名称
        const companyName = document.querySelector('footer h3');
        if (companyName) {
            companyName.textContent = this.translate('footer.company');
        }

        // 页脚公司全称
        const companyFull = document.querySelector('footer h3 + p');
        if (companyFull) {
            companyFull.textContent = this.translate('footer.companyFull');
        }

        // 页脚导航标题
        const navTitle = document.querySelector('footer h4:first-of-type');
        if (navTitle) {
            navTitle.textContent = this.translate('footer.navigation');
        }

        // 页脚联系我们标题
        const contactTitle = document.querySelector('footer h4:nth-of-type(2)');
        if (contactTitle) {
            contactTitle.textContent = this.translate('footer.contact');
        }

        // 页脚关注我们标题
        const followTitle = document.querySelector('footer h4:nth-of-type(3)');
        if (followTitle) {
            followTitle.textContent = this.translate('footer.follow');
        }

        // 页脚版权信息
        const copyright = document.querySelector('footer p:last-of-type');
        if (copyright) {
            copyright.textContent = this.translate('footer.copyright');
        }

        // 页脚导航链接
        const footerNavLinks = document.querySelectorAll('footer ul:first-of-type a');
        const navItems = ['home', 'about', 'business', 'contact'];
        footerNavLinks.forEach((link, index) => {
            // 构建翻译键
            const key = `pages.index.navigation.${navItems[index]}`;
            // 获取翻译文本
            const text = this.translate(key);
            // 如果有翻译文本，则更新链接内容
            if (text) {
                link.textContent = text;
            }
        });
    }

    /**
     * 根据键获取翻译文本
     * @param {string} key 翻译键，如 'footer.company'
     * @returns {string|null} 翻译后的文本或null
     */
    translate(key) {
        // 分割键路径
        const keys = key.split('.');
        // 从根对象开始查找
        let value = this.translations;
        
        // 遍历键路径
        for (const k of keys) {
            // 检查是否包含数组索引语法，如 items[0]
            const arrayMatch = k.match(/^(\w+)\[(\d+)\]$/);
            
            if (arrayMatch) {
                // 处理数组索引
                const arrayName = arrayMatch[1];
                const index = parseInt(arrayMatch[2], 10);
                
                if (value[arrayName] === undefined || !Array.isArray(value[arrayName]) || value[arrayName][index] === undefined) {
                    return null;
                }
                
                value = value[arrayName][index];
            } else {
                // 处理普通键
                if (value[k] === undefined) {
                    return null;
                }
                value = value[k];
            }
        }
        
        // 返回最终值
        return value;
    }

    /**
     * 更新语言切换器状态
     */
    updateLanguageSwitchers() {
        // 获取所有语言切换器
        const switchers = document.querySelectorAll('.lang-switcher a');
        // 获取当前语言显示元素
        const currentLangElement = document.getElementById('current-lang');
        
        // 遍历切换器
        switchers.forEach(switcher => {
            // 获取切换器对应的语言
            const lang = switcher.getAttribute('data-lang') || switcher.href.split('/').pop().split('.')[0].replace('-', '');
            
            // 更新当前语言显示
            if (currentLangElement && (lang === this.currentLang || 
                (lang === 'zh' && this.currentLang === 'zh-CN') ||
                (lang === 'zh-CN' && this.currentLang === 'zh'))) {
                currentLangElement.textContent = switcher.textContent;
            }
        });
    }

    /**
     * 更新文档语言属性
     */
    updateDocumentLang() {
        // 设置文档根元素的lang属性
        document.documentElement.lang = this.currentLang;
    }

    /**
     * 保存语言偏好到localStorage
     * @param {string} lang 语言代码
     */
    saveLanguagePreference(lang) {
        try {
            localStorage.setItem('preferredLanguage', lang);
        } catch (error) {
            // 捕获并输出错误
            console.error('Error saving language preference:', error);
        }
    }

    /**
     * 从localStorage加载语言偏好
     * @returns {string|null} 保存的语言代码或null
     */
    loadLanguagePreference() {
        try {
            return localStorage.getItem('preferredLanguage');
        } catch (error) {
            // 捕获并输出错误
            console.error('Error loading language preference:', error);
            return null;
        }
    }

    /**
     * 获取当前页面名称
     * @returns {string} 页面名称，如 'index', 'about', 'business', 'contact'
     */
    getPageName() {
        // 获取当前路径
        const path = window.location.pathname;
        // 提取文件名
        const filename = path.split('/').pop();
        // 提取页面名称，移除语言后缀和文件扩展名
        const pageName = filename.split('.')[0].replace('-en', '').replace('-ja', '');
        // 如果没有页面名称，默认为'index'
        return pageName || 'index';
    }

    /**
     * 绑定语言切换器事件
     */
    bindLanguageSwitchers() {
        // 绑定下拉菜单语言切换
        const langSelector = document.getElementById('lang-selector');
        const langDropdown = document.getElementById('lang-dropdown');
        const langOptions = document.querySelectorAll('.lang-switcher a');
        const currentLangElement = document.getElementById('current-lang');
        
        // 显示/隐藏下拉菜单
        if (langSelector && langDropdown) {
            // 显示下拉菜单
            langSelector.addEventListener('mouseenter', () => {
                langDropdown.classList.remove('hidden');
            });
            
            // 隐藏下拉菜单 - 增加延迟时间
            langSelector.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    // 检查鼠标是否已经进入下拉菜单
                    const isMouseInDropdown = langDropdown.matches(':hover');
                    if (!isMouseInDropdown) {
                        langDropdown.classList.add('hidden');
                    }
                }, 500); // 延长到500ms
            });
            
            // 当鼠标进入下拉菜单时保持显示
            langDropdown.addEventListener('mouseenter', () => {
                langDropdown.classList.remove('hidden');
            });
            
            // 当鼠标离开下拉菜单时隐藏
            langDropdown.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    langDropdown.classList.add('hidden');
                }, 200);
            });
        }
        
        // 绑定语言切换事件
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = option.getAttribute('data-lang');
                if (lang) {
                    this.loadLanguage(lang);
                    // 更新当前语言显示
                    if (currentLangElement) {
                        currentLangElement.textContent = option.textContent;
                    }
                    // 隐藏下拉菜单
                    if (langDropdown) {
                        langDropdown.classList.add('hidden');
                    }
                }
            });
        });
    }
}

// 初始化国际化
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        window.i18n = new I18n();
    });
}
