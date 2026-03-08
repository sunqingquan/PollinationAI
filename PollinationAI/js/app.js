// 主应用模块 - 初始化应用

import config from './config.js';
import i18n from './i18n.js';
import ui from './ui.js';
import api from './api.js';
import generator from './generator.js';

const app = {
  init() {
    // 初始化国际化
    i18n.init();

    // 初始化UI
    ui.init();

    // 绑定API测试按钮
    this.bindTestApiButton();

    // 绑定获取API Key按钮
    this.bindGetApiKeyButton();

    // 绑定生成按钮
    this.bindGenerateButton();

    // 初始化模型列表（使用默认模型）
    this.initializeDefaultModels();
  },

  // 绑定API测试按钮
  bindTestApiButton() {
    const testBtn = document.getElementById('testApi');
    if (!testBtn) return;

    testBtn.addEventListener('click', async () => {
      const key = document.getElementById('apiKey').value.trim();

      if (!key) {
        ui.updateTestStatus(i18n.t('test_error_empty'), true);
        return;
      }

      testBtn.disabled = true;
      ui.updateTestStatus(i18n.t('test_connecting'));

      try {
        const result = await api.testConnection(key);

        if (result.success) {
          config.apiKeyValid = true;
          ui.updateTestStatus(i18n.t('test_success'));

          // 启用生成按钮
          ui.setGenerateButtonState(false, i18n.t('generate_btn'));

          // 加载模型列表
          await this.loadModels(key, result.data, result.useDefaults);
        }
      } catch (error) {
        config.apiKeyValid = false;
        ui.updateTestStatus(`❌ ${error.message}`, true);
        ui.setGenerateButtonState(true, i18n.t('generate_btn'));

        // 清空所有模型选择器
        const modelTypes = ['text', 'image', 'video', 'audio'];
        modelTypes.forEach(type => {
          const select = document.getElementById(`${type}-model`);
          if (select) {
            select.innerHTML = `<option value="">${i18n.t('select_model_default')}: ${error.message}</option>`;
          }
          const metadata = document.getElementById(`${type}-metadata`);
          if (metadata) {
            metadata.innerHTML = `<h4>${i18n.t('model_details')}</h4><div class="error">Loading failed: ${error.message}</div>`;
          }
        });
      } finally {
        testBtn.disabled = false;
      }
    });
  },

  // 绑定获取API Key按钮
  bindGetApiKeyButton() {
    const getKeyBtn = document.getElementById('getApiKey');
    if (getKeyBtn) {
      getKeyBtn.addEventListener('click', () => {
        window.open('https://enter.pollinations.ai', '_blank');
      });
    }
  },

  // 绑定生成按钮
  bindGenerateButton() {
    const generateBtn = document.getElementById('generate');
    if (generateBtn) {
      generateBtn.addEventListener('click', () => generator.generate());
    }
  },

  // 初始化默认模型
  initializeDefaultModels() {
    const types = ['text', 'image', 'video', 'audio'];

    types.forEach(type => {
      const defaultModels = config.getDefaultModelsWithMetadata(type, i18n.currentLang);
      config.allModelsMetadata[type] = defaultModels;
      ui.populateModelList(`${type}-model`, defaultModels, type);
    });
  },

  // 加载模型列表
  async loadModels(apiKey, apiData, useDefaults = false) {
    const types = ['text', 'image', 'video', 'audio'];

    for (const type of types) {
      try {
        let modelsMetadata = {};

        if (useDefaults || !apiData) {
          // 使用默认模型
          modelsMetadata = config.getDefaultModelsWithMetadata(type, i18n.currentLang);
        } else {
          // 处理API返回的数据
          modelsMetadata = config.processModelMetadata(apiData, i18n.currentLang);
        }

        config.allModelsMetadata[type] = modelsMetadata;
        ui.populateModelList(`${type}-model`, modelsMetadata, type);
      } catch (error) {
        console.warn(`Failed to load ${type} models:`, error);
        // 使用默认模型作为回退
        const defaultModels = config.getDefaultModelsWithMetadata(type, i18n.currentLang);
        config.allModelsMetadata[type] = defaultModels;
        ui.populateModelList(`${type}-model`, defaultModels, type);
      }
    }
  }
};

// 当DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

export default app;
