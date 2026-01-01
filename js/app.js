class ToolNavigator {
    constructor() {
        this.tools = toolsData;
        this.filteredTools = [...this.tools];
        this.currentCategory = 'all';
        this.currentTags = new Set();
        this.currentView = 'grid';
        this.favorites = this.loadFavorites();
        this.searchTerm = '';
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.renderTags();
        this.renderTools();
        this.loadTheme();
    }

    setupElements() {
        this.toolsGrid = document.getElementById('toolsGrid');
        this.searchInput = document.getElementById('searchInput');
        this.tagList = document.getElementById('tagList');
        this.noResults = document.getElementById('noResults');
        this.toolModal = document.getElementById('toolModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalBody = document.getElementById('modalBody');
        this.modalClose = document.getElementById('modalClose');
        this.themeToggle = document.getElementById('themeToggle');
    }

    setupEventListeners() {
        // 搜索功能
        this.searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.filterAndRender();
        });

        // 分类导航
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentCategory = e.target.dataset.category;
                this.filterAndRender();
            });
        });

        // 视图切换
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentView = e.target.dataset.view;
                this.renderTools();
            });
        });

        // 主题切换
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // 模态框关闭
        this.modalClose.addEventListener('click', () => {
            this.closeModal();
        });

        this.toolModal.addEventListener('click', (e) => {
            if (e.target === this.toolModal) {
                this.closeModal();
            }
        });

        // ESC 键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.toolModal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }

    renderTags() {
        const uniqueTags = [...new Set(this.tools.flatMap(tool => tool.tags))];
        this.tagList.innerHTML = uniqueTags.map(tag => `
            <button class="tag" data-tag="${tag}">${tag}</button>
        `).join('');

        // 标签点击事件
        this.tagList.querySelectorAll('.tag').forEach(tagBtn => {
            tagBtn.addEventListener('click', (e) => {
                const tag = e.target.dataset.tag;
                if (this.currentTags.has(tag)) {
                    this.currentTags.delete(tag);
                    e.target.classList.remove('active');
                } else {
                    this.currentTags.add(tag);
                    e.target.classList.add('active');
                }
                this.filterAndRender();
            });
        });
    }

    filterAndRender() {
        this.filteredTools = this.tools.filter(tool => {
            // 分类筛选
            if (this.currentCategory !== 'all' && tool.category !== this.currentCategory) {
                return false;
            }

            // 搜索筛选
            if (this.searchTerm && !tool.title.toLowerCase().includes(this.searchTerm) && 
                !tool.description.toLowerCase().includes(this.searchTerm)) {
                return false;
            }

            // 标签筛选
            if (this.currentTags.size > 0) {
                const hasMatchingTag = Array.from(this.currentTags).some(tag => 
                    tool.tags.includes(tag)
                );
                if (!hasMatchingTag) {
                    return false;
                }
            }

            return true;
        });

        this.renderTools();
    }

    renderTools() {
        if (this.filteredTools.length === 0) {
            this.toolsGrid.style.display = 'none';
            this.noResults.style.display = 'block';
            return;
        }

        this.toolsGrid.style.display = 'grid';
        this.noResults.style.display = 'none';

        this.toolsGrid.className = this.currentView === 'list' ? 'tools-grid list-view' : 'tools-grid';
        
        this.toolsGrid.innerHTML = this.filteredTools.map(tool => `
            <div class="tool-card" data-id="${tool.id}">
                <div class="tool-header">
                    <div>
                        <div class="tool-icon">${tool.icon}</div>
                        <h3 class="tool-title">${tool.title}</h3>
                    </div>
                    <button class="tool-favorite ${this.favorites.has(tool.id) ? 'active' : ''}" 
                            data-id="${tool.id}">
                        ${this.favorites.has(tool.id) ? '❤️' : '🤍'}
                    </button>
                </div>
                <p class="tool-description">${tool.description}</p>
                <div class="tool-tags">
                    ${tool.tags.map(tag => `<span class="tool-tag">${tag}</span>`).join('')}
                </div>
                <div class="tool-actions">
                    <span class="tool-category">${categories[tool.category]}</span>
                    <span class="tool-rating">⭐ ${tool.rating}</span>
                </div>
            </div>
        `).join('');

        // 工具卡片点击事件
        this.toolsGrid.querySelectorAll('.tool-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('tool-favorite')) {
                    const toolId = parseInt(card.dataset.id);
                    this.showToolDetails(toolId);
                }
            });
        });

        // 收藏按钮事件
        this.toolsGrid.querySelectorAll('.tool-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const toolId = parseInt(btn.dataset.id);
                this.toggleFavorite(toolId);
            });
        });
    }

    showToolDetails(toolId) {
        const tool = this.tools.find(t => t.id === toolId);
        if (!tool) return;

        this.modalTitle.textContent = tool.title;
        this.modalBody.innerHTML = `
            <div class="tool-detail">
                <div class="tool-detail-header">
                    <div class="tool-detail-icon">${tool.icon}</div>
                    <div class="tool-detail-info">
                        <h4>${tool.title}</h4>
                        <p class="tool-detail-category">${categories[tool.category]}</p>
                        <div class="tool-detail-rating">
                            <span class="stars">⭐ ${tool.rating}</span>
                            <span class="rating-count">(1,234 评价)</span>
                        </div>
                    </div>
                </div>
                
                <div class="tool-detail-description">
                    <h5>工具介绍</h5>
                    <p>${tool.description}</p>
                </div>

                <div class="tool-detail-features">
                    <h5>主要功能</h5>
                    <ul>
                        ${tool.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>

                <div class="tool-detail-tags">
                    <h5>标签</h5>
                    <div class="detail-tags">
                        ${tool.tags.map(tag => `<span class="detail-tag">${tag}</span>`).join('')}
                    </div>
                </div>

                <div class="tool-detail-actions">
                    <a href="${tool.url}" target="_blank" class="btn-primary">
                        访问工具官网
                    </a>
                    <button class="btn-secondary" onclick="navigator.share({ 
                        title: '${tool.title}', 
                        text: '${tool.description}', 
                        url: '${tool.url}' 
                    })">
                        分享工具
                    </button>
                </div>
            </div>
        `;

        this.toolModal.classList.add('show');
    }

    closeModal() {
        this.toolModal.classList.remove('show');
    }

    toggleFavorite(toolId) {
        if (this.favorites.has(toolId)) {
            this.favorites.delete(toolId);
        } else {
            this.favorites.add(toolId);
        }
        this.saveFavorites();
        this.renderTools();
    }

    loadFavorites() {
        const saved = localStorage.getItem('toolFavorites');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    }

    saveFavorites() {
        localStorage.setItem('toolFavorites', JSON.stringify([...this.favorites]));
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}

