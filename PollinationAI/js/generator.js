// 生成器模块 - 处理各种生成逻辑

import api from './api.js';
import config from './config.js';
import i18n from './i18n.js';
import ui from './ui.js';

const generator = {
  // 生成内容
  async generate() {
    const key = document.getElementById('apiKey').value.trim();
    const prompt = document.getElementById('prompt').value.trim();

    // 前置验证
    if (!config.apiKeyValid) {
      ui.showError(i18n.t('error_api_required'));
      return;
    }
    if (!key) {
      ui.showError(i18n.t('error_api_empty'));
      return;
    }
    if (!prompt) {
      ui.showError(i18n.t('error_prompt_empty'));
      return;
    }

    // 获取当前选择的模型
    const modelSelect = document.getElementById(`${config.currentType}-model`);
    const selectedModel = modelSelect ? modelSelect.value : '';

    if (!selectedModel) {
      ui.showError(i18n.t('error_model_required'));
      return;
    }

    ui.setGenerateButtonState(true, i18n.t('generate_btn').replace('🚀 ', '') + '...');

    // 根据类型显示不同的加载文本
    let loadingText = '';
    switch(config.currentType) {
      case 'text': loadingText = i18n.t('generating_text'); break;
      case 'image': loadingText = i18n.t('generating_image'); break;
      case 'video': loadingText = i18n.t('generating_video'); break;
      case 'audio': loadingText = i18n.t('generating_audio'); break;
    }
    ui.showLoading(loadingText);

    try {
      switch(config.currentType) {
        case 'text':
          await this.generateText(key, selectedModel, prompt);
          break;
        case 'image':
          await this.generateImage(key, selectedModel, prompt);
          break;
        case 'video':
          await this.generateVideo(key, selectedModel, prompt);
          break;
        case 'audio':
          await this.generateAudio(key, selectedModel, prompt);
          break;
      }
    } catch (error) {
      ui.showError(`❌ ${error.message}`);
    } finally {
      ui.setGenerateButtonState(false, i18n.t('generate_btn'));
    }
  },

  // 生成文本
  async generateText(key, model, prompt) {
    const temperature = parseFloat(document.getElementById('text-temp').value) || 0.7;
    const maxTokens = parseInt(document.getElementById('text-tokens').value) || 2000;

    // 添加用户消息到对话历史
    ui.chatHistory.push({
      role: 'user',
      content: prompt,
      timestamp: new Date().toISOString()
    });

    // 显示对话历史
    ui.renderChatHistory();

    // 构建消息数组
    const messages = ui.chatHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const data = await api.generateText(key, model, messages, temperature, maxTokens);
    const assistantResponse = data.choices?.[0]?.message?.content || i18n.t('no_result');

    // 添加助手回复到对话历史
    ui.chatHistory.push({
      role: 'assistant',
      content: assistantResponse,
      timestamp: new Date().toISOString()
    });

    // 重新渲染对话历史
    ui.renderChatHistory();

    // 添加模型信息
    const resultDiv = document.getElementById('result');
    const modelInfo = document.createElement('div');
    modelInfo.style.cssText = 'margin-top: 10px; font-size: 12px; color: var(--gray);';
    modelInfo.textContent = `${i18n.t('using_model')}: ${model} | ${i18n.t('temperature')}: ${temperature} | ${i18n.t('max_tokens')}: ${maxTokens}`;
    resultDiv.appendChild(modelInfo);
  },

  // 生成图片
  async generateImage(key, model, prompt) {
    const width = document.getElementById('image-width').value || 1024;
    const height = document.getElementById('image-height').value || 1024;
    const style = document.getElementById('image-style').value || '';

    const { url } = await api.generateImage(key, prompt, model, width, height, style);

    const info = `${i18n.t('using_model')}: ${model} | ${i18n.t('dimensions')}: ${width}x${height}`;
    ui.showMediaResult('image', url, info, i18n.t('download_image'));
  },

  // 生成视频
  async generateVideo(key, model, prompt) {
    const duration = document.getElementById('video-duration').value || 10;
    const resolution = document.getElementById('video-res').value || '1080p';
    const fps = document.getElementById('video-fps').value || 24;

    const { url } = await api.generateVideo(key, prompt, model, duration, resolution, fps);

    const info = `${i18n.t('using_model')}: ${model} | ${i18n.t('duration')}: ${duration}s | ${i18n.t('resolution')}: ${resolution} | ${i18n.t('fps')}: ${fps}`;
    ui.showMediaResult('video', url, info, i18n.t('download_video'));
  },

  // 生成音频
  async generateAudio(key, model, prompt) {
    const duration = document.getElementById('audio-duration').value || 30;
    const voice = document.getElementById('audio-voice').value || 'nova';
    const format = document.getElementById('audio-format').value || 'mp3';

    const { url } = await api.generateAudio(key, prompt, model, duration, voice, format);

    const info = `${i18n.t('using_model')}: ${model} | ${i18n.t('duration')}: ${duration}s | ${i18n.t('voice')}: ${voice} | ${i18n.t('format')}: ${format}`;
    ui.showMediaResult('audio', url, info, i18n.t('download_audio'));
  }
};

export default generator;
