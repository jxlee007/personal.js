// Repo Viewer - App Logic

// 1. Sample repository files data
const initialFiles = [
  {
    id: "file_1",
    name: "src/main.js",
    category: "Source",
    tags: ["#javascript", "#es6", "#core"],
    description: "Main entry point of the application. Initializes the router, mounts the main component, and bootstraps application services.",
    content: `// Application Bootstrapper
import { Router } from './router.js';
import { AuthStore } from './stores/auth.js';
import { ToastManager } from './ui/toast.js';

class App {
  constructor() {
    this.router = new Router();
    this.auth = new AuthStore();
    this.toasts = new ToastManager();
  }

  async init() {
    console.log("⚡ Bootstrap initiated...");
    
    // Initialize Auth state
    await this.auth.checkSession();
    
    // Register routing middleware
    this.router.beforeEach((to, from, next) => {
      if (to.meta.requiresAuth && !this.auth.isAuthenticated) {
        this.toasts.warning("Session expired. Please log in.");
        next('/login');
      } else {
        next();
      }
    });

    // Mount Router and UI
    this.router.mount('#app-root');
    console.log("🚀 Application successfully mounted.");
  }
}

// Instantiate and start app
const app = new App();
window.addEventListener('DOMContentLoaded', () => app.init());`
  },
  {
    id: "file_2",
    name: "src/utils/auth.js",
    category: "Source",
    tags: ["#security", "#auth", "#jwt"],
    description: "Authentication utility functions. Handles JWT decoding, secure storage operations, token expiration checks, and logout routing.",
    content: `// Secure Authentication Utilities
import { parseJwt } from './jwt.js';

const TOKEN_KEY = 'repo_viewer_auth_token';

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token) => {
  if (!token) return removeAuthToken();
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const claims = parseJwt(token);
    const expTime = claims.exp * 1000;
    return Date.now() >= expTime;
  } catch (error) {
    console.error("Failed to parse token validity:", error);
    return true;
  }
};`
  },
  {
    id: "file_3",
    name: "src/components/Card.jsx",
    category: "Source",
    tags: ["#react", "#jsx", "#ui"],
    description: "Reusable card component for displaying file metadata. Implements modern hover micro-animations and status-based tag styling.",
    content: `// Reusable File Card Component
import React from 'react';
import { FileIcon, ChevronRight } from 'lucide-react';

export const FileCard = ({ name, category, description, tags, active, onClick }) => {
  const borderColors = {
    Source: 'hover:border-violet-500/50',
    Docs: 'hover:border-cyan-500/50',
    Config: 'hover:border-amber-500/50',
    Scripts: 'hover:border-rose-500/50',
    Tests: 'hover:border-emerald-500/50'
  };

  return (
    <div
      onClick={onClick}
      className={\`glass-panel glass-panel-hover p-4 mb-3 rounded-xl cursor-pointer transition-all duration-300 \${
        active 
          ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10' 
          : 'border-slate-800'
      } \${borderColors[category] || 'hover:border-indigo-500/50'}\`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <FileIcon className={\`w-4 h-4 \${active ? 'text-indigo-400' : 'text-slate-400'}\`} />
          <span className="font-semibold text-slate-200 text-sm truncate max-w-[200px]">{name}</span>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          {category}
        </span>
      </div>
      <p className="text-xs text-slate-400 line-clamp-2 mb-3">{description}</p>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag, idx) => (
          <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-indigo-300 font-medium">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};`
  },
  {
    id: "file_4",
    name: "README.md",
    category: "Docs",
    tags: ["#markdown", "#docs", "#guide"],
    description: "Project documentation guide. Contains installation instructions, architectural outlines, script commands, and configuration guides.",
    content: `# 🚀 Repo Viewer - Premium File Previewer

A state-of-the-art developer utility designed to view, search, and manage repository files from a browser. Built with a terminal aesthetic and rich dark-mode controls.

## Features

- **Dynamic Search**: Instantly filters files by name, tags, description, or content.
- **Categorized Views**: Filter files by folders/categories (Source, Docs, Config, Scripts, Tests).
- **Interactive Terminal**: Code preview with line numbering, copy button, and word-wrap.
- **Live Creator**: Add new custom files in real-time, instantly saved in your local workspace.
- **Micro-Animations**: Hover glowing borders and smooth state transitions.

## Quick Start

1. Clone this workspace:
   \`\`\`bash
   git clone d:/SAAS/repo-viewer
   \`\`\`
2. Open \`index.html\` directly in any modern browser.
3. Use the search bar to query files instantly (e.g., searching for "jwt" or "auth").
4. Tap the "New File" button on the navbar to add your own code structures.`
  },
  {
    id: "file_5",
    name: "docs/api.md",
    category: "Docs",
    tags: ["#api", "#rest", "#endpoints"],
    description: "API design and specs document. Details endpoints for authentication, file management, metadata extraction, and error response standards.",
    content: `# 🛰️ API Documentation

All API requests must carry a valid Bearer JWT. Content returned is in application/json.

## Endpoints

### 1. File Queries
* **URL**: \`/api/v1/files\`
* **Method**: \`GET\`
* **Query Params**:
  * \`category\` (optional): Filter by folder name
  * \`search\` (optional): Case-insensitive keyword query
* **Response (200 OK)**:
  \`\`\`json
  [
    {
      "id": "file_1",
      "name": "src/main.js",
      "category": "Source",
      "tags": ["#javascript", "#core"],
      "description": "App bootstrapper"
    }
  ]
  \`\`\`

### 2. Add File
* **URL**: \`/api/v1/files\`
* **Method**: \`POST\`
* **Request Body**:
  \`\`\`json
  {
    "name": "tests/new.test.js",
    "category": "Tests",
    "tags": ["#jest", "#new"],
    "description": "Short summary",
    "content": "describe('Auth', () => {})"
  }
  \`\`\`
* **Response (201 Created)**: Returns the persisted database object.`
  },
  {
    id: "file_6",
    name: "config/server.json",
    category: "Config",
    tags: ["#json", "#config", "#server"],
    description: "Backend server configurations. Outlines environment values, database URI details, rate-limiting variables, and file upload sizes.",
    content: `{
  "env": "production",
  "server": {
    "port": 8080,
    "host": "0.0.0.0",
    "compression": true,
    "cors": {
      "origin": ["https://repo-viewer.dev", "http://localhost:3000"],
      "credentials": true
    }
  },
  "database": {
    "dialect": "sqlite",
    "storage": "./data/workspace.db",
    "logging": false,
    "pool": {
      "max": 10,
      "min": 2,
      "acquire": 30000,
      "idle": 10000
    }
  },
  "security": {
    "rateLimitWindowMs": 900000,
    "rateLimitMaxRequests": 100,
    "jwtExpiration": "7d"
  }
}`
  },
  {
    id: "file_7",
    name: "config/tailwind.config.js",
    category: "Config",
    tags: ["#tailwind", "#styling", "#theme"],
    description: "Tailwind CSS configuration options. Specifies custom font pairings, color palettes, spacing variables, and typography integrations.",
    content: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#0b0f19', // Deeper rich slate
        },
        indigo: {
          500: '#6366f1',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-indigo': '0 0 20px -3px rgba(99, 102, 241, 0.4)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}`
  },
  {
    id: "file_8",
    name: "scripts/build.sh",
    category: "Scripts",
    tags: ["#bash", "#build", "#cli"],
    description: "Production build automation script. Clears build directories, bundles JS structures, runs linter checks, and builds Tailwind output.",
    content: `#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🛠️ Starting workspace build sequence..."

# 1. Clean build output directories
echo "🧹 Cleaning dist/ folder..."
rm -rf dist
mkdir -p dist

# 2. Run code style linting checks
echo "🔍 Running ESLint audit..."
npm run lint

# 3. Compile assets and bundle
echo "📦 Bundling modules with Vite..."
npx vite build --outDir dist

# 4. Generate optimized production stylesheet
echo "🎨 Building utility CSS classes..."
npx tailwindcss -i ./src/index.css -o ./dist/app.css --minify

echo "✨ Build completed successfully. Assets stored in /dist"
exit 0`
  },
  {
    id: "file_9",
    name: "scripts/deploy.js",
    category: "Scripts",
    tags: ["#node", "#deployment", "#ci-cd"],
    description: "Deployment pipeline script. Connects securely, validates build directories, packages server logs, and uploads assets to remote hosts.",
    content: `// Production Asset Deployment Script
const fs = require('fs');
const path = require('path');
const { Client } = require('ssh2');

const sshClient = new Client();
const distDir = path.join(__dirname, '../dist');

const getDeployConfig = () => {
  return {
    host: process.env.DEPLOY_HOST || '192.168.1.50',
    port: 22,
    username: process.env.DEPLOY_USER || 'deploy',
    privateKey: fs.readFileSync(process.env.DEPLOY_KEY_PATH || '~/.ssh/id_rsa')
  };
};

const runDeploy = () => {
  if (!fs.existsSync(distDir)) {
    console.error("❌ Error: Distribution assets not built. Run build first.");
    process.exit(1);
  }

  console.log("🌐 Connecting to remote server...");
  const config = getDeployConfig();
  
  sshClient.on('ready', () => {
    console.log("🔒 Secured SSH channel connected.");
    // Simulate sftp transfer and shell execution
    console.log("📤 Uploading static bundles...");
    console.log("🔄 Updating server processes...");
    sshClient.end();
  }).connect(config);
};

runDeploy();`
  },
  {
    id: "file_10",
    name: "tests/auth.test.js",
    category: "Tests",
    tags: ["#jest", "#testing", "#coverage"],
    description: "Jest validation unit testing. Asserts token storage validity, verification triggers, token expiration limits, and edge-case exceptions.",
    content: `// Authentication Logic Unit Tests
import { getAuthToken, setAuthToken, isTokenExpired } from '../src/utils/auth.js';

describe('Authentication Utilities Core', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('should return null when token is not present', () => {
    expect(getAuthToken()).toBeNull();
  });

  test('should store and fetch JWT token in local storage', () => {
    const fakeToken = 'header.payload.signature';
    setAuthToken(fakeToken);
    expect(getAuthToken()).toBe(fakeToken);
  });

  test('should return true for expired tokens', () => {
    const expiredToken = 'header.' + btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) - 60 })) + '.sig';
    expect(isTokenExpired(expiredToken)).toBe(true);
  });

  test('should return false for valid future tokens', () => {
    const futureToken = 'header.' + btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })) + '.sig';
    expect(isTokenExpired(futureToken)).toBe(false);
  });
});`
  }
];

// 2. Application State Management
class StateManager {
  constructor() {
    this.files = this.loadFiles();
    this.selectedCategory = "All";
    this.searchQuery = "";
    this.currentFileId = this.files.length > 0 ? this.files[0].id : null;
    this.wordWrap = false;
  }

  loadFiles() {
    const stored = localStorage.getItem("repo_viewer_files");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Error loading files from localStorage, resetting to samples", e);
      }
    }
    // Set default in localstorage
    localStorage.setItem("repo_viewer_files", JSON.stringify(initialFiles));
    return [...initialFiles];
  }

  saveFiles() {
    localStorage.setItem("repo_viewer_files", JSON.stringify(this.files));
  }

  addFile(name, category, tags, description, content) {
    const newFile = {
      id: "file_" + Date.now(),
      name,
      category,
      tags: tags.split(',').map(t => t.trim().startsWith('#') ? t.trim() : '#' + t.trim()).filter(t => t.length > 1),
      description,
      content
    };
    this.files.unshift(newFile); // Add to the front
    this.saveFiles();
    this.currentFileId = newFile.id; // Automatically select the new file
    return newFile;
  }

  getFilteredFiles() {
    return this.files.filter(file => {
      // 1. Filter by category
      if (this.selectedCategory !== "All" && file.category !== this.selectedCategory) {
        return false;
      }
      // 2. Filter by search query (name, description, tags, or content)
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const matchesName = file.name.toLowerCase().includes(query);
        const matchesDesc = file.description.toLowerCase().includes(query);
        const matchesTags = file.tags.some(tag => tag.toLowerCase().includes(query));
        const matchesContent = file.content.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesTags || matchesContent;
      }
      return true;
    });
  }

  getCurrentFileIndex(filteredFiles) {
    return filteredFiles.findIndex(f => f.id === this.currentFileId);
  }
}

// 3. UI Controller
class RepoViewerUI {
  constructor(state) {
    this.state = state;
    this.cacheDOM();
    this.bindEvents();
  }

  cacheDOM() {
    this.searchInput = document.getElementById("search-input");
    this.folderFilterSelect = document.getElementById("folder-filter-select");
    this.newFileBtn = document.getElementById("new-file-btn");
    
    // Sidebar DOM
    this.categoriesContainer = document.getElementById("categories-container");
    this.fileListContainer = document.getElementById("file-list-container");
    this.sidebarFileCount = document.getElementById("sidebar-file-count");
    
    // Preview DOM
    this.previewContainer = document.getElementById("preview-container");
    this.previewTitle = document.getElementById("preview-title");
    this.previewCategory = document.getElementById("preview-category");
    this.previewTags = document.getElementById("preview-tags");
    this.previewDescription = document.getElementById("preview-description");
    this.previewCode = document.getElementById("preview-code");
    this.previewReadTime = document.getElementById("preview-read-time");
    
    // Pane Actions
    this.copyBtn = document.getElementById("copy-btn");
    this.wrapBtn = document.getElementById("wrap-btn");
    this.downloadBtn = document.getElementById("download-btn");
    
    // Pagination DOM
    this.prevBtn = document.getElementById("prev-btn");
    this.nextBtn = document.getElementById("next-btn");
    this.pageCounter = document.getElementById("page-counter");
    
    // Modal DOM
    this.modal = document.getElementById("new-file-modal");
    this.modalClose = document.getElementById("modal-close-btn");
    this.modalForm = document.getElementById("new-file-form");
    
    // Toast DOM
    this.toastContainer = document.getElementById("toast-container");
  }

  bindEvents() {
    // Search & Filter
    this.searchInput.addEventListener("input", (e) => {
      this.state.searchQuery = e.target.value;
      this.handleSearchOrFilterChange();
    });

    this.folderFilterSelect.addEventListener("change", (e) => {
      this.state.selectedCategory = e.target.value;
      this.handleSearchOrFilterChange();
    });

    // Sidebar Category clicks
    this.categoriesContainer.addEventListener("click", (e) => {
      const categoryBtn = e.target.closest("[data-category]");
      if (categoryBtn) {
        const category = categoryBtn.getAttribute("data-category");
        this.state.selectedCategory = category;
        this.folderFilterSelect.value = category;
        this.handleSearchOrFilterChange();
      }
    });

    // File selection clicks
    this.fileListContainer.addEventListener("click", (e) => {
      const fileCard = e.target.closest("[data-file-id]");
      if (fileCard) {
        const fileId = fileCard.getAttribute("data-file-id");
        this.selectFile(fileId);
      }
    });

    // Pagination Click
    this.prevBtn.addEventListener("click", () => this.navigatePagination(-1));
    this.nextBtn.addEventListener("click", () => this.navigatePagination(1));

    // Toolbar Buttons
    this.copyBtn.addEventListener("click", () => this.copyFileContent());
    this.wrapBtn.addEventListener("click", () => this.toggleWordWrap());
    this.downloadBtn.addEventListener("click", () => this.downloadRawFile());

    // Modal Actions
    this.newFileBtn.addEventListener("click", () => this.toggleModal(true));
    this.modalClose.addEventListener("click", () => this.toggleModal(false));
    
    // Close modal on click outside content
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.toggleModal(false);
      }
    });

    this.modalForm.addEventListener("submit", (e) => this.handleNewFileSubmit(e));
  }

  // App lifecycle init
  init() {
    this.render();
    this.showToast("⚡ Workspace loaded successfully.", "info");
  }

  // Core render coordinator
  render() {
    const filteredFiles = this.state.getFilteredFiles();
    
    // If our current selection isn't in the filtered list, select the first item of the filtered list
    if (filteredFiles.length > 0) {
      const currentIdx = this.state.getCurrentFileIndex(filteredFiles);
      if (currentIdx === -1) {
        this.state.currentFileId = filteredFiles[0].id;
      }
    } else {
      this.state.currentFileId = null;
    }

    this.renderCategories(filteredFiles);
    this.renderFileList(filteredFiles);
    this.renderPreview();
    this.renderPagination(filteredFiles);
  }

  // Handle updates when search query or category filter changes
  handleSearchOrFilterChange() {
    const filteredFiles = this.state.getFilteredFiles();
    if (filteredFiles.length > 0) {
      // Auto select the first matching file
      this.state.currentFileId = filteredFiles[0].id;
    } else {
      this.state.currentFileId = null;
    }
    this.render();
  }

  // Select a specific file
  selectFile(fileId) {
    this.state.currentFileId = fileId;
    
    // Re-render Preview and update active highlights in sidebar list
    this.renderPreview();
    
    // Update active highlight in sidebar DOM directly for performance / styling
    const cards = this.fileListContainer.querySelectorAll("[data-file-id]");
    cards.forEach(card => {
      const id = card.getAttribute("data-file-id");
      if (id === fileId) {
        card.classList.add("border-indigo-500", "bg-indigo-500/10", "shadow-lg", "shadow-indigo-500/10");
        card.classList.remove("border-slate-800");
      } else {
        card.classList.remove("border-indigo-500", "bg-indigo-500/10", "shadow-lg", "shadow-indigo-500/10");
        card.classList.add("border-slate-800");
      }
    });

    // Update pagination values
    const filteredFiles = this.state.getFilteredFiles();
    this.renderPagination(filteredFiles);
  }

  // Render categories and counts
  renderCategories(filteredFiles) {
    const categories = ["All", "Source", "Docs", "Config", "Scripts", "Tests"];
    
    this.categoriesContainer.innerHTML = categories.map(cat => {
      // Calculate files count in this category
      const count = cat === "All" 
        ? this.state.files.length 
        : this.state.files.filter(f => f.category === cat).length;
        
      const isActive = this.state.selectedCategory === cat;
      const activeClasses = isActive 
        ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20 border-indigo-500" 
        : "text-slate-400 hover:text-slate-200 bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80";

      // Folder Category SVGs
      let icon = '<i data-lucide="folder" class="w-4 h-4 mr-2"></i>';
      if (cat === "All") icon = '<i data-lucide="layout-grid" class="w-4 h-4 mr-2"></i>';
      if (cat === "Source") icon = '<i data-lucide="code-xml" class="w-4 h-4 mr-2"></i>';
      if (cat === "Docs") icon = '<i data-lucide="file-text" class="w-4 h-4 mr-2"></i>';
      if (cat === "Config") icon = '<i data-lucide="settings" class="w-4 h-4 mr-2"></i>';
      if (cat === "Scripts") icon = '<i data-lucide="terminal" class="w-4 h-4 mr-2"></i>';
      if (cat === "Tests") icon = '<i data-lucide="check-square" class="w-4 h-4 mr-2"></i>';

      return `
        <button 
          data-category="${cat}"
          class="flex items-center justify-between w-full px-3 py-2 text-xs rounded-lg border transition-all duration-200 ${activeClasses}"
        >
          <span class="flex items-center">
            ${icon}
            ${cat}
          </span>
          <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-indigo-700/50 text-indigo-100' : 'bg-slate-800 text-slate-400 border border-slate-700'}">
            ${count}
          </span>
        </button>
      `;
    }).join("");

    // Refresh lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Render the matching files list
  renderFileList(filteredFiles) {
    this.sidebarFileCount.textContent = `${filteredFiles.length} file${filteredFiles.length !== 1 ? 's' : ''} found`;

    if (filteredFiles.length === 0) {
      this.fileListContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center py-12 text-center">
          <i data-lucide="search-code" class="w-10 h-10 text-slate-600 mb-3 animate-pulse"></i>
          <p class="text-sm font-semibold text-slate-400">No files match filter</p>
          <p class="text-xs text-slate-500 mt-1">Try resetting search query</p>
        </div>
      `;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }

    const borderColors = {
      Source: 'hover:border-violet-500/30',
      Docs: 'hover:border-cyan-500/30',
      Config: 'hover:border-amber-500/30',
      Scripts: 'hover:border-rose-500/30',
      Tests: 'hover:border-emerald-500/30'
    };

    this.fileListContainer.innerHTML = filteredFiles.map(file => {
      const active = file.id === this.state.currentFileId;
      const borderClass = active 
        ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10' 
        : 'border-slate-800';

      const fileIcon = this.getFileIcon(file.name, file.category, active);
      
      const badgeStyle = this.getCategoryBadgeStyle(file.category);

      return `
        <div
          data-file-id="${file.id}"
          class="glass-panel glass-panel-hover p-3.5 mb-2.5 rounded-xl cursor-pointer transition-all duration-300 ${borderClass} ${borderColors[file.category] || 'hover:border-indigo-500/30'}"
        >
          <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center space-x-2.5 min-w-0">
              ${fileIcon}
              <span class="font-medium text-slate-200 text-sm truncate max-w-[130px] sm:max-w-[160px]">${file.name}</span>
            </div>
            <span class="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border ${badgeStyle}">
              ${file.category}
            </span>
          </div>
          <p class="text-xs text-slate-400 line-clamp-2 mb-2 leading-relaxed">${file.description}</p>
          <div class="flex flex-wrap gap-1">
            ${file.tags.map(tag => `
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-indigo-300 border border-slate-800 font-medium">
                ${tag}
              </span>
            `).join("")}
          </div>
        </div>
      `;
    }).join("");

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // Render preview details of the current selected file
  renderPreview() {
    const file = this.state.files.find(f => f.id === this.state.currentFileId);

    if (!file) {
      // Empty state
      this.previewContainer.classList.add("hidden");
      document.getElementById("empty-preview-state").classList.remove("hidden");
      return;
    }

    this.previewContainer.classList.remove("hidden");
    document.getElementById("empty-preview-state").classList.add("hidden");

    // Title and path styling
    this.previewTitle.textContent = file.name;
    this.previewCategory.textContent = file.category;
    
    // Category border class
    const categoryBorders = {
      Source: 'neon-border-violet text-violet-400 bg-violet-950/20 border-violet-900/50',
      Docs: 'neon-border-cyan text-cyan-400 bg-cyan-950/20 border-cyan-900/50',
      Config: 'neon-border-amber text-amber-400 bg-amber-950/20 border-amber-900/50',
      Scripts: 'neon-border-rose text-rose-400 bg-rose-950/20 border-rose-900/50',
      Tests: 'neon-border-emerald text-emerald-400 bg-emerald-950/20 border-emerald-900/50'
    };
    
    this.previewCategory.className = `text-xs uppercase font-extrabold tracking-widest px-2.5 py-1 rounded-md border ${categoryBorders[file.category] || 'border-indigo-800 text-indigo-400 bg-indigo-950/20'}`;

    // Tag list
    this.previewTags.innerHTML = file.tags.map(tag => `
      <span class="text-xs px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800 font-medium hover:text-indigo-400 transition-colors">
        ${tag}
      </span>
    `).join("");

    // Read time/Size
    const lineCount = file.content.split('\n').length;
    const wordCount = file.content.split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    this.previewReadTime.innerHTML = `
      <div class="flex items-center space-x-4 text-xs text-slate-400">
        <span class="flex items-center"><i data-lucide="align-left" class="w-3.5 h-3.5 mr-1.5"></i> ${lineCount} lines</span>
        <span class="flex items-center"><i data-lucide="clock" class="w-3.5 h-3.5 mr-1.5"></i> ${readTime} min read</span>
      </div>
    `;

    // File Description
    this.previewDescription.textContent = file.description;

    // File Code with Line Numbers
    this.renderCodeBlock(file.content);

    // Fade-in animation reset
    const previewWrapper = document.getElementById("preview-wrapper");
    previewWrapper.classList.remove("fade-in-content");
    void previewWrapper.offsetWidth; // Trigger reflow to restart animation
    previewWrapper.classList.add("fade-in-content");

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // HTML escape helper to prevent scripting injections in code preview
  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Render code block content with mock line numbers
  renderCodeBlock(content) {
    const escaped = this.escapeHTML(content);
    const lines = escaped.split('\n');
    
    // Build HTML block with custom line number wrapper
    const codeHTML = lines.map((line, idx) => {
      const lineNum = idx + 1;
      return `<div class="code-line relative pr-4 flex">
        <span class="inline-block w-8 select-none text-slate-600 text-right pr-3 font-mono border-r border-slate-800/60 mr-4 text-xs">${lineNum}</span>
        <span class="whitespace-pre font-mono text-slate-300 text-xs flex-1 ${this.state.wordWrap ? 'break-all whitespace-pre-wrap' : 'overflow-x-visible'}">${line || ' '}</span>
      </div>`;
    }).join("");

    this.previewCode.innerHTML = codeHTML;
    
    // Toggle word-wrap class on container based on state
    if (this.state.wordWrap) {
      this.previewCode.classList.add("whitespace-pre-wrap");
      this.wrapBtn.classList.add("bg-indigo-600/30", "text-indigo-400", "border-indigo-500/40");
      this.wrapBtn.classList.remove("bg-slate-900/40", "text-slate-400", "border-slate-800");
    } else {
      this.previewCode.classList.remove("whitespace-pre-wrap");
      this.wrapBtn.classList.remove("bg-indigo-600/30", "text-indigo-400", "border-indigo-500/40");
      this.wrapBtn.classList.add("bg-slate-900/40", "text-slate-400", "border-slate-800");
    }
  }

  // Pagination renderer
  renderPagination(filteredFiles) {
    if (filteredFiles.length === 0) {
      this.prevBtn.disabled = true;
      this.nextBtn.disabled = true;
      this.pageCounter.textContent = "0/0";
      return;
    }

    const currentIdx = this.state.getCurrentFileIndex(filteredFiles);
    const total = filteredFiles.length;

    // Update Counter (using 1-based indexing for display)
    const pageNum = currentIdx !== -1 ? currentIdx + 1 : 1;
    this.pageCounter.textContent = `${pageNum}/${total}`;

    // Enable/disable navigation buttons
    this.prevBtn.disabled = currentIdx <= 0;
    this.nextBtn.disabled = currentIdx === -1 || currentIdx >= total - 1;

    // Disabled styling
    [this.prevBtn, this.nextBtn].forEach(btn => {
      if (btn.disabled) {
        btn.classList.add("opacity-40", "cursor-not-allowed");
        btn.classList.remove("hover:bg-slate-800", "hover:text-slate-200");
      } else {
        btn.classList.remove("opacity-40", "cursor-not-allowed");
        btn.classList.add("hover:bg-slate-800", "hover:text-slate-200");
      }
    });
  }

  // Navigate pagination (Previous/Next index)
  navigatePagination(direction) {
    const filteredFiles = this.state.getFilteredFiles();
    if (filteredFiles.length === 0) return;

    const currentIdx = this.state.getCurrentFileIndex(filteredFiles);
    if (currentIdx === -1) return;

    const nextIdx = currentIdx + direction;
    if (nextIdx >= 0 && nextIdx < filteredFiles.length) {
      const fileId = filteredFiles[nextIdx].id;
      
      // Select new file
      this.selectFile(fileId);
      
      // Auto-scroll the active file list card into view
      const activeCard = this.fileListContainer.querySelector(`[data-file-id="${fileId}"]`);
      if (activeCard) {
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  // Toggle word wrap
  toggleWordWrap() {
    this.state.wordWrap = !this.state.wordWrap;
    const file = this.state.files.find(f => f.id === this.state.currentFileId);
    if (file) {
      this.renderCodeBlock(file.content);
      this.showToast(`Word wrap ${this.state.wordWrap ? 'enabled' : 'disabled'}.`, "info");
    }
  }

  // Copy code to clipboard
  async copyFileContent() {
    const file = this.state.files.find(f => f.id === this.state.currentFileId);
    if (!file) return;

    try {
      await navigator.clipboard.writeText(file.content);
      this.showToast("📋 Code copied to clipboard!", "success");
      
      // Temporary button feedback
      const originalHTML = this.copyBtn.innerHTML;
      this.copyBtn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 mr-1.5 text-emerald-400"></i> Copied';
      if (typeof lucide !== 'undefined') lucide.createIcons();
      
      setTimeout(() => {
        this.copyBtn.innerHTML = originalHTML;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }, 2000);
    } catch (e) {
      this.showToast("Failed to copy content.", "error");
    }
  }

  // Download raw file
  downloadRawFile() {
    const file = this.state.files.find(f => f.id === this.state.currentFileId);
    if (!file) return;

    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name.split('/').pop(); // Save as basename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast(`💾 Downloading ${file.name.split('/').pop()}...`, "success");
  }

  // Toggle dynamic Modal
  toggleModal(show) {
    if (show) {
      this.modal.classList.remove("hidden");
      this.modal.classList.add("flex");
      document.getElementById("modal-file-name").focus();
    } else {
      this.modal.classList.add("hidden");
      this.modal.classList.remove("flex");
      this.modalForm.reset();
    }
  }

  // Handle addition of new file
  handleNewFileSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("modal-file-name").value.trim();
    const category = document.getElementById("modal-file-category").value;
    const description = document.getElementById("modal-file-desc").value.trim();
    const tags = document.getElementById("modal-file-tags").value.trim();
    const content = document.getElementById("modal-file-content").value;

    if (!name || !description || !content) {
      this.showToast("Please fill all required fields.", "error");
      return;
    }

    // Add file and store
    const newFile = this.state.addFile(name, category, tags, description, content);
    
    // Close Modal
    this.toggleModal(false);
    
    // Re-render
    this.render();
    
    // Scroll active file card into view
    setTimeout(() => {
      const activeCard = this.fileListContainer.querySelector(`[data-file-id="${newFile.id}"]`);
      if (activeCard) {
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);

    this.showToast(`📁 File '${name}' created successfully.`, "success");
  }

  // Helper icons selector
  getFileIcon(name, category, active) {
    const activeColor = active ? 'text-indigo-400' : 'text-slate-400';
    
    if (name.endsWith('.md')) {
      return `<i data-lucide="book-open" class="w-4 h-4 flex-shrink-0 ${activeColor}"></i>`;
    }
    if (name.endsWith('.json')) {
      return `<i data-lucide="braces" class="w-4 h-4 flex-shrink-0 ${activeColor}"></i>`;
    }
    if (name.endsWith('.sh')) {
      return `<i data-lucide="terminal" class="w-4 h-4 flex-shrink-0 ${activeColor}"></i>`;
    }
    
    // Default categorizations
    switch(category) {
      case 'Source':
        return `<i data-lucide="code" class="w-4 h-4 flex-shrink-0 ${activeColor}"></i>`;
      case 'Docs':
        return `<i data-lucide="file-text" class="w-4 h-4 flex-shrink-0 ${activeColor}"></i>`;
      case 'Config':
        return `<i data-lucide="settings" class="w-4 h-4 flex-shrink-0 ${activeColor}"></i>`;
      case 'Scripts':
        return `<i data-lucide="terminal" class="w-4 h-4 flex-shrink-0 ${activeColor}"></i>`;
      case 'Tests':
        return `<i data-lucide="shield-check" class="w-4 h-4 flex-shrink-0 ${activeColor}"></i>`;
      default:
        return `<i data-lucide="file" class="w-4 h-4 flex-shrink-0 ${activeColor}"></i>`;
    }
  }

  // Helper category badge colors
  getCategoryBadgeStyle(category) {
    switch(category) {
      case 'Source':
        return 'text-violet-400 bg-violet-950/20 border-violet-800/40';
      case 'Docs':
        return 'text-cyan-400 bg-cyan-950/20 border-cyan-800/40';
      case 'Config':
        return 'text-amber-400 bg-amber-950/20 border-amber-800/40';
      case 'Scripts':
        return 'text-rose-400 bg-rose-950/20 border-rose-800/40';
      case 'Tests':
        return 'text-emerald-400 bg-emerald-950/20 border-emerald-800/40';
      default:
        return 'text-slate-400 bg-slate-850 border-slate-755';
    }
  }

  // Simple Toast notifications
  showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `flex items-center space-x-3 px-4 py-3 rounded-lg border glass-panel shadow-2xl transition-all duration-300 transform translate-y-4 opacity-0 max-w-sm pointer-events-auto`;
    
    let icon = '<i data-lucide="info" class="w-4 h-4 text-sky-400"></i>';
    let borderClass = 'border-slate-800';
    
    if (type === 'success') {
      icon = '<i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i>';
      borderClass = 'border-emerald-500/20';
    } else if (type === 'error') {
      icon = '<i data-lucide="alert-circle" class="w-4 h-4 text-rose-400"></i>';
      borderClass = 'border-rose-500/20';
    }

    toast.classList.add(borderClass);
    toast.innerHTML = `
      ${icon}
      <span class="text-xs font-medium text-slate-200">${message}</span>
    `;

    this.toastContainer.appendChild(toast);
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Trigger animation
    setTimeout(() => {
      toast.classList.remove("translate-y-4", "opacity-0");
    }, 10);

    // Clean up
    setTimeout(() => {
      toast.classList.add("translate-y-[-10px]", "opacity-0");
      setTimeout(() => {
        this.toastContainer.removeChild(toast);
      }, 300);
    }, 3500);
  }
}

// 4. Initialize and export
window.addEventListener("DOMContentLoaded", () => {
  const state = new StateManager();
  const ui = new RepoViewerUI(state);
  ui.init();
  
  // Attach state & ui to window for console diagnostics
  window.__RepoViewer = { state, ui };
});