// 添加模态框样式
const modalStyles = `
    .tool-detail {
        color: var(--text-primary);
    }

    .tool-detail-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
    }

    .tool-detail-icon {
        font-size: 3rem;
    }

    .tool-detail-info h4 {
        margin: 0 0 0.25rem 0;
        font-size: 1.5rem;
        color: var(--text-primary);
    }

    .tool-detail-category {
        color: var(--text-secondary);
        margin: 0 0 0.5rem 0;
        font-weight: 500;
    }

    .tool-detail-rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .stars {
        color: #fbbf24;
        font-weight: 600;
    }

    .rating-count {
        color: var(--text-muted);
        font-size: 0.875rem;
    }

    .tool-detail-description,
    .tool-detail-features,
    .tool-detail-tags {
        margin-bottom: 1.5rem;
    }

    .tool-detail-description h5,
    .tool-detail-features h5,
    .tool-detail-tags h5 {
        margin: 0 0 0.75rem 0;
        color: var(--text-primary);
        font-weight: 600;
    }

    .tool-detail-features ul {
        margin: 0;
        padding-left: 1.5rem;
    }

    .tool-detail-features li {
        margin-bottom: 0.5rem;
        color: var(--text-secondary);
    }

    .detail-tags {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .detail-tag {
        padding: 0.25rem 0.75rem;
        background: var(--background);
        border: 1px solid var(--border-color);
        border-radius: 9999px;
        font-size: 0.875rem;
        color: var(--text-secondary);
    }

    .tool-detail-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border-color);
    }

    .btn-primary,
    .btn-secondary {
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius);
        text-decoration: none;
        font-weight: 500;
        cursor: pointer;
        transition: var(--transition);
        border: none;
        font-size: 1rem;
    }

    .btn-primary {
        background: var(--primary-color);
        color: white;
    }

    .btn-primary:hover {
        background: var(--primary-hover);
        transform: translateY(-1px);
    }

    .btn-secondary {
        background: var(--background);
        color: var(--text-primary);
        border: 1px solid var(--border-color);
    }

    .btn-secondary:hover {
        background: var(--surface-hover);
        transform: translateY(-1px);
    }

    @media (max-width: 768px) {
        .tool-detail-actions {
            flex-direction: column;
        }
        
        .btn-primary,
        .btn-secondary {
            text-align: center;
        }
    }
`;

// 添加样式到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new ToolNavigator();
});