// 配置模块 - API配置和模型元数据

const config = {
  // API基础配置
  baseURL: "https://gen.pollinations.ai",

  // API端点配置
  endpoints: {
    models: "/models",
    text: "/v1/chat/completions",
    image: "/image",
    video: "/video",
    audio: "/audio"
  },

  // 状态
  apiKeyValid: false,
  currentType: "text",
  allModelsMetadata: {},

  // 获取带元数据的默认模型列表
  getDefaultModelsWithMetadata(type, lang = "zh") {
    const t = lang;
    const defaultModels = {
      text: {
        "gpt-4o": {
          id: "gpt-4o",
          name: t === "zh" ? "GPT-4o (最新)" : "GPT-4o (Latest)",
          pricing: t === "zh" ? "按Token计费 (≈$0.005/1K Tokens)" : "Token-based pricing (≈$0.005/1K Tokens)",
          capabilities: t === "zh" ? "多模态理解、文本生成、对话" : "Multimodal understanding, text generation, conversation",
          metadata: {
            max_tokens: 128000,
            temperature_range: [0, 2],
            supported_languages: t === "zh" ? ["中文", "英文", "日文", "韩文", "西班牙语", "法语"] : ["zh", "en", "ja", "ko", "es", "fr"],
            status: "available"
          }
        },
        "gpt-4-turbo": {
          id: "gpt-4-turbo",
          name: t === "zh" ? "GPT-4 Turbo" : "GPT-4 Turbo",
          pricing: t === "zh" ? "按Token计费 (≈$0.01/1K Tokens)" : "Token-based pricing (≈$0.01/1K Tokens)",
          capabilities: t === "zh" ? "长文本处理、多语言支持" : "Long text processing, multilingual support",
          metadata: {
            max_tokens: 128000,
            temperature_range: [0, 2],
            supported_languages: t === "zh" ? ["中文", "英文", "日文", "韩文"] : ["zh", "en", "ja", "ko"],
            status: "available"
          }
        },
        "llama-3.1": {
          id: "llama-3.1",
          name: t === "zh" ? "Llama 3.1" : "Llama 3.1",
          pricing: t === "zh" ? "免费/按量计费" : "Free/Pay-as-you-go",
          capabilities: t === "zh" ? "开源大模型、文本生成、代码生成" : "Open-source large model, text generation, code generation",
          metadata: {
            max_tokens: 128000,
            temperature_range: [0, 1.5],
            supported_languages: t === "zh" ? ["英文", "中文", "多语言"] : ["en", "zh", "multilingual"],
            status: "available"
          }
        },
        "gemini-1.5": {
          id: "gemini-1.5",
          name: t === "zh" ? "Gemini 1.5" : "Gemini 1.5",
          pricing: t === "zh" ? "按Token计费 (≈$0.0025/1K Tokens)" : "Token-based pricing (≈$0.0025/1K Tokens)",
          capabilities: t === "zh" ? "多模态理解、长文本处理" : "Multimodal understanding, long text processing",
          metadata: {
            max_tokens: 2000000,
            temperature_range: [0, 2],
            supported_languages: t === "zh" ? ["中文", "英文", "多语言"] : ["zh", "en", "multilingual"],
            status: "available"
          }
        },
        "claude-3": {
          id: "claude-3",
          name: t === "zh" ? "Claude 3" : "Claude 3",
          pricing: t === "zh" ? "按Token计费 (≈$0.003/1K Tokens)" : "Token-based pricing (≈$0.003/1K Tokens)",
          capabilities: t === "zh" ? "长文本处理、安全性高" : "Long text processing, high security",
          metadata: {
            max_tokens: 200000,
            temperature_range: [0, 1],
            supported_languages: t === "zh" ? ["英文", "中文"] : ["en", "zh"],
            status: "available"
          }
        }
      },
      image: {
        "flux-1.1": {
          id: "flux-1.1",
          name: t === "zh" ? "Flux 1.1 (默认)" : "Flux 1.1 (Default)",
          pricing: t === "zh" ? "$0.02/张 (1024x1024)" : "$0.02/image (1024x1024)",
          capabilities: t === "zh" ? "高质量图片生成、细节丰富" : "High-quality image generation, rich details",
          metadata: {
            resolution: ["256x256", "512x512", "1024x1024", "2048x2048", "4096x4096"],
            style: t === "zh" ? ["写实", "动漫", "数字艺术", "3D", "抽象"] : ["Photorealistic", "Anime", "Digital Art", "3D", "Abstract"],
            inference_time: t === "zh" ? "2-4秒" : "2-4 seconds",
            status: "available"
          }
        },
        "dall-e-3": {
          id: "dall-e-3",
          name: t === "zh" ? "DALL-E 3" : "DALL-E 3",
          pricing: t === "zh" ? "$0.04/张 (1024x1024)" : "$0.04/image (1024x1024)",
          capabilities: t === "zh" ? "高质量图片生成、文字理解" : "High-quality image generation, text understanding",
          metadata: {
            resolution: ["1024x1024", "1792x1024", "1024x1792"],
            style: t === "zh" ? ["通用", "写实", "艺术"] : ["General", "Photorealistic", "Art"],
            inference_time: t === "zh" ? "4-7秒" : "4-7 seconds",
            status: "available"
          }
        },
        "sd-3.0": {
          id: "sd-3.0",
          name: t === "zh" ? "Stable Diffusion 3.0" : "Stable Diffusion 3.0",
          pricing: t === "zh" ? "$0.015/张 (1024x1024)" : "$0.015/image (1024x1024)",
          capabilities: t === "zh" ? "开源图片生成、自定义模型" : "Open-source image generation, custom models",
          metadata: {
            resolution: ["256x256", "512x512", "1024x1024", "2048x2048"],
            style: t === "zh" ? ["通用", "艺术", "概念"] : ["General", "Art", "Concept"],
            inference_time: t === "zh" ? "4-6秒" : "4-6 seconds",
            status: "available"
          }
        },
        "midjourney": {
          id: "midjourney",
          name: t === "zh" ? "Midjourney" : "Midjourney",
          pricing: t === "zh" ? "$0.03/张 (1024x1024)" : "$0.03/image (1024x1024)",
          capabilities: t === "zh" ? "艺术风格图片生成、创意设计" : "Art style image generation, creative design",
          metadata: {
            resolution: ["1024x1024", "2048x2048"],
            style: t === "zh" ? ["艺术", "创意", "概念"] : ["Art", "Creative", "Concept"],
            inference_time: t === "zh" ? "5-10秒" : "5-10 seconds",
            status: "available"
          }
        }
      },
      video: {
        "gen-3": {
          id: "gen-3",
          name: t === "zh" ? "Runway Gen-3 (默认)" : "Runway Gen-3 (Default)",
          pricing: t === "zh" ? "$0.12/秒 (1080p)" : "$0.12/second (1080p)",
          capabilities: t === "zh" ? "文本生成视频、图片转视频、高质量" : "Text-to-video, image-to-video, high quality",
          metadata: {
            duration: [2, 60],
            resolution: ["720p", "1080p", "4K"],
            fps: [15, 30, 60],
            inference_time: t === "zh" ? "15-40秒" : "15-40 seconds",
            status: "available"
          }
        },
        "pika-1.0": {
          id: "pika-1.0",
          name: t === "zh" ? "Pika 1.0" : "Pika 1.0",
          pricing: t === "zh" ? "$0.10/秒 (1080p)" : "$0.10/second (1080p)",
          capabilities: t === "zh" ? "动漫视频生成、风格化视频" : "Anime video generation, stylized video",
          metadata: {
            duration: [2, 30],
            resolution: ["720p", "1080p"],
            fps: [15, 30, 60],
            inference_time: t === "zh" ? "20-45秒" : "20-45 seconds",
            status: "available"
          }
        },
        "sora": {
          id: "sora",
          name: t === "zh" ? "Sora" : "Sora",
          pricing: t === "zh" ? "邀请制/按量计费" : "Invitation-only/Pay-as-you-go",
          capabilities: t === "zh" ? "长视频生成、高分辨率" : "Long video generation, high resolution",
          metadata: {
            duration: [10, 120],
            resolution: ["1080p", "4K"],
            fps: [24, 30, 60],
            inference_time: t === "zh" ? "30-180秒" : "30-180 seconds",
            status: "available"
          }
        }
      },
      audio: {
        "musicgen-2": {
          id: "musicgen-2",
          name: t === "zh" ? "MusicGen 2 (默认)" : "MusicGen 2 (Default)",
          pricing: t === "zh" ? "$0.006/秒" : "$0.006/second",
          capabilities: t === "zh" ? "文本生成音乐、背景音乐、高质量" : "Text-to-music, background music, high quality",
          metadata: {
            duration: [5, 300],
            format: ["mp3", "wav", "ogg"],
            genres: t === "zh" ? ["流行", "古典", "电子", "摇滚", "爵士", "嘻哈"] : ["Pop", "Classical", "Electronic", "Rock", "Jazz", "Hip-hop"],
            inference_time: t === "zh" ? "4-12秒" : "4-12 seconds",
            status: "available"
          }
        },
        "elevenlabs-v2": {
          id: "elevenlabs-v2",
          name: t === "zh" ? "ElevenLabs v2 (高质量语音)" : "ElevenLabs v2 (High-quality Voice)",
          pricing: t === "zh" ? "$0.0025/秒" : "$0.0025/second",
          capabilities: t === "zh" ? "高质量语音合成、情感语音、多语言" : "High-quality speech synthesis, emotional voice, multilingual",
          metadata: {
            duration: [1, 300],
            voices: t === "zh" ? ["nova", "rachel", "dave", "中文女声", "中文男声", "多语言"] : ["nova", "rachel", "dave", "Chinese Female", "Chinese Male", "multilingual"],
            format: ["mp3", "wav", "ogg"],
            inference_time: t === "zh" ? "1-5秒" : "1-5 seconds",
            status: "available"
          }
        },
        "audiogen-2": {
          id: "audiogen-2",
          name: t === "zh" ? "AudioGen 2" : "AudioGen 2",
          pricing: t === "zh" ? "$0.004/秒" : "$0.004/second",
          capabilities: t === "zh" ? "文本生成音效、环境音、高质量" : "Text-to-sound effects, ambient sounds, high quality",
          metadata: {
            duration: [1, 120],
            format: ["mp3", "wav", "ogg"],
            categories: t === "zh" ? ["自然", "城市", "科幻", "游戏", "电影"] : ["Nature", "City", "Sci-Fi", "Game", "Movie"],
            inference_time: t === "zh" ? "3-8秒" : "3-8 seconds",
            status: "available"
          }
        }
      }
    };

    return defaultModels[type] || {};
  },

  // 处理模型元数据（兼容官方返回的多种格式）
  processModelMetadata(models, lang = "zh") {
    const metadata = {};
    const t = lang;

    // 情况1: 官方API返回的数组格式 [{"name": "model1", ...}]
    if (Array.isArray(models)) {
      models.forEach(model => {
        const modelId = model.name || model.id;
        if (modelId) {
          metadata[modelId] = {
            id: modelId,
            name: model.name || model.id,
            pricing: model.pricing ?
              (t === "zh" ? "按Token计费" : "Token-based pricing") :
              (t === "zh" ? "定价: N/A" : "Pricing: N/A"),
            capabilities: model.description || "Basic generation capabilities",
            metadata: {
              ...model,
              status: "available"
            }
          };
        }
      });
    }
    // 情况2: OpenAI格式 { data: [{ id: "model1", ... }] }
    else if (models.data && Array.isArray(models.data)) {
      models.data.forEach(item => {
        const modelId = item.id || item.name;
        if (modelId) {
          metadata[modelId] = {
            id: modelId,
            name: item.name || item.id,
            pricing: item.pricing || (t === "zh" ? "定价: N/A" : "Pricing: N/A"),
            capabilities: item.capabilities || "Not specified",
            metadata: item.metadata || {}
          };
        }
      });
    }
    // 情况3: 简单数组格式 ["model1", "model2"]
    else if (Array.isArray(models) && models.every(item => typeof item === "string")) {
      models.forEach(modelId => {
        metadata[modelId] = {
          id: modelId,
          name: modelId,
          pricing: t === "zh" ? "定价: N/A" : "Pricing: N/A",
          capabilities: "Basic generation capabilities",
          metadata: {
            type: modelId.includes("flux") ? "image" :
                  modelId.includes("sd") ? "image" :
                  modelId.includes("gpt") ? "text" :
                  modelId.includes("music") ? "audio" : "video",
            status: "available"
          }
        };
      });
    }
    // 情况4: 对象格式 { "model1": { ... }, ... }
    else if (typeof models === "object" && models !== null) {
      Object.entries(models).forEach(([key, value]) => {
        metadata[key] = {
          id: key,
          name: value.name || key,
          pricing: value.pricing || (t === "zh" ? "定价: N/A" : "Pricing: N/A"),
          capabilities: value.capabilities || "Not specified",
          metadata: value.metadata || {}
        };
      });
    }

    return metadata;
  }
};

export default config;
