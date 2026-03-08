// API模块 - 处理所有API请求

import config from './config.js';
import i18n from './i18n.js';

const api = {
  // 测试API连接并获取模型列表
  async testConnection(apiKey) {
    const base = config.baseURL;

    try {
      // 尝试获取模型列表
      const response = await fetch(`${base}${config.endpoints.models}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      // 如果模型列表获取失败，尝试用默认模型
      console.warn('Failed to fetch models, using defaults:', error);
      return { success: true, data: null, useDefaults: true };
    }
  },

  // 生成文本
  async generateText(apiKey, model, messages, temperature, maxTokens) {
    const base = config.baseURL;

    const response = await fetch(`${base}${config.endpoints.text}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: temperature,
        max_tokens: maxTokens
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  },

  // 生成图片
  async generateImage(apiKey, prompt, model, width, height, style) {
    const base = config.baseURL;

    // 构建参数
    const params = new URLSearchParams({
      width: width,
      height: height,
      model: model,
      key: apiKey
    });

    if (style) params.append('style', style);

    const encodedPrompt = encodeURIComponent(prompt);
    const url = `${base}${config.endpoints.image}/${encodedPrompt}?${params.toString()}`;

    // 图片生成是GET请求，直接返回URL
    return { url };
  },

  // 生成视频
  async generateVideo(apiKey, prompt, model, duration, resolution, fps) {
    const base = config.baseURL;

    const params = new URLSearchParams({
      model: model,
      duration: duration,
      resolution: resolution,
      fps: fps,
      key: apiKey
    });

    const encodedPrompt = encodeURIComponent(prompt);
    const url = `${base}${config.endpoints.video}/${encodedPrompt}?${params.toString()}`;

    return { url };
  },

  // 生成音频
  async generateAudio(apiKey, prompt, model, duration, voice, format) {
    const base = config.baseURL;

    const params = new URLSearchParams({
      model: model,
      duration: duration,
      voice: voice,
      format: format,
      key: apiKey
    });

    const encodedPrompt = encodeURIComponent(prompt);
    const url = `${base}${config.endpoints.audio}/${encodedPrompt}?${params.toString()}`;

    return { url };
  },

  // 获取所有模型列表
  async fetchAllModels(apiKey) {
    const types = ['text', 'image', 'video', 'audio'];
    const results = {};

    for (const type of types) {
      try {
        // 这里可以根据不同类型使用不同的端点
        // 目前使用默认模型
        results[type] = config.getDefaultModelsWithMetadata(type, i18n.currentLang);
      } catch (error) {
        console.warn(`Failed to fetch ${type} models:`, error);
        results[type] = config.getDefaultModelsWithMetadata(type, i18n.currentLang);
      }
    }

    return results;
  }
};

export default api;
