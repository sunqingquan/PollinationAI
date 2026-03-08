// 国际化模块 - 多语言翻译

const i18n = {
  currentLang: "zh",

  // 语言包定义
  translations: {
    zh: {
      title: "Pollinations AI 全能生成",
      subtitle: "文本｜图片｜视频｜音频｜语音 一站式生成（官方API版）",
      api_key_label: "API Key（从 enter.pollinations.ai 获取）",
      api_key_placeholder: "pk_xxx 或 sk_xxx",
      test_api_btn: "🔍 测试并加载模型列表",
      get_api_key_btn: "🔑 获取API Key",
      tab_text: "💬 文本",
      tab_image: "🖼️ 图片",
      tab_video: "🎬 视频",
      tab_audio: "🔊 音频",
      text_model_label: "文本生成模型",
      image_model_label: "图片生成模型",
      video_model_label: "视频生成模型",
      audio_model_label: "音频生成模型",
      select_model_default: "请先测试API连接",
      model_details: "📋 模型详情",
      select_model_to_view: "请选择模型查看详细信息",
      prompt_placeholder: "输入你的提示词...",
      advanced_settings: "⚙️ 高级设置",
      temperature_label: "温度值 (Temperature)",
      max_tokens_label: "最大长度 (Max Tokens)",
      role_label: "角色",
      role_user: "用户",
      role_system: "系统",
      role_assistant: "助手",
      width_label: "宽度",
      height_label: "高度",
      style_label: "风格",
      style_default: "默认",
      style_photorealistic: "写实",
      style_anime: "动漫",
      style_digital_art: "数字艺术",
      style_3d: "3D",
      style_oil_painting: "油画",
      duration_label: "时长 (秒)",
      resolution_label: "分辨率",
      res_720p: "720p",
      res_1080p: "1080p",
      res_4k: "4K (预览)",
      fps_label: "帧率",
      voice_label: "语音",
      voice_nova: "Nova (默认)",
      voice_rachel: "Rachel",
      voice_dave: "Dave",
      voice_samantha: "Samantha",
      voice_chinese_female: "中文女声",
      voice_chinese_male: "中文男声",
      format_label: "格式",
      format_mp3: "MP3",
      format_wav: "WAV",
      format_ogg: "OGG",
      generate_btn: "🚀 立即生成",
      // 动态文本
      test_connecting: "🔄 正在测试API连接并加载模型列表...",
      test_success: "✅ API验证成功，模型列表已加载（含完整元数据）",
      test_error_empty: "❌ 请输入有效的API Key",
      generating_text: "⏳ 正在生成文本，请稍候...",
      generating_image: "⏳ 正在生成图片，请稍候...",
      generating_video: "⏳ 正在生成视频，请稍候...",
      generating_audio: "⏳ 正在生成音频，请稍候...",
      error_api_required: "❌ 请先测试并验证API Key",
      error_api_empty: "❌ 请输入 Pollinations API Key",
      error_prompt_empty: "❌ 请输入提示词",
      error_model_required: "❌ 请选择有效的生成模型",
      download_image: "📥 下载图片",
      download_video: "📥 下载视频",
      download_audio: "📥 下载音频",
      using_model: "使用模型",
      temperature: "温度值",
      max_tokens: "Max Tokens",
      dimensions: "尺寸",
      duration: "时长",
      resolution: "分辨率",
      fps: "帧率",
      voice: "语音",
      format: "格式",
      model_id: "ID",
      pricing: "定价",
      capabilities: "核心能力",
      metadata: "元数据",
      select_model_to_view_details: "请选择模型查看详细信息",
      no_result: "无返回结果",
      response_format: "响应格式",
      seed_label: "种子 (Seed)",
      negative_prompt_label: "反向提示词",
      guidance_scale_label: "引导强度",
      steps_label: "步数",
    },
    en: {
      title: "Pollinations AI All-in-One Generator",
      subtitle: "Text | Image | Video | Audio | Voice Generation (Official API)",
      api_key_label: "API Key (Get from enter.pollinations.ai)",
      api_key_placeholder: "pk_xxx or sk_xxx",
      test_api_btn: "🔍 Test & Load Models",
      get_api_key_btn: "🔑 Get API Key",
      tab_text: "💬 Text",
      tab_image: "🖼️ Image",
      tab_video: "🎬 Video",
      tab_audio: "🔊 Audio",
      text_model_label: "Text Generation Model",
      image_model_label: "Image Generation Model",
      video_model_label: "Video Generation Model",
      audio_model_label: "Audio Generation Model",
      select_model_default: "Please test API connection first",
      model_details: "📋 Model Details",
      select_model_to_view: "Select a model to view details",
      prompt_placeholder: "Enter your prompt...",
      advanced_settings: "⚙️ Advanced Settings",
      temperature_label: "Temperature",
      max_tokens_label: "Max Tokens",
      role_label: "Role",
      role_user: "User",
      role_system: "System",
      role_assistant: "Assistant",
      width_label: "Width",
      height_label: "Height",
      style_label: "Style",
      style_default: "Default",
      style_photorealistic: "Photorealistic",
      style_anime: "Anime",
      style_digital_art: "Digital Art",
      style_3d: "3D",
      style_oil_painting: "Oil Painting",
      duration_label: "Duration (seconds)",
      resolution_label: "Resolution",
      res_720p: "720p",
      res_1080p: "1080p",
      res_4k: "4K (Preview)",
      fps_label: "FPS",
      voice_label: "Voice",
      voice_nova: "Nova (Default)",
      voice_rachel: "Rachel",
      voice_dave: "Dave",
      voice_samantha: "Samantha",
      voice_chinese_female: "Chinese Female",
      voice_chinese_male: "Chinese Male",
      format_label: "Format",
      format_mp3: "MP3",
      format_wav: "WAV",
      format_ogg: "OGG",
      generate_btn: "🚀 Generate Now",
      test_connecting: "🔄 Testing API connection and loading models...",
      test_success: "✅ API verified, models loaded (with full metadata)",
      test_error_empty: "❌ Please enter a valid API Key",
      generating_text: "⏳ Generating text, please wait...",
      generating_image: "⏳ Generating image, please wait...",
      generating_video: "⏳ Generating video, please wait...",
      generating_audio: "⏳ Generating audio, please wait...",
      error_api_required: "❌ Please test and verify API Key first",
      error_api_empty: "❌ Please enter Pollinations API Key",
      error_prompt_empty: "❌ Please enter a prompt",
      error_model_required: "❌ Please select a valid generation model",
      download_image: "📥 Download Image",
      download_video: "📥 Download Video",
      download_audio: "📥 Download Audio",
      using_model: "Using Model",
      temperature: "Temperature",
      max_tokens: "Max Tokens",
      dimensions: "Dimensions",
      duration: "Duration",
      resolution: "Resolution",
      fps: "FPS",
      voice: "Voice",
      format: "Format",
      model_id: "ID",
      pricing: "Pricing",
      capabilities: "Capabilities",
      metadata: "Metadata",
      select_model_to_view_details: "Select a model to view details",
      no_result: "No result",
      response_format: "Response Format",
      seed_label: "Seed",
      negative_prompt_label: "Negative Prompt",
      guidance_scale_label: "Guidance Scale",
      steps_label: "Steps",
    }
  },

  // 检测用户浏览器语言
  detectUserLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    const langCode = userLang.split('-')[0];
    return this.translations[langCode] ? langCode : "en";
  },

  // 获取翻译文本
  t(key) {
    return this.translations[this.currentLang][key] || key;
  },

  // 切换语言
  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
      this.updatePageLanguage();
      return true;
    }
    return false;
  },

  // 更新页面语言
  updatePageLanguage() {
    // 更新带 data-lang-key 属性的元素
    document.querySelectorAll('[data-lang-key]').forEach(el => {
      const key = el.getAttribute('data-lang-key');
      if (this.translations[this.currentLang][key]) {
        el.textContent = this.translations[this.currentLang][key];
      }
    });

    // 更新 placeholder
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
      const key = el.getAttribute('data-lang-placeholder');
      if (this.translations[this.currentLang][key]) {
        el.placeholder = this.translations[this.currentLang][key];
      }
    });

    // 更新语言按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
    });
  },

  // 初始化
  init() {
    this.currentLang = this.detectUserLanguage();
    this.updatePageLanguage();

    // 保存当前对象的引用
    const self = this;

    // 绑定语言切换事件
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        self.setLanguage(this.dataset.lang);
      });
    });
  }
};

export default i18n;
