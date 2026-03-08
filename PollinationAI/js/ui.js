// UI交互模块 - 处理界面交互

import config from './config.js';
import i18n from './i18n.js';

const ui = {
  // 当前状态
  chatHistory: [],

  // 初始化UI
  init() {
    this.bindTabEvents();
    this.bindAdvancedToggle();
    this.updateParamVisibility();
  },

  // 绑定标签切换事件
  bindTabEvents() {
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        // 更新标签状态
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // 更新当前类型
        config.currentType = tab.dataset.type;

        // 更新模型选择器显示
        document.querySelectorAll('.model-selector').forEach(selector => {
          selector.classList.remove('active');
        });
        document.getElementById(`${config.currentType}-models`).classList.add('active');

        // 更新参数显示
        this.updateParamVisibility();

        // 清空结果区域
        document.getElementById('result').innerHTML = '';
      });
    });
  },

  // 绑定高级设置切换
  bindAdvancedToggle() {
    const toggle = document.getElementById('advanced-toggle');
    const params = document.getElementById('advanced-params');

    if (toggle && params) {
      toggle.addEventListener('click', () => {
        params.classList.toggle('active');
      });
    }
  },

  // 更新参数可见性
  updateParamVisibility() {
    const types = ['text', 'image', 'video', 'audio'];
    types.forEach(type => {
      const el = document.getElementById(`${type}-params`);
      if (el) {
        el.style.display = type === config.currentType ? 'flex' : 'none';
      }
    });
  },

  // 填充模型列表
  populateModelList(selectId, modelsMetadata, type) {
    const select = document.getElementById(selectId);
    if (!select) return;

    select.innerHTML = '';

    // 添加默认选项
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = i18n.t('select_model_default');
    select.appendChild(defaultOption);

    // 添加模型选项
    const modelKeys = Object.keys(modelsMetadata);
    if (modelKeys.length > 0) {
      modelKeys.forEach(modelId => {
        const model = modelsMetadata[modelId];
        const option = document.createElement('option');
        option.value = modelId;
        option.textContent = model.name || modelId;
        select.appendChild(option);
      });
    } else {
      // 如果没有获取到模型，使用默认列表
      const defaultModels = config.getDefaultModelsWithMetadata(type, i18n.currentLang);
      Object.keys(defaultModels).forEach(modelId => {
        const model = defaultModels[modelId];
        const option = document.createElement('option');
        option.value = modelId;
        option.textContent = model.name || modelId;
        select.appendChild(option);
      });
    }

    // 添加模型选择事件监听
    select.addEventListener('change', () => {
      this.updateModelMetadata(type);
    });
  },

  // 更新模型元数据显示
  updateModelMetadata(type) {
    const modelSelect = document.getElementById(`${type}-model`);
    const metadataPanel = document.getElementById(`${type}-metadata`);
    const selectedModelId = modelSelect ? modelSelect.value : '';

    if (!selectedModelId || !config.allModelsMetadata[type] || !config.allModelsMetadata[type][selectedModelId]) {
      if (metadataPanel) {
        metadataPanel.innerHTML = `
          <h4>${i18n.t('model_details')}</h4>
          <div>${i18n.t('select_model_to_view_details')}</div>
        `;
      }
      return;
    }

    const model = config.allModelsMetadata[type][selectedModelId];

    // 构建元数据HTML
    let metadataHtml = `<h4>${i18n.t('model_details')}: ${model.name || model.id}</h4>`;

    // 基础信息
    metadataHtml += `
      <div class="metadata-item">
        <span class="metadata-key">${i18n.t('model_id')}:</span>
        <span class="metadata-value">${model.id}</span>
      </div>
      <div class="metadata-item">
        <span class="metadata-key">${i18n.t('pricing')}:</span>
        <span class="metadata-value">${model.pricing || i18n.t('pricing') + ': N/A'}</span>
      </div>
      <div class="metadata-item">
        <span class="metadata-key">${i18n.t('capabilities')}:</span>
        <span class="metadata-value">${model.capabilities || 'Not specified'}</span>
      </div>
    `;

    // 详细元数据
    if (model.metadata && Object.keys(model.metadata).length > 0) {
      metadataHtml += `<div class="metadata-item"><span class="metadata-key">${i18n.t('metadata')}:</span></div>`;
      Object.entries(model.metadata).forEach(([key, value]) => {
        let displayValue = value;
        if (Array.isArray(value)) {
          displayValue = value.join(', ');
        } else if (typeof value === 'object' && value !== null) {
          displayValue = JSON.stringify(value);
        }

        metadataHtml += `
          <div class="metadata-item" style="padding-left: 10px;">
            <span class="metadata-key">${key}:</span>
            <span class="metadata-value">${displayValue}</span>
          </div>
        `;
      });
    }

    if (metadataPanel) {
      metadataPanel.innerHTML = metadataHtml;
    }
  },

  // 渲染对话历史
  renderChatHistory() {
    const resultDiv = document.getElementById('result');
    if (!resultDiv || config.currentType !== 'text') return;

    let html = '<div class="chat-container">';

    this.chatHistory.forEach((msg, index) => {
      const isUser = msg.role === 'user';
      const avatar = isUser ? 'U' : 'AI';
      const time = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : '';

      html += `
        <div class="chat-message ${msg.role}">
          <div class="chat-avatar ${msg.role}">${avatar}</div>
          <div>
            <div class="chat-content">${this.escapeHtml(msg.content)}</div>
            ${time ? `<div class="chat-meta">${time}</div>` : ''}
          </div>
        </div>
      `;
    });

    html += '</div>';
    resultDiv.innerHTML = html;

    // 滚动到底部
    const container = resultDiv.querySelector('.chat-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  },

  // 转义HTML特殊字符
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  // 显示加载状态
  showLoading(message) {
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
      resultDiv.innerHTML = `<div class="loading">${message}</div>`;
    }
  },

  // 显示错误
  showError(message) {
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
      resultDiv.innerHTML = `<div class="error">${message}</div>`;
    }
  },

  // 显示媒体结果
  showMediaResult(type, url, info, downloadText) {
    const resultDiv = document.getElementById('result');
    if (!resultDiv) return;

    let mediaHtml = '';

    switch(type) {
      case 'image':
        mediaHtml = `<img src="${url}" alt="Generated Image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">`;
        break;
      case 'video':
        mediaHtml = `<video controls src="${url}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"></video>`;
        break;
      case 'audio':
        mediaHtml = `<audio controls src="${url}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"></audio>`;
        break;
    }

    resultDiv.innerHTML = `
      <div class="media-container">
        <div class="media-info">${info}</div>
        ${mediaHtml}
        <div class="error" style="display: none;">加载媒体失败</div>
        <a href="${url}" download class="download-btn">${downloadText}</a>
      </div>
    `;
  },

  // 设置生成按钮状态
  setGenerateButtonState(disabled, text) {
    const btn = document.getElementById('generate');
    if (btn) {
      btn.disabled = disabled;
      if (text) {
        btn.textContent = text;
      }
    }
  },

  // 更新测试状态
  updateTestStatus(message, isError = false) {
    const statusDiv = document.getElementById('testStatus');
    if (statusDiv) {
      statusDiv.textContent = message;
      statusDiv.className = 'test-status ' + (isError ? 'test-error' : 'test-success');
      statusDiv.style.display = 'block';
    }
  },

  // 隐藏测试状态
  hideTestStatus() {
    const statusDiv = document.getElementById('testStatus');
    if (statusDiv) {
      statusDiv.style.display = 'none';
    }
  },

  // 清空测试状态
  clearTestStatus() {
    const statusDiv = document.getElementById('testStatus');
    if (statusDiv) {
      statusDiv.textContent = '';
      statusDiv.className = 'test-status';
      statusDiv.style.display = 'none';
    }
  }
};

export default ui;
