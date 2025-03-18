import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Settings, Save, Upload, RefreshCw } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  image: string;
}

interface Category {
  id: string;
  label: string;
  color: string;
  toolIds: string[];
}

interface ToolCategory {
  id: string;
  label: string;
  tools: Tool[];
}

const TIER_COLORS = {
  default: [
    { label: 'S', color: '#FF7F7F' },  // Soft Red
    { label: 'A', color: '#FFBF7F' },  // Soft Orange
    { label: 'B', color: '#FFFF7F' },  // Soft Yellow
    { label: 'C', color: '#7FFF7F' },  // Soft Green
    { label: 'D', color: '#7FBFFF' },  // Soft Blue
  ],
  categories: [
    { label: 'Ecosystem', color: '#9F7FFF' },     // Soft Purple
    { label: 'Sandbox', color: '#FF7FBF' },       // Soft Pink
    { label: 'Watch List', color: '#7FFFFF' },    // Soft Cyan
    { label: 'Horizon', color: '#BFFF7F' },       // Soft Lime
    { label: 'Specialized', color: '#FF9F7F' }    // Soft Coral
  ]
};

const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'chat',
    label: 'Chat',
    tools: [
      { id: 'claude', name: 'Claude AI', image: 'icons/chat/claude.png' },
      { id: 'gemini', name: 'Gemini', image: 'icons/chat/gemini.png' },
      { id: 'ollama', name: 'Ollama', image: 'icons/chat/ollama.png' },
      { id: 'openai', name: 'OpenAI', image: 'icons/chat/openai.png' }
    ]
  },
  {
    id: 'dev',
    label: 'Development',
    tools: [
      { id: '11labs', name: 'Eleven Labs', image: 'icons/dev/11labs.png' },
      { id: 'claude', name: 'Claude AI', image: 'icons/dev/claude.png' },
      { id: 'cursor', name: 'Cursor', image: 'icons/dev/cursor.png' },
      { id: 'datastax', name: 'DataStax', image: 'icons/dev/datastax.png' },
      { id: 'gemini', name: 'Gemini', image: 'icons/dev/gemini.png' },
      { id: 'langflow', name: 'LangFlow', image: 'icons/dev/langflow.png' },
      { id: 'loveable', name: 'Loveable', image: 'icons/dev/loveable.png' },
      { id: 'ollama', name: 'Ollama', image: 'icons/dev/ollama.png' },
      { id: 'openai', name: 'OpenAI', image: 'icons/dev/openai.png' },
      { id: 'replicate', name: 'Replicate', image: 'icons/dev/replicate.png' },
      { id: 'soro', name: 'Soro', image: 'icons/dev/soro.png' },
      { id: 'streamlit', name: 'Streamlit', image: 'icons/dev/streamlit.png' },
      { id: 'vscode', name: 'VS Code', image: 'icons/dev/vscode.png' },
      { id: 'windsurf', name: 'Windsurf', image: 'icons/dev/windsurf.png' },
      { id: 'vercel', name: 'Vercel', image: 'icons/dev/vercel.png' },
      { id: 'amplify', name: 'AWS Amplify', image: 'icons/dev/aws_amplify.png' },
      { id: 'lambda', name: 'Lambda', image: 'icons/dev/lambda.png' },
      { id: 'github', name: 'GitHub', image: 'icons/dev/github.png' },
      { id: 'deepseek', name: 'DeepSeek', image: 'icons/dev/deepseek.png' },
      { id: 'manus', name: 'Manus', image: 'icons/dev/manus.png' },
      { id: 'notebookllm', name: 'Notebookllm', image: 'icons/dev/notebookllm.png' },
      { id: 'opusclip', name: 'OpusClip', image: 'icons/dev/opusclip.png' },
      { id: 'pydanticai', name: 'PydanticAI', image: 'icons/dev/pydanticai.png' },
      { id: 'napkinai', name: 'NapkinAI', image: 'icons/dev/napkin-ai.png' }
    ]
  },
  {
    id: 'images',
    label: 'Images',
    tools: [
      { id: 'firefly', name: 'Firefly', image: 'icons/images/firefly.png' },
      { id: 'flux', name: 'Flux', image: 'icons/images/flux.png' },
      { id: 'ideogram', name: 'Ideogram', image: 'icons/images/ideogram.png' },
      { id: 'leonardo', name: 'Leonardo', image: 'icons/images/leonardo.png' },
      { id: 'luma', name: 'Luma', image: 'icons/images/luma.png' },
      { id: 'midjourney', name: 'Midjourney', image: 'icons/images/midjourney.png' },
      { id: 'openai', name: 'OpenAI', image: 'icons/images/openai.png' },
      { id: 'stability', name: 'Stability AI', image: 'icons/images/stability.png' }
    ]
  },
  {
    id: 'learning',
    label: 'Learning',
    tools: [
      { id: '11labs', name: 'Eleven Labs', image: 'icons/learning/11labs.png' },
      { id: 'canva', name: 'Canva', image: 'icons/learning/canva.png' },
      { id: 'claude', name: 'Claude AI', image: 'icons/learning/claude.png' },
      { id: 'd-id', name: 'D-ID', image: 'icons/learning/d-id.png' },
      { id: 'firefly', name: 'Firefly', image: 'icons/learning/firefly.png' },
      { id: 'gemini', name: 'Gemini', image: 'icons/learning/gemini.png' },
      { id: 'heygen', name: 'HeyGen', image: 'icons/learning/heygen.png' },
      { id: 'hugging', name: 'Hugging Face', image: 'icons/learning/hugging.png' },
      { id: 'ideogram', name: 'Ideogram', image: 'icons/learning/ideogram.png' },
      { id: 'kling', name: 'Kling', image: 'icons/learning/kling.png' },
      { id: 'make', name: 'Make', image: 'icons/learning/make.png' },
      { id: 'minimax', name: 'MiniMax', image: 'icons/learning/minimax.png' },
      { id: 'replicate', name: 'Replicate', image: 'icons/learning/replicate.png' },
      { id: 'runway', name: 'Runway', image: 'icons/learning/runway.png' },
      { id: 'synthesia', name: 'Synthesia', image: 'icons/learning/synthesia.png' },
      { id: 'zapier', name: 'Zapier', image: 'icons/learning/zapier.png' }
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing',
    tools: [
      { id: '11labs', name: 'Eleven Labs', image: 'icons/marketing/11labs.png' },
      { id: 'canva', name: 'Canva', image: 'icons/marketing/canva.png' },
      { id: 'claude', name: 'Claude AI', image: 'icons/marketing/claude.png' },
      { id: 'd-id', name: 'D-ID', image: 'icons/marketing/d-id.png' },
      { id: 'firefly', name: 'Firefly', image: 'icons/marketing/firefly.png' },
      { id: 'heygen', name: 'HeyGen', image: 'icons/marketing/heygen.png' },
      { id: 'hugging', name: 'Hugging Face', image: 'icons/marketing/hugging.png' },
      { id: 'ideogram', name: 'Ideogram', image: 'icons/marketing/ideogram.png' },
      { id: 'make', name: 'Make', image: 'icons/marketing/make.png' },
      { id: 'midjourney', name: 'Midjourney', image: 'icons/marketing/midjourney.png' },
      { id: 'openai', name: 'OpenAI', image: 'icons/marketing/openai.png' },
      { id: 'recraft', name: 'Recraft', image: 'icons/marketing/recraft.png' },
      { id: 'replicate', name: 'Replicate', image: 'icons/marketing/replicate.png' },
      { id: 'runway', name: 'Runway', image: 'icons/marketing/runway.png' },
      { id: 'soro', name: 'Soro', image: 'icons/marketing/soro.png' },
      { id: 'synthesia', name: 'Synthesia', image: 'icons/marketing/synthesia.png' },
      { id: 'zapier', name: 'Zapier', image: 'icons/marketing/zapier.png' }
    ]
  },
  {
    id: 'stack',
    label: 'Full Stack',
    tools: [
      { id: '11labs', name: 'Eleven Labs', image: 'icons/stack/11labs.png' },
      { id: 'bolt', name: 'Bolt', image: 'icons/stack/bolt.png' },
      { id: 'canva', name: 'Canva', image: 'icons/stack/canva.png' },
      { id: 'claude', name: 'Claude AI', image: 'icons/stack/claude.png' },
      { id: 'cursor', name: 'Cursor', image: 'icons/stack/cursor.png' },
      { id: 'datastax', name: 'DataStax', image: 'icons/stack/datastax.png' },
      { id: 'd-id', name: 'D-ID', image: 'icons/stack/d-id.png' },
      { id: 'firefly', name: 'Firefly', image: 'icons/stack/firefly.png' },
      { id: 'flux', name: 'Flux', image: 'icons/stack/flux.png' },
      { id: 'gemini', name: 'Gemini', image: 'icons/stack/gemini.png' },
      { id: 'grammarly', name: 'Grammarly', image: 'icons/stack/grammarly.png' },
      { id: 'heygen', name: 'HeyGen', image: 'icons/stack/heygen.png' },
      { id: 'hugging', name: 'Hugging Face', image: 'icons/stack/hugging.png' },
      { id: 'ideogram', name: 'Ideogram', image: 'icons/stack/ideogram.png' },
      { id: 'kling', name: 'Kling', image: 'icons/stack/kling.png' },
      { id: 'langflow', name: 'LangFlow', image: 'icons/stack/langflow.png' },
      { id: 'leonardo', name: 'Leonardo', image: 'icons/stack/leonardo.png' },
      { id: 'loveable', name: 'Loveable', image: 'icons/stack/loveable.png' },
      { id: 'ltxstudio', name: 'LTX Studio', image: 'icons/stack/ltxstudio.png' },
      { id: 'luma', name: 'Luma', image: 'icons/stack/luma.png' },
      { id: 'make', name: 'Make', image: 'icons/stack/make.png' },
      { id: 'midjourney', name: 'Midjourney', image: 'icons/stack/midjourney.png' },
      { id: 'minimax', name: 'MiniMax', image: 'icons/stack/minimax.png' },
      { id: 'novelcrafter', name: 'NovelCrafter', image: 'icons/stack/novelcrafter.png' },
      { id: 'ollama', name: 'Ollama', image: 'icons/stack/ollama.png' },
      { id: 'openai', name: 'OpenAI', image: 'icons/stack/openai.png' },
      { id: 'pikalabs', name: 'Pika Labs', image: 'icons/stack/pikalabs.png' },
      { id: 'recraft', name: 'Recraft', image: 'icons/stack/recraft.png' },
      { id: 'replicate', name: 'Replicate', image: 'icons/stack/replicate.png' },
      { id: 'runway', name: 'Runway', image: 'icons/stack/runway.png' },
      { id: 'soro', name: 'Soro', image: 'icons/stack/soro.png' },
      { id: 'stability', name: 'Stability AI', image: 'icons/stack/stability.png' },
      { id: 'streamlit', name: 'Streamlit', image: 'icons/stack/streamlit.png' },
      { id: 'synthesia', name: 'Synthesia', image: 'icons/stack/synthesia.png' },
      { id: 'vscode', name: 'VS Code', image: 'icons/stack/vscode.png' },
      { id: 'windsurf', name: 'Windsurf', image: 'icons/stack/windsurf.png' },
      { id: 'zapier', name: 'Zapier', image: 'icons/stack/zapier.png' }
    ]
  },
  {
    id: 'video',
    label: 'Video',
    tools: [
      { id: 'kling', name: 'Kling', image: 'icons/video/kling.png' },
      { id: 'ltxstudio', name: 'LTX Studio', image: 'icons/video/ltxstudio.png' },
      { id: 'minimax', name: 'MiniMax', image: 'icons/video/minimax.png' },
      { id: 'pikalabs', name: 'Pika Labs', image: 'icons/video/pikalabs.png' },
      { id: 'runway', name: 'Runway', image: 'icons/video/runway.png' },
      { id: 'opusclip', name: 'OpusClicp', image: 'icons/video/opusclip.png' },
      { id: 'soro', name: 'Soro', image: 'icons/video/soro.png' }
    ]
  },
  {
    id: 'writing',
    label: 'Writing',
    tools: [
      { id: 'claude', name: 'Claude AI', image: 'icons/writing/claude.png' },
      { id: 'gemini', name: 'Gemini', image: 'icons/writing/gemini.png' },
      { id: 'grammarly', name: 'Grammarly', image: 'icons/writing/grammarly.png' },
      { id: 'novelcrafter', name: 'NovelCrafter', image: 'icons/writing/novelcrafter.png' },
      { id: 'openai', name: 'OpenAI', image: 'icons/writing/openai.png' }
    ]
  }
];

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedToolCategory, setSelectedToolCategory] = useState<string>(TOOL_CATEGORIES[0].id);
  const [availableTools, setAvailableTools] = useState<Tool[]>([]);
  const [title, setTitle] = useState('AI Tools Tier List');
  const [showSettings, setShowSettings] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    // Initialize categories
    const initialCategories = TIER_COLORS.categories.map(cat => ({
      id: Math.random().toString(36).substr(2, 9),
      label: cat.label,
      color: cat.color,
      toolIds: []
    }));
    setCategories(initialCategories);

    // Initialize tools from the first category
    const initialTools = TOOL_CATEGORIES[0].tools;
    setAvailableTools(initialTools);
  }, []);

  // Update available tools when category changes
  const handleToolCategoryChange = (categoryId: string) => {
    setSelectedToolCategory(categoryId);
    const categoryTools = TOOL_CATEGORIES.find(cat => cat.id === categoryId)?.tools || [];
    
    // Filter out tools that are already in tiers
    const usedToolIds = categories.flatMap(cat => cat.toolIds);
    const filteredTools = categoryTools.filter(tool => !usedToolIds.includes(tool.id));
    
    setAvailableTools(filteredTools);
  };

  const handleDragStart = (e: React.DragEvent, toolId: string) => {
    e.dataTransfer.setData('text/plain', toolId);
  };

  const handleDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    const toolId = e.dataTransfer.getData('text/plain');
    
    // Update categories
    setCategories(prev => prev.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, toolIds: [...cat.toolIds, toolId] };
      }
      return {
        ...cat,
        toolIds: cat.toolIds.filter(id => id !== toolId)
      };
    }));

    // Remove tool from available tools
    setAvailableTools(prev => prev.filter(tool => tool.id !== toolId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const moveTier = (id: string, direction: 'up' | 'down') => {
    const index = categories.findIndex(c => c.id === id);
    if (direction === 'up' && index > 0) {
      const newCategories = [...categories];
      [newCategories[index], newCategories[index - 1]] = [newCategories[index - 1], newCategories[index]];
      setCategories(newCategories);
    } else if (direction === 'down' && index < categories.length - 1) {
      const newCategories = [...categories];
      [newCategories[index], newCategories[index + 1]] = [newCategories[index + 1], newCategories[index]];
      setCategories(newCategories);
    }
  };

  const saveConfiguration = () => {
    const config = {
      title,
      categories,
      selectedToolCategory
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadConfiguration = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const config = JSON.parse(event.target?.result as string);
          setTitle(config.title);
          setCategories(config.categories);
          if (config.selectedToolCategory) {
            handleToolCategoryChange(config.selectedToolCategory);
          }
        } catch (error) {
          console.error('Error loading configuration:', error);
          alert('Invalid configuration file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-3xl font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 text-gray-100"
              />
              <div className="text-sm text-gray-400">(Click to edit title)</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={saveConfiguration}
                className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-800 text-gray-100 rounded-md hover:bg-gray-700"
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </button>
              <label className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-800 text-gray-100 rounded-md hover:bg-gray-700 cursor-pointer">
                <Upload className="w-4 h-4 mr-1" />
                Load
                <input
                  type="file"
                  accept=".json"
                  onChange={loadConfiguration}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => {
                  if (window.confirm('Reset all categories and tools?')) {
                    window.location.reload();
                  }
                }}
                className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-800 text-gray-100 rounded-md hover:bg-gray-700"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Reset
              </button>
              <button
                onClick={() => setShowCategoryModal(true)}
                className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-800 text-gray-100 rounded-md hover:bg-gray-700"
              >
                <Settings className="w-4 h-4 mr-1" />
                Manage Categories
              </button>
            </div>
          </div>
        </header>

        <main>
          <div className="space-y-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="flex">
                  <div
                    className="w-32 p-4 flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.label}
                  </div>
                  <div
                    className="flex-1 min-h-[100px] p-4"
                    onDrop={(e) => handleDrop(e, category.id)}
                    onDragOver={handleDragOver}
                  >
                    <div className="flex flex-wrap gap-4">
                      {category.toolIds.map(toolId => {
                        const tool = TOOL_CATEGORIES
                          .flatMap(cat => cat.tools)
                          .find(t => t.id === toolId);
                        return tool ? (
                          <div
                            key={tool.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, tool.id)}
                            className="w-12 h-12 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-move bg-gray-700"
                          >
                            <img
                              src={`https://mwalearning.s3.ca-central-1.amazonaws.com/${tool.image}`}
                              alt={tool.name}
                              className="w-full h-full object-cover"
                              draggable={false}
                            />
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div className="w-12 flex flex-col justify-center border-l border-gray-700">
                    <button
                      onClick={() => moveTier(category.id, 'up')}
                      className="p-2 hover:bg-gray-700 text-gray-400 hover:text-gray-100"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveTier(category.id, 'down')}
                      className="p-2 hover:bg-gray-700 text-gray-400 hover:text-gray-100"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowSettings(true);
                      }}
                      className="p-2 hover:bg-gray-700 text-gray-400 hover:text-gray-100"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-100">Available Tools</h2>
              <select
                value={selectedToolCategory}
                onChange={(e) => handleToolCategoryChange(e.target.value)}
                className="bg-gray-800 text-gray-100 rounded-md border-gray-700 focus:border-blue-500 focus:ring-blue-500"
              >
                {TOOL_CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-md p-4">
              <div className="flex flex-wrap gap-4">
                {availableTools.map(tool => (
                  <div
                    key={tool.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, tool.id)}
                    className="w-12 h-12 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-move bg-gray-700"
                    title={tool.name}
                  >
                    <img
                      src={`https://mwalearning.s3.ca-central-1.amazonaws.com/${tool.image}`}
                      alt={tool.name}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Category Management Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-[500px]">
            <h2 className="text-xl font-bold mb-6 text-gray-100">Manage Categories</h2>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {categories.map((category, index) => (
                <div key={category.id} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                  <input
                    type="text"
                    value={category.label}
                    onChange={(e) => {
                      const newCategories = [...categories];
                      newCategories[index] = { ...category, label: e.target.value };
                      setCategories(newCategories);
                    }}
                    className="flex-1 px-2 py-1 bg-gray-600 border border-gray-500 rounded text-gray-100"
                  />
                  <input
                    type="color"
                    value={category.color}
                    onChange={(e) => {
                      const newCategories = [...categories];
                      newCategories[index] = { ...category, color: e.target.value };
                      setCategories(newCategories);
                    }}
                    className="w-10 h-8 rounded bg-gray-600 border border-gray-500"
                  />
                  <button
                    onClick={() => {
                      const newCategories = categories.filter(c => c.id !== category.id);
                      setCategories(newCategories);
                    }}
                    className="px-3 py-1 bg-red-600 text-gray-100 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => moveTier(category.id, 'up')}
                    disabled={index === 0}
                    className="px-2 py-1 bg-gray-600 text-gray-100 rounded hover:bg-gray-500 disabled:opacity-50"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveTier(category.id, 'down')}
                    disabled={index === categories.length - 1}
                    className="px-2 py-1 bg-gray-600 text-gray-100 rounded hover:bg-gray-500 disabled:opacity-50"
                  >
                    ↓
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => {
                  const newCategory = {
                    id: Math.random().toString(36).substr(2, 9),
                    label: 'New Category',
                    color: '#808080',
                    toolIds: []
                  };
                  setCategories([...categories, newCategory]);
                }}
                className="px-4 py-2 bg-green-600 text-gray-100 rounded-md hover:bg-green-700"
              >
                Add Category
              </button>
              <button
                onClick={() => {
                  const initialCategories = TIER_COLORS.categories.map(cat => ({
                    id: Math.random().toString(36 ).substr(2, 9),
                    label: cat.label,
                    color: cat.color,
                    toolIds: []
                  }));
                  setCategories(initialCategories);
                }}
                className="px-4 py-2 bg-yellow-600 text-gray-100 rounded-md hover:bg-yellow-700"
              >
                Reset to Default
              </button>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="px-4 py-2 bg-gray-600 text-gray-100 rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-100">Category Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Label
                  <input
                    type="text"
                    value={selectedCategory.label}
                    onChange={(e) => setSelectedCategory({
                      ...selectedCategory,
                      label: e.target.value
                    })}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Color
                  <input
                    type="color"
                    value={selectedCategory.color}
                    onChange={(e) => setSelectedCategory({
                      ...selectedCategory,
                      color: e.target.value
                    })}
                    className="mt-1 block w-full h-10 rounded-md bg-gray-700 border-gray-600"
                  />
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setCategories(prev => prev.map(cat =>
                    cat.id === selectedCategory.id ? selectedCategory : cat
                  ));
                  setShowSettings(false);
                }}
                className="px-4 py-2 bg-blue-600 text-gray-100 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-gray-600 text-gray-100 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
