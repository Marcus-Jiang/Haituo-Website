/**
 * 组件加载器
 * 负责加载公共组件（导航栏、页脚）到页面
 */

/**
 * 加载导航栏组件
 * @param {string} currentPage - 当前页面名称，用于设置导航高亮
 */
async function loadHeader(currentPage) {
    try {
        const response = await fetch('components/header.html');
        if (!response.ok) {
            throw new Error(`Failed to load header: ${response.status}`);
        }
        const html = await response.text();

        const headerContainer = document.getElementById('header-placeholder');
        if (headerContainer) {
            headerContainer.innerHTML = html;

            // 设置当前页面导航高亮
            setActiveNavLink(currentPage);

            // 绑定移动端菜单事件
            bindMobileMenu();

            // 重新绑定语言切换器事件（由 i18n.js 初始化后调用）
            if (window.i18n) {
                window.i18n.bindLanguageSwitchers();
            }
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

/**
 * 加载页脚组件
 */
async function loadFooter() {
    try {
        const response = await fetch('components/footer.html');
        if (!response.ok) {
            throw new Error(`Failed to load footer: ${response.status}`);
        }
        const html = await response.text();

        const footerContainer = document.getElementById('footer-placeholder');
        if (footerContainer) {
            footerContainer.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

/**
 * 设置导航栏当前页面高亮
 * @param {string} currentPage - 当前页面名称
 */
function setActiveNavLink(currentPage) {
    // 桌面端导航
    const desktopNavLinks = document.querySelectorAll('header nav a');
    desktopNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `${currentPage}.html`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 移动端导航
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a:not(.lang-switcher a)');
    mobileNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `${currentPage}.html`) {
            link.classList.add('text-accent');
        } else {
            link.classList.remove('text-accent');
        }
    });
}

/**
 * 绑定移动端菜单事件
 */
function bindMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

/**
 * 加载所有公共组件
 * @param {string} currentPage - 当前页面名称
 */
async function loadComponents(currentPage) {
    await Promise.all([
        loadHeader(currentPage),
        loadFooter()
    ]);
}

// 页面加载完成后自动调用
document.addEventListener('DOMContentLoaded', async () => {
    // 获取当前页面名称
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    const currentPage = filename.split('.')[0] || 'index';

    // 加载组件
    await loadComponents(currentPage);

    // 如果 i18n 已初始化，重新渲染翻译
    if (window.i18n) {
        window.i18n.renderNavigation();
        window.i18n.renderFooter();
    }
});